<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $seller = User::firstOrCreate(['email' => 'demo@luxeparfum.test'], ['name' => 'Luxe Demo Seller', 'password' => Hash::make('password123')]);
        foreach ([['Velvet Noir','Oriental',12500,'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80','A captivating oriental fragrance with deep notes of oud and amber','Unisex','100ml',0,1,4.8], ['Azure Dream','Fresh',9500,'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80','A refreshing aquatic fragrance perfect for summer days','Men','100ml',1,0,4.6], ['Rose Éternelle','Floral',11000,'https://images.unsplash.com/photo-1588405748879-acb5afc413e0?w=500&q=80','An elegant floral composition centered around Bulgarian rose','Women','100ml',0,1,4.9], ['Midnight Oud','Oud',15000,'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&q=80','Pure indulgence with rare agarwood essence','Unisex','100ml',0,1,5.0]] as $item) { Product::firstOrCreate(['title' => $item[0]], ['user_id'=>$seller->id, 'category'=>$item[1], 'price'=>$item[2], 'image_url'=>$item[3], 'description'=>$item[4], 'gender'=>$item[5], 'volume'=>$item[6], 'is_new_arrival'=>$item[7], 'is_best_seller'=>$item[8], 'rating'=>$item[9]]); }
    }
}
