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
}

export interface CarFilters {
  search?: string
  brand?: string
  minYear?: number
  maxYear?: number
  minPrice?: number
  maxPrice?: number
}
