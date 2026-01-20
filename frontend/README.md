# Car Management Frontend

Next.js frontend application for the Car Management System.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Copy the environment variables:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your Sanity project credentials:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

You can find these values in your Sanity Studio configuration (`studio/sanity.config.ts`).

4. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── cars/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Car detail page
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page (car listing)
│   │   └── providers.tsx          # React Query provider
│   ├── components/
│   │   ├── ui/                    # ShadCN UI components
│   │   ├── CarCard.tsx            # Car card component
│   │   ├── CarFilters.tsx         # Filter component
│   │   ├── ErrorMessage.tsx       # Error display
│   │   └── LoadingSpinner.tsx     # Loading indicator
│   ├── lib/
│   │   ├── sanity.ts              # Sanity client setup
│   │   └── utils.ts               # Utility functions
│   ├── services/
│   │   └── carService.ts          # Car data service with GROQ queries
│   └── types/
│       └── car.ts                 # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Features

- **Car Listing**: Grid view of all available cars
- **Car Details**: Detailed view with images and specifications
- **Search & Filter**: Filter by brand, model, year, and price range
- **Responsive Design**: Mobile-friendly interface
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages

## Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **ShadCN UI**: Pre-built accessible components
- **React Query**: Data fetching and caching
- **Sanity Client**: CMS integration with GROQ queries
- **Portable Text**: Rich text rendering

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
