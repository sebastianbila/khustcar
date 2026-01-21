export interface Car {
  _id: string
  _type: 'car'
  brand: string
  model: string
  year: number
  price: number
  discountPrice?: number
  engineSize: string
  mileage: number
  color: string
  fuelType: 'diesel' | 'petrol' | 'electric'
  transmission: 'manual' | 'automatic'
  inStock: boolean
  description?: any[]
  images?: Array<{
    _key: string
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }>
  videoUrl?: string
}

export interface CarFilters {
  search?: string
  brand?: string
  model?: string
  minYear?: number
  maxYear?: number
  minPrice?: number
  maxPrice?: number
  minMileage?: number
  maxMileage?: number
  fuelType?: 'diesel' | 'petrol' | 'electric'
  transmission?: 'manual' | 'automatic'
  color?: string
  inStock?: boolean
}
