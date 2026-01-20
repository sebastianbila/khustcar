import { client } from '@/lib/sanity'
import type { Car, CarFilters } from '@/types/car'

export async function getCars(filters?: CarFilters): Promise<Car[]> {
  let query = '*[_type == "car"'
  const params: Record<string, any> = {}

  if (filters?.search) {
    query += ' && (brand match $search || model match $search)'
    params.search = `*${filters.search}*`
  }

  if (filters?.brand) {
    query += ' && brand == $brand'
    params.brand = filters.brand
  }

  if (filters?.minYear) {
    query += ' && year >= $minYear'
    params.minYear = filters.minYear
  }

  if (filters?.maxYear) {
    query += ' && year <= $maxYear'
    params.maxYear = filters.maxYear
  }

  if (filters?.minPrice) {
    query += ' && price >= $minPrice'
    params.minPrice = filters.minPrice
  }

  if (filters?.maxPrice) {
    query += ' && price <= $maxPrice'
    params.maxPrice = filters.maxPrice
  }

  query += '] | order(brand asc, model asc)'

  return client.fetch(query, params)
}

export async function getCarById(id: string): Promise<Car> {
  const query = '*[_type == "car" && _id == $id][0]'
  return client.fetch(query, { id })
}

export async function getBrands(): Promise<string[]> {
  const query = '*[_type == "car"] | order(brand asc).brand'
  const brands = await client.fetch<string[]>(query)
  return [...new Set(brands)]
}
