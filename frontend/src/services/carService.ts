import { client } from '@/lib/sanity';
import type { Car, CarFilters } from '@/types/car';

export interface GetCarsOptions {
  filters?: CarFilters;
  page?: number;
  limit?: number;
  sort?: string;
}

export async function getCars({
  filters,
  page = 1,
  limit = 12,
  sort = ''
}: GetCarsOptions = {}): Promise<{ cars: Car[]; total: number }> {
  const { filterQuery, params } = buildFilterQuery(filters)
  const orderClause = getSortClause(sort)

  const start = (page - 1) * limit
  const end = start + limit

  const query = `{
    "cars": *[_type == "car"${filterQuery}] ${orderClause} [${start}...${end}] {
      ...,
      "slug": slug.current
    },
    "total": count(*[_type == "car"${filterQuery}])
  }`

  return client.fetch(query, params)
}

function buildFilterQuery(filters?: CarFilters) {
  let query = ''
  const params: Record<string, any> = {}

  if (!filters) return { filterQuery: query, params }

  if (filters.search) {
    query += ' && (brand match $search || model match $search)'
    params.search = `*${filters.search}*`
  }

  if (filters.brand) {
    query += ' && brand == $brand'
    params.brand = filters.brand
  }

  if (filters.model) {
    query += ' && model == $model'
    params.model = filters.model
  }

  if (filters.minYear) {
    query += ' && year >= $minYear'
    params.minYear = filters.minYear
  }

  if (filters.maxYear) {
    query += ' && year <= $maxYear'
    params.maxYear = filters.maxYear
  }

  if (filters.minPrice) {
    query += ' && price >= $minPrice'
    params.minPrice = filters.minPrice
  }

  if (filters.maxPrice) {
    query += ' && price <= $maxPrice'
    params.maxPrice = filters.maxPrice
  }

  if (filters.minMileage) {
    query += ' && mileage >= $minMileage'
    params.minMileage = filters.minMileage
  }

  if (filters.maxMileage) {
    query += ' && mileage <= $maxMileage'
    params.maxMileage = filters.maxMileage
  }

  if (filters.fuelType) {
    query += ' && fuelType == $fuelType'
    params.fuelType = filters.fuelType
  }

  if (filters.transmission) {
    query += ' && transmission == $transmission'
    params.transmission = filters.transmission
  }

  if (filters.drivetrain) {
    query += ' && drivetrain == $drivetrain'
    params.drivetrain = filters.drivetrain
  }

  if (filters.color) {
    query += ' && color == $color'
    params.color = filters.color
  }

  if (filters.inStock !== undefined) {
    query += ' && inStock == $inStock'
    params.inStock = filters.inStock
  }

  if (filters.hasVideo) {
    query += ' && defined(video)'
  }

  return { filterQuery: query, params }
}

function getSortClause(sort: string): string {
  switch (sort) {
    case 'price-asc':
      return '| order(price asc)'
    case 'price-desc':
      return '| order(price desc)'
    case 'year-asc':
      return '| order(year asc)'
    case 'year-desc':
      return '| order(year desc)'
    case 'mileage-asc':
      return '| order(mileage asc)'
    case 'mileage-desc':
      return '| order(mileage desc)'
    case 'date-asc':
      return '| order(_createdAt asc)'
    case 'date-desc':
      return '| order(_createdAt desc)'
    default:
      return '| order(brand asc, model asc)'
  }
}

export async function getCarById(id: string): Promise<Car> {
  const query = '*[_type == "car" && (slug.current == $id || _id == $id)][0] { ..., "slug": slug.current, "videoUrl": video.asset->url }'
  return client.fetch(query, { id })
}

export async function getAllCarIds(): Promise<string[]> {
  const query = '*[_type == "car"] { "slug": slug.current, _id }'
  const cars = await client.fetch<{ slug?: string; _id: string }[]>(query)
  return cars.map((car) => car.slug || car._id)
}

export async function getFeaturedCars(): Promise<Car[]> {
  const query = '*[_id == "newCars"].cars[]->{ ..., "slug": slug.current, "videoUrl": video.asset->url }'
  const featuredCars = await client.fetch(query)

  if (!featuredCars || featuredCars.length === 0) {
    // Fallback: Fetch latest 6 cars using existing getCars function
    const { cars } = await getCars({ limit: 6, sort: "date-desc" });
    return cars;
  }

  return featuredCars
}

export async function getSimilarCars(car: Car): Promise<Car[]> {
  const { _id, brand, price, year, fuelType } = car

  // Define similarity ranges
  const minPrice = price ? price * 0.7 : 0
  const maxPrice = price ? price * 1.3 : 1000000
  const minYear = year ? year - 4 : 2000
  const maxYear = year ? year + 4 : new Date().getFullYear()

  // Score based query:
  // - Matches brand (High priority)
  // - Matches price range (Medium priority)
  // - Matches year range (Medium priority)
  // - Matches fuel type (Low priority)
  // We filter to ensure we at least get cars that match ANY of slightly broader criteria to ensure results
  const query = `
    *[_type == "car" && _id != $_id && (
      brand == $brand ||
      (price >= $minPrice && price <= $maxPrice)
    )]
    | score(
      brand == $brand,
      brand == $brand,
      brand == $brand,
      price >= ${price * 0.85} && price <= ${price * 1.15},
      year >= ${year - 2} && year <= ${year + 2},
      fuelType == $fuelType
    )
    | order(_score desc)
    [0...10] {
      ...,
      "slug": slug.current,
      "videoUrl": video.asset->url
    }
  `

  try {
    const results = await client.fetch(query, {
      _id,
      brand,
      minPrice,
      maxPrice,
      fuelType,
      year
    })

    // Fallback: If strict smart query returns nothing, just get any recent cars to ensure we show something
    if (!results || results.length === 0) {
       return getFeaturedCars().then(cars => cars.slice(0, 6));
    }

    return results
  } catch (error) {
    console.error("Error fetching similar cars:", error)
    return []
  }
}

export async function getBrands(): Promise<string[]> {
  const query = '*[_type == "car"] | order(brand asc).brand'
  const brands = await client.fetch<string[]>(query)
  return [...new Set(brands)]
}

export async function getColors(): Promise<string[]> {
  const query = '*[_type == "car" && defined(color)] | order(color asc).color'
  const colors = await client.fetch<string[]>(query)
  return [...new Set(colors)]
}

export async function getModels(brand?: string): Promise<string[]> {
  let query = '*[_type == "car"'
  const params: Record<string, any> = {}

  if (brand) {
    query += ' && brand == $brand'
    params.brand = brand
  }

  query += '] | order(model asc).model'
  const models = await client.fetch<string[]>(query, params)
  return [...new Set(models)]
}
