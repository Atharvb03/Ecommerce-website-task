<?php

namespace App\Http\Controllers;

use App\Models\Product;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() { return Product::with('user:id,name')->latest()->paginate(48); }
    public function show(Product $product) { return $product->load('user:id,name'); }
    public function mine(Request $request) { return $request->user()->products()->with('user:id,name')->latest()->get(); }
    public function store(Request $request) { 
        try {
            $validatedData = $this->validated($request);
            $product = $request->user()->products()->create($validatedData); 
            return response()->json($product->load('user:id,name'), 201); 
        } catch (\Exception $e) {
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
        
        if ($request->hasFile('images')) {
            $newImages = $this->uploadImagesToCloudinary($request->file('images'), $request->user()->id);
            
            if (empty($newImages)) {
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
        $uploadedUrls = [];
        $folder = "aurevia/products/{$userId}";
        
        foreach ($images as $image) {
            try {
                $upload = Cloudinary::upload($image->getRealPath(), [
                    'folder' => $folder,
                    'resource_type' => 'image',
                    'transformation' => [
                        'quality' => 'auto',
                        'fetch_format' => 'auto',
                    ],
                ]);
                
                if ($upload && $upload->getSecurePath()) {
                    $uploadedUrls[] = $upload->getSecurePath();
                }
            } catch (\Exception $e) {
                // Clean up any uploaded images if one fails
                if (!empty($uploadedUrls)) {
                    $this->deleteCloudinaryImages($uploadedUrls);
                }
                return [];
            }
        }
        
        return $uploadedUrls;
    }

    private function deleteCloudinaryImages(array $urls): void
    {
        foreach ($urls as $url) {
            $publicId = $this->extractCloudinaryPublicId($url);
            if ($publicId) {
                try {
                    Cloudinary::destroy($publicId);
                } catch (\Exception $e) {
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