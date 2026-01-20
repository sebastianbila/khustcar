# Car Management System - Project Structure

## Overview
Full-stack car management application with Sanity CMS backend and Next.js frontend.

## Directory Structure

```
khust-car-system/
├── studio/                          # Sanity Studio (CMS)
│   ├── schemaTypes/
│   │   ├── car.ts                  # Car schema definition
│   │   └── index.ts                # Schema exports
│   ├── sanity.config.ts            # Sanity configuration
│   ├── sanity.cli.ts               # CLI configuration
│   ├── package.json                # Studio dependencies
│   ├── tsconfig.json               # TypeScript config
│   └── README.md                   # Studio setup guide
│
├── frontend/                        # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── cars/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx   # Car detail page
│   │   │   ├── layout.tsx         # Root layout
│   │   │   ├── page.tsx           # Home page (car list)
│   │   │   ├── providers.tsx      # React Query provider
│   │   │   └── globals.css        # Global styles
│   │   │
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── button.tsx     # Button component
│   │   │   │   ├── card.tsx       # Card components
│   │   │   │   ├── input.tsx      # Input component
│   │   │   │   └── select.tsx     # Select component
│   │   │   ├── CarCard.tsx        # Car card display
│   │   │   ├── CarFilters.tsx     # Search & filter UI
│   │   │   ├── LoadingSpinner.tsx # Loading state
│   │   │   └── ErrorMessage.tsx   # Error display
│   │   │
│   │   ├── lib/
│   │   │   ├── sanity.ts          # Sanity client config
│   │   │   └── utils.ts           # Utility functions
│   │   │
│   │   ├── services/
│   │   │   └── carService.ts      # Car data service (GROQ)
│   │   │
│   │   └── types/
│   │       └── car.ts             # TypeScript interfaces
│   │
│   ├── package.json                # Frontend dependencies
│   ├── tsconfig.json               # TypeScript config
│   ├── tailwind.config.ts          # Tailwind config
│   ├── next.config.ts              # Next.js config
│   ├── .env.local.example          # Environment template
│   └── README.md                   # Frontend setup guide
│
├── README.md                        # Main documentation
├── PROJECT_STRUCTURE.md            # This file
└── setup.sh                        # Setup automation script

```

## Key Files Explained

### Sanity Studio (Backend)

**`studio/schemaTypes/car.ts`**
- Defines the Car content model
- Fields: brand, model, year, price, description, images
- Validation rules and preview configuration

**`studio/sanity.config.ts`**
- Main Sanity configuration
- Project ID and dataset settings
- Plugin registration (structure tool, vision)

### Frontend (Next.js)

**`src/services/carService.ts`**
- GROQ queries for fetching cars
- Filter implementation (brand, year, price)
- API communication layer

**`src/app/page.tsx`**
- Home page with car grid
- Search and filter interface
- Uses React Query for data fetching

**`src/app/cars/[id]/page.tsx`**
- Dynamic car detail page
- Image gallery
- Full specifications display

**`src/components/CarCard.tsx`**
- Reusable car card component
- Displays thumbnail, brand, model, price
- Link to detail page

**`src/components/CarFilters.tsx`**
- Filter controls for search
- Brand, year, price range inputs
- Apply/reset functionality

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: ShadCN UI (custom implementation)
- **State Management**: React Query (TanStack Query)
- **Image Optimization**: Next/Image + Sanity Image URLs

### Backend
- **CMS**: Sanity.io (Studio 3)
- **Query Language**: GROQ
- **Content Model**: Structured Car schema
- **Media**: Sanity's built-in image management

## Data Flow

1. **Content Creation**: Editors create cars in Sanity Studio
2. **Storage**: Content stored in Sanity's Content Lake
3. **Query**: Frontend fetches data via GROQ queries
4. **Cache**: React Query caches responses
5. **Display**: Components render car data
6. **Images**: Served via Sanity CDN with transformations

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## API Endpoints (GROQ Queries)

**Get all cars with filters**
```groq
*[_type == "car" && 
  brand match $search && 
  year >= $minYear && 
  price <= $maxPrice] 
| order(brand asc, model asc)
```

**Get car by ID**
```groq
*[_type == "car" && _id == $id][0]
```

**Get all brands**
```groq
*[_type == "car"] | order(brand asc).brand
```

## Features Implemented

### Frontend Features
- ✅ Responsive car grid layout
- ✅ Dynamic car detail pages
- ✅ Search by brand/model
- ✅ Filter by brand dropdown
- ✅ Year range filtering
- ✅ Price range filtering
- ✅ Loading states
- ✅ Error handling
- ✅ Image optimization
- ✅ Mobile responsive design

### CMS Features
- ✅ Car content type
- ✅ Rich text editor (Portable Text)
- ✅ Multi-image upload
- ✅ Field validation
- ✅ Content preview
- ✅ Easy content management

## Getting Started

See main README.md for complete setup instructions.

Quick start:
```bash
# 1. Setup everything
./setup.sh

# 2. Start Studio
cd studio && npm run dev

# 3. Start Frontend
cd frontend && npm run dev
```
