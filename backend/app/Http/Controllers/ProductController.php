<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index() { return Product::with('user:id,name')->latest()->paginate(48); }
    public function show(Product $product) { return $product->load('user:id,name'); }
    public function mine(Request $request) { return $request->user()->products()->with('user:id,name')->latest()->get(); }
    public function store(Request $request) { $product = $request->user()->products()->create($this->validated($request)); return response()->json($product->load('user:id,name'), 201); }
    public function update(Request $request, Product $product) { $this->ensureOwner($request, $product); $product->update($this->validated($request, true, $product)); return $product->load('user:id,name'); }
    public function destroy(Request $request, Product $product) { $this->ensureOwner($request, $product); $this->deleteStoredImages($product->images ?: [$product->image_url]); $product->delete(); return response()->noContent(); }

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
            $this->deleteStoredImages($product?->images ?: []);
            $images = collect($request->file('images'))->map(fn ($image) => url(Storage::disk('public')->url($image->store('products', 'public'))))->all();
            $data['images'] = $images;
            $data['image_url'] = $images[0];
        }
        return $data;
    }

    private function deleteStoredImages(array $urls): void
    {
        foreach ($urls as $url) {
            $path = parse_url($url, PHP_URL_PATH) ?: '';
            if (str_starts_with($path, '/storage/')) Storage::disk('public')->delete(str_replace('/storage/', '', $path));
        }
    }
}