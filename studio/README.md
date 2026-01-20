# Car Management Studio

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a Sanity project (if you don't have one):
```bash
npm install -g @sanity/cli
sanity init
```

3. Update `sanity.config.ts` and `sanity.cli.ts` with your project ID and dataset name.

4. Start the studio:
```bash
npm run dev
```

The studio will be available at http://localhost:3333

## Seed Data

After starting the studio, manually create 5 car entries with the following sample data:

### Car 1: Toyota Camry
- Brand: Toyota
- Model: Camry
- Year: 2023
- Price: 28500
- Description: A reliable and comfortable sedan with excellent fuel efficiency and modern features.
- Images: Add relevant car images

### Car 2: Tesla Model 3
- Brand: Tesla
- Model: Model 3
- Year: 2024
- Price: 42990
- Description: Electric vehicle with autopilot capabilities, long range, and cutting-edge technology.
- Images: Add relevant car images

### Car 3: BMW X5
- Brand: BMW
- Model: X5
- Year: 2023
- Price: 65700
- Description: Luxury SUV with powerful engine, premium interior, and advanced safety features.
- Images: Add relevant car images

### Car 4: Honda Civic
- Brand: Honda
- Model: Civic
- Year: 2022
- Price: 24500
- Description: Compact car known for reliability, fuel efficiency, and sporty design.
- Images: Add relevant car images

### Car 5: Ford F-150
- Brand: Ford
- Model: F-150
- Year: 2023
- Price: 58990
- Description: America's best-selling truck with impressive towing capacity and modern tech features.
- Images: Add relevant car images
