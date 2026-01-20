# Frontend Setup Guide

## Quick Start

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment**
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

3. **Customize site settings**

Edit `src/lib/constants.ts` to update:
- Company name
- Contact information
- Social media links
- Google Maps embed URL

4. **Start development server**
```bash
npm run dev
```

Visit http://localhost:3000

## Customization

### Update Logo
File: `src/components/Header.tsx` (lines 50-55)

### Change Colors
File: `src/app/globals.css` (line 8 for primary color)

### Modify Navigation
File: `src/lib/constants.ts` (NAV_LINKS array)

### Update Google Maps
File: `src/lib/constants.ts` (map.embedUrl)

Get your embed URL from: https://www.google.com/maps

## Build for Production

```bash
npm run build
npm start
```

## All Features Working

✅ Header with logo, navigation, contact, and social links
✅ Hero section with statistics
✅ About Us section
✅ New cars auto-scrolling slider
✅ Full car listing with filters
✅ Contact form with map
✅ Footer with all info
✅ Car detail pages
✅ Mobile responsive
✅ Sanity CMS integration maintained

Enjoy your new website! 🚗
