# Aurevia Marketplace API

Laravel 11 API backend for the Aurevia perfume marketplace e-commerce application.

## Cloudinary Image Storage

This application uses Cloudinary for permanent image storage instead of the local filesystem. This ensures that product images persist across deployments and are not lost when the application is restarted or redeployed on Render.

### Why Cloudinary?

- **Permanent Storage**: Images are stored in the cloud and are not affected by server restarts or deployments
- **CDN Delivery**: Cloudinary provides fast content delivery network (CDN) access to images
- **Automatic Optimization**: Images are automatically optimized for web delivery
- **Secure HTTPS**: All image URLs use secure HTTPS protocol

### Required Environment Variables

Add the following Cloudinary credentials to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Important**: Never commit actual credentials to the repository. The `.env.example` file contains placeholder variables only.

### How Images Are Stored

- Product images are uploaded to Cloudinary during product creation and updates
- Images are organized in folders by user ID: `aurevia/products/{user_id}`
- The resulting secure HTTPS URLs are stored in the database:
  - `products.image_url`: First image URL (main product image)
  - `products.images`: JSON array of all image URLs
- When products are updated or deleted, the corresponding Cloudinary images are also removed

### Storage Configuration

The application no longer uses the local filesystem (`Storage::disk('public')`) for product image persistence. Product image URLs come directly from Cloudinary.

You do not need to run `php artisan storage:link` for product images.

### Deployment on Render

When deploying to Render, add the Cloudinary environment variables in the Render dashboard:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY` 
- `CLOUDINARY_API_SECRET`

These should be configured as secret environment variables in your Render service settings.

## Setup

1. Install dependencies:
   ```bash
   composer install
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Generate application key:
   ```bash
   php artisan key:generate
   ```

4. Configure database and Cloudinary credentials in `.env`

5. Run migrations:
   ```bash
   php artisan migrate
   ```

6. Start development server:
   ```bash
   php artisan serve
   ```

## API Endpoints

### Public Routes
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/products` - List all products
- `GET /api/products/{product}` - Get single product details

### Authenticated Routes (Sanctum)
- `GET /api/user` - Get current user
- `POST /api/logout` - User logout
- `GET /api/my-products` - Get current user's products
- `POST /api/products` - Create new product
- `PUT/PATCH /api/products/{product}` - Update product
- `DELETE /api/products/{product}` - Delete product

## Authentication

Authentication is handled using Laravel Sanctum. Include the Sanctum token in the Authorization header:

```
Authorization: Bearer {token}
```

## Image Upload

Product images should be uploaded as `multipart/form-data` with the field name `images`. Requirements:

- 1 to 6 images per product
- Supported formats: jpg, jpeg, png, webp
- Maximum 5 MB per image
- At least one image is required when creating a product

## Development

Run the development server:
```bash
php artisan serve
```

## Production

For production deployment, ensure:
- `APP_DEBUG=false` in environment
- Cloudinary credentials are configured
- Database connection is properly configured
- CORS settings allow your frontend domain
