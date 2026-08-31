# Aurevia Marketplace

A React + Laravel REST marketplace where visitors browse fragrance listings and authenticated users publish, edit, and delete their own listings. The original Aurevia UI is retained; mock product imports were replaced with API-backed data.

## Stack

- Frontend: React 19 + Vite + Tailwind
- Backend: Laravel 11 + Laravel Sanctum personal-access tokens
- Database: MySQL
- Communication: JSON REST API

## Features

- Browse API-backed products and individual product details
- Register, login, and logout
- Protected Sell Product, My Listings, Edit, and Delete flows
- Ownership enforced server-side: only the seller can update/delete their listing
- MySQL migrations, Eloquent `User hasMany Products` and `Product belongsTo User`
- CORS and deployment-ready environment variables
- Local product photo upload with preview (JPG, PNG, WebP up to 5 MB)

## Local setup

### Prerequisites

Node 20+, PHP 8.2+, Composer 2+, and MySQL 8+.

1. Create a MySQL database named `luxe_parfum`.
2. Backend:

```bash
cd backend
copy .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

3. Frontend (from the repository root):

```bash
copy .env.example .env
npm install
npm run dev
```

Demo seller after seeding: `demo@luxeparfum.test` / `password123`.

## Environment variables

Frontend `.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

Backend `.env`:

```env
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=luxe_parfum
DB_USERNAME=root
DB_PASSWORD=
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

For production set `APP_ENV=production`, `APP_DEBUG=false`, a generated `APP_KEY`, real MySQL values, `APP_URL` to the deployed API, `FRONTEND_URL` to the deployed frontend (no trailing slash), and frontend `VITE_API_URL=https://YOUR-API/api` before building.

## API

| Method | Endpoint | Authentication |
|---|---|---|
| POST | `/api/register` | No |
| POST | `/api/login` | No |
| POST | `/api/logout` | Sanctum token |
| GET | `/api/products` | No |
| GET | `/api/products/{id}` | No |
| GET | `/api/my-products` | Sanctum token |
| POST | `/api/products` | Sanctum token |
| PATCH | `/api/products/{id}` | Owner token |
| DELETE | `/api/products/{id}` | Owner token |

Use `Authorization: Bearer <token>` for protected endpoints. Registration expects `name`, `email`, `password`, and `password_confirmation`. Listings expect `title`, `description`, `price`, and `category`; `image`, `gender`, and `volume` are optional. Run `php artisan storage:link` after setup to serve uploaded photos.

## Deployment

- Deploy `backend/` to any Docker/PHP host with a managed MySQL database. The included `backend/Dockerfile` runs migrations and seeds on start.
- Set backend `FRONTEND_URL` to the final Vercel/Netlify frontend URL.
- Deploy the repository root as a Vite static site with build command `npm run build` and publish directory `dist`.
- Set frontend `VITE_API_URL` to the final backend URL plus `/api`, then redeploy the frontend.

No public deployment URLs are included because no hosting account/credentials were provided in this workspace. Once hosting access is supplied, the final environment values can be set and the two links added here.

## Verification checklist

1. Register a user and log in.
2. Click **Sell Product**, enter title, description, price, category, and a photo from your computer, then publish.
3. Confirm it appears on the product page and marketplace.
4. Open **My Listings**, edit or delete it.
5. Confirm the removed listing disappears from both My Listings and marketplace.