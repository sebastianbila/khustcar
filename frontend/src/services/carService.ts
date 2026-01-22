import { client } from '@/lib/sanity';
import type { Car, CarFilters } from '@/types/car';

export async function getCars(
  filters?: CarFilters,
  page: number = 1,
  limit: number = 12,
  sort: string = ''
): Promise<{ cars: Car[]; total: number }> {
  const { filterQuery, params } = buildFilterQuery(filters)
  const orderClause = getSortClause(sort)

  const start = (page - 1) * limit
  const end = start + limit

  const query = `{
    "cars": *[_type == "car"${filterQuery}] ${orderClause} [${start}...${end}],
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
    default:
      return '| order(brand asc, model asc)'
  }
}

export async function getCarById(id: string): Promise<Car> {
  const query = '*[_type == "car" && _id == $id][0] { ..., "videoUrl": video.asset->url }'
  return client.fetch(query, { id })
}

export async function getAllCarIds(): Promise<string[]> {
  const query = '*[_type == "car"]._id'
  return client.fetch(query)
}

export async function getFeaturedCars(): Promise<Car[]> {
  const query = '*[_id == "newCars"].cars[]->{ ..., "videoUrl": video.asset->url }'
  return client.fetch(query) ?? []
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
