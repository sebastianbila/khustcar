# Catalog Page & Search Feature

## New Features Added

### 1. Catalog Page (`/catalog`)
- Dedicated page for browsing all cars
- Advanced filtering system with:
  - Search by brand or model
  - Filter by brand (dropdown)
  - Filter by year range (min/max)
  - Filter by price range (min/max)
- URL-based query parameters for deep linking
- Responsive sidebar filters (desktop) and collapsible filters (mobile)
- Real-time results counter
- Active filter badges display
- Empty state with reset option

### 2. Header Search Overlay
- Search icon button in header (desktop & mobile)
- Full-width search overlay that slides down from top
- Semi-transparent backdrop overlay
- Auto-focus search input
- Popular brand quick links
- Closes on:
  - ESC key press
  - Clicking outside search container
  - After submitting search
- Smooth animations and transitions
- Navigates to `/catalog` with search query

### 3. Updated Navigation
- Navigation links updated to use `/catalog` route
- "Каталог" link now points to dedicated catalog page
- "View All Cars" button on homepage links to `/catalog`
- Car detail page breadcrumb updated to link back to `/catalog`

## File Changes

### New Files
- `frontend/src/app/catalog/page.tsx` - Catalog page with filters
- `frontend/src/components/SearchOverlay.tsx` - Search overlay component

### Modified Files
- `frontend/src/components/Header.tsx` - Added search button and overlay integration
- `frontend/src/lib/constants.ts` - Updated NAV_LINKS with `/catalog` route
- `frontend/src/components/sections/CatalogPreviewSection.tsx` - Updated "View All" link
- `frontend/src/app/cars/[id]/page.tsx` - Updated breadcrumb link

## Usage

### Search Overlay
1. Click search icon in header
2. Type brand or model name
3. Press Enter or click "Пошук" button
4. Redirects to `/catalog?search=query`

### Catalog Page
- Visit `/catalog` directly
- Use filters in sidebar (desktop) or toggle filters (mobile)
- Click "Застосувати Фільтри" to apply
- Click "Очистити" to reset all filters
- Results update based on URL query parameters

### URL Query Parameters
- `search` - Search term for brand/model
- `brand` - Specific brand filter
- `minYear` - Minimum year
- `maxYear` - Maximum year
- `minPrice` - Minimum price
- `maxPrice` - Maximum price

Example: `/catalog?search=BMW&minYear=2020&maxPrice=50000`

## Styling
- Maintains white/light theme
- Uses ShadCN UI components
- Smooth transitions and animations
- Fully responsive design
- Ukrainian language throughout
