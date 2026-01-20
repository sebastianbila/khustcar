# Car Management System

A full-stack car management web application built with Next.js and Sanity CMS.

## Project Structure

```
khust-car-system/
├── frontend/          # Next.js frontend application
└── studio/            # Sanity Studio CMS
```

## Quick Start

### 1. Set Up Sanity Studio

```bash
cd studio
npm install
```

Create a Sanity project (if you don't have one):
```bash
npm install -g @sanity/cli
sanity init
```

Follow the prompts to:
- Create a new project or select an existing one
- Choose a dataset name (e.g., "production")

Update `studio/sanity.config.ts` and `studio/sanity.cli.ts` with your project ID and dataset.

Start the Sanity Studio:
```bash
npm run dev
```

The Studio will be available at http://localhost:3333

### 2. Add Sample Data

After starting the Studio, manually create 5 car entries with sample data:

**Car 1: Toyota Camry**
- Brand: Toyota
- Model: Camry
- Year: 2023
- Price: 28500
- Description: A reliable and comfortable sedan with excellent fuel efficiency and modern features.

**Car 2: Tesla Model 3**
- Brand: Tesla
- Model: Model 3
- Year: 2024
- Price: 42990
- Description: Electric vehicle with autopilot capabilities, long range, and cutting-edge technology.

**Car 3: BMW X5**
- Brand: BMW
- Model: X5
- Year: 2023
- Price: 65700
- Description: Luxury SUV with powerful engine, premium interior, and advanced safety features.

**Car 4: Honda Civic**
- Brand: Honda
- Model: Civic
- Year: 2022
- Price: 24500
- Description: Compact car known for reliability, fuel efficiency, and sporty design.

**Car 5: Ford F-150**
- Brand: Ford
- Model: F-150
- Year: 2023
- Price: 58990
- Description: America's best-selling truck with impressive towing capacity and modern tech features.

### 3. Set Up Frontend

```bash
cd frontend
npm install
```

Create environment variables file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Sanity credentials:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Features

### Frontend
- **Car Listing Page**: Browse all cars in a responsive grid layout
- **Car Detail Page**: View detailed information about each car
- **Search & Filter**: Filter cars by brand, model, year, and price range
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

### CMS (Sanity Studio)
- **Car Schema**: Structured content model with brand, model, year, price, description, and images
- **Image Management**: Upload and manage multiple images per car
- **Rich Text Editor**: Portable Text for car descriptions
- **Preview**: Real-time content preview

## Technologies

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- ShadCN UI Components
- React Query (TanStack Query)
- Sanity Client
- Portable Text React

### Backend/CMS
- Sanity.io
- GROQ (Query Language)
- Sanity Studio 3

## Development

### Frontend Development
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linter
```

### Studio Development
```bash
cd studio
npm run dev      # Start Studio development server
npm run build    # Build Studio for deployment
```

## API Integration

The frontend fetches data from Sanity using GROQ queries defined in `frontend/src/services/carService.ts`:

- `getCars(filters)`: Fetch all cars with optional filters
- `getCarById(id)`: Fetch a single car by ID
- `getBrands()`: Get all unique car brands

## Deployment

### Deploying Sanity Studio
```bash
cd studio
npm run build
sanity deploy
```

### Deploying Frontend
Deploy to Vercel, Netlify, or any Next.js hosting platform:
```bash
cd frontend
npm run build
```

Make sure to set environment variables in your hosting platform:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

## License

MIT
