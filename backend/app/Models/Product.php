<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'price', 'category', 'image_url', 'images', 'gender', 'volume', 'is_new_arrival', 'is_best_seller', 'rating'];
    protected function casts(): array { return ['price' => 'decimal:2', 'rating' => 'decimal:1', 'images' => 'array', 'is_new_arrival' => 'boolean', 'is_best_seller' => 'boolean']; }
    public function user() { return $this->belongsTo(User::class); }
}
