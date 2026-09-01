<?php

namespace App\Http\Controllers;

use App\Models\Product;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Cloudinary\Cloudinary as CloudinarySDK;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() { return Product::with('user:id,name')->latest()->paginate(48); }

    public function cloudinaryHealth()
    {
        $cloudinaryInstalled = class_exists('CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary');
        $serviceProviderRegistered = app()->getProvider(\CloudinaryLabs\CloudinaryLaravel\CloudinaryServiceProvider::class) !== null;
        $cloudUrl = config('cloudinary.cloud_url');

        return response()->json([
            'cloudinary_url_configured' => !empty(env('CLOUDINARY_URL')),
            'cloud_name_configured' => !empty(env('CLOUDINARY_CLOUD_NAME')),
            'api_key_configured' => !empty(env('CLOUDINARY_API_KEY')),
            'api_secret_configured' => !empty(env('CLOUDINARY_API_SECRET')),
            'cloudinary_package_installed' => $cloudinaryInstalled,
            'cloudinary_service_provider_registered' => $serviceProviderRegistered,
            'cloudinary_facade_class' => $cloudinaryInstalled ? get_class(Cloudinary::getFacadeRoot()) : 'not_installed',
            'cloudinary_config_loaded' => !empty($cloudUrl),
            'cloudinary_cloud_url_set' => !empty($cloudUrl),
            'cloudinary_cloud_url_prefix' => $cloudUrl ? substr($cloudUrl, 0, 20) . '...' : 'not_set',
            'laravel_version' => app()->version(),
        ]);
    }
    public function show(Product $product) { return $product->load('user:id,name'); }
    public function mine(Request $request) { return $request->user()->products()->with('user:id,name')->latest()->get(); }
    public function store(Request $request) {
        try {
            $validatedData = $this->validated($request);
            $product = $request->user()->products()->create($validatedData);
            return response()->json($product->load('user:id,name'), 201);
        } catch (\Throwable $e) {
            \Log::error('Product store failed', [
                'message' => $e->getMessage(),
                'exception' => get_class($e),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function update(Request $request, Product $product) { 
        $this->ensureOwner($request, $product); 
        
        $oldImages = $product->images ?: [];
        
        try {
            $validatedData = $this->validated($request, true, $product);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        
        // Update database first
        $product->update($validatedData);
        
        // Only delete old images after successful database update
        if ($request->hasFile('images') && !empty($oldImages)) {
            $this->deleteCloudinaryImages($oldImages);
        }
        
        return $product->load('user:id,name'); 
    }
    public function destroy(Request $request, Product $product) { $this->ensureOwner($request, $product); $this->deleteCloudinaryImages($product->images ?: [$product->image_url]); $product->delete(); return response()->noContent(); }

    private function ensureOwner(Request $request, Product $product): void { abort_unless($product->user_id === $request->user()->id, 403, 'You can only manage your own listings.'); }

    private function validated(Request $request, bool $partial = false, ?Product $product = null): array
    {
        \Log::info('Product validation started', [
            'partial' => $partial,
            'has_files' => $request->hasFile('images'),
        ]);

        $required = $partial ? 'nullable' : 'required';
        $data = $request->validate([
            'title' => [$partial ? 'sometimes' : 'required', 'string', 'max:150'],
            'description' => [$partial ? 'sometimes' : 'required', 'string', 'max:3000'],
            'price' => [$partial ? 'sometimes' : 'required', 'numeric', 'min:0'],
            'category' => [$partial ? 'sometimes' : 'required', 'string', 'max:80'],
            'images' => [$required, 'array', 'min:1', 'max:6'],
            'images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'gender' => ['nullable', 'in:Men,Women,Unisex'],
            'volume' => ['nullable', 'string', 'max:30'],
            'is_new_arrival' => ['sometimes', 'boolean'],
            'is_best_seller' => ['sometimes', 'boolean'],
            'rating' => ['nullable', 'numeric', 'between:0,5'],
        ]);

        \Log::info('Product validation passed', [
            'has_images' => isset($data['images']),
        ]);
        
        if ($request->hasFile('images')) {
            \Log::info('About to call uploadImagesToCloudinary', [
                'user_id' => $request->user()->id,
                'image_count' => count($request->file('images')),
            ]);

            $newImages = $this->uploadImagesToCloudinary($request->file('images'), $request->user()->id);

            if (empty($newImages)) {
                \Log::error('Cloudinary upload returned empty array', [
                    'user_id' => $request->user()->id,
                    'image_count' => count($request->file('images')),
                ]);
                throw new \Exception('Failed to upload images to Cloudinary');
            }

            $data['images'] = $newImages;
            $data['image_url'] = $newImages[0];

            // Note: Old images will be deleted in the update method after successful database update
        }
        
        return $data;
    }

    private function uploadImagesToCloudinary(array $images, int $userId): array
    {
        \Log::info('Cloudinary upload started', [
            'user_id' => $userId,
            'image_count' => count($images),
        ]);

        $uploadedUrls = [];
        $folder = "aurevia/products/{$userId}";

        // Log Cloudinary configuration for debugging (without exposing secrets)
        \Log::info('Cloudinary configuration check', [
            'cloud_url_set' => !empty(config('cloudinary.cloud_url')),
            'cloud_name' => env('CLOUDINARY_CLOUD_NAME', 'NOT_SET'),
            'cloudinary_url_exists' => !empty(env('CLOUDINARY_URL')),
            'api_key_set' => !empty(env('CLOUDINARY_API_KEY')),
            'api_secret_set' => !empty(env('CLOUDINARY_API_SECRET')),
        ]);

        // Get Cloudinary URL and configure instance
        $cloudUrl = config('cloudinary.cloud_url');
        if ($cloudUrl) {
            try {
                // Create a new Cloudinary instance with the cloud URL
                $cloudinaryInstance = new CloudinarySDK($cloudUrl);
                \Log::info('Cloudinary instance created with cloud_url');
            } catch (\Throwable $e) {
                \Log::error('Failed to create Cloudinary instance with cloud_url', [
                    'error' => $e->getMessage(),
                ]);
                return [];
            }
        } else {
            \Log::error('CLOUDINARY_URL is not configured');
            return [];
        }

        // Log Cloudinary facade class
        \Log::info('Cloudinary facade check', [
            'facade_class' => get_class(Cloudinary::getFacadeRoot()),
        ]);

        foreach ($images as $index => $image) {
            \Log::info('Cloudinary upload attempt', [
                'image_index' => $index,
                'image_path' => $image->getRealPath(),
                'image_size' => $image->getSize(),
                'image_mime' => $image->getMimeType(),
            ]);

            try {
                $upload = $cloudinaryInstance->uploadApi()->upload($image->getRealPath(), [
                    'folder' => $folder,
                    'resource_type' => 'image',
                    'transformation' => [
                        'quality' => 'auto',
                        'fetch_format' => 'auto',
                    ],
                ]);

                \Log::info('Cloudinary upload completed', [
                    'image_index' => $index,
                    'upload_response_type' => gettype($upload),
                    'has_secure_url' => isset($upload['secure_url']),
                ]);

                if (isset($upload['secure_url'])) {
                    $uploadedUrls[] = $upload['secure_url'];
                    \Log::info('Cloudinary URL added', [
                        'image_index' => $index,
                        'url_added' => true,
                    ]);
                } else {
                    \Log::error('Cloudinary upload response missing secure_url', [
                        'image_index' => $index,
                        'response_keys' => array_keys($upload),
                    ]);
                }
            } catch (\Throwable $e) {
                // Log the actual exception for debugging
                \Log::error('Cloudinary upload failed', [
                    'message' => $e->getMessage(),
                    'exception' => get_class($e),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                ]);

                // Clean up any uploaded images if one fails
                if (!empty($uploadedUrls)) {
                    $this->deleteCloudinaryImages($uploadedUrls);
                }
                return [];
            }
        }

        \Log::info('Cloudinary upload finished', [
            'user_id' => $userId,
            'total_images' => count($images),
            'successful_uploads' => count($uploadedUrls),
        ]);

        return $uploadedUrls;
    }

    private function deleteCloudinaryImages(array $urls): void
    {
        $cloudUrl = config('cloudinary.cloud_url');
        if (!$cloudUrl) {
            \Log::error('Cannot delete images: CLOUDINARY_URL not configured');
            return;
        }

        $cloudinaryInstance = new CloudinarySDK($cloudUrl);

        foreach ($urls as $url) {
            $publicId = $this->extractCloudinaryPublicId($url);
            if ($publicId) {
                try {
                    $cloudinaryInstance->uploadApi()->destroy($publicId);
                } catch (\Throwable $e) {
                    // Log error but continue with other images
                    \Log::error("Failed to delete Cloudinary image: {$publicId}", [
                        'error' => $e->getMessage(),
                        'url' => $url
                    ]);
                }
            }
        }
    }

    private function extractCloudinaryPublicId(string $url): ?string
    {
        try {
            $parsed = parse_url($url);
            if (!$parsed || !isset($parsed['path'])) {
                return null;
            }
            
            $path = $parsed['path'];
            // Remove /image/upload/ or /video/upload/ and version if present
            $path = preg_replace('#^/image/upload/v\d+/#', '/', $path);
            $path = preg_replace('#^/video/upload/v\d+/#', '/', $path);
            $path = preg_replace('#^/image/upload/#', '/', $path);
            $path = preg_replace('#^/video/upload/#', '/', $path);
            
            // Remove file extension
            $publicId = preg_replace('/\.[^.]+$/', '', $path);
            
            // Remove leading slash
            $publicId = ltrim($publicId, '/');
            
            return $publicId ?: null;
        } catch (\Exception $e) {
            return null;
        }
    }
}