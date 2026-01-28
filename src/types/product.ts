import type { CategoryKey, BrandKey } from '@/stores/store'

export interface StoreProduct {
  id: string
  name: string
  description: string
  price: number
  img: string
  category: CategoryKey
  brand: BrandKey
  sizeRange: string
  stock: number
  isNew?: boolean
  isDiscounted?: boolean
  published: boolean
  createdAt: number
}
