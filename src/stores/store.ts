import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { StoreProduct } from '@/types/product'

// --- TYPES ---
export interface Product {
  id: string
  name: string
  price: string
  img: string
  isNew?: boolean
  isDiscounted?: boolean
  madeIn?: string
  sizeRange?: string
  brand?: string
}

export interface ProductDetail extends Product {
  description: string
  sizes: string[]
  brand: string
  category: string
  madeIn: string
}

export interface WishlistItem extends Product {
  color: string
  size: string
  addedAt: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  img: string
  size?: string
}

export type TabKey = 'featured' | 'newArrivals' | 'bestSeller'
export type CategoryKey =
  | 'athleticFootwear'
  | 'luxuryLeatherShoes'
  | 'sustainableFootwear'
  | 'sandalsAndslides'
export type BrandKey = 'nike' | 'vans' | 'adidas'

// Filter types
export interface FilterOptions {
  newArrivalsOrDiscount: 'new' | 'discount' | null
  priceRange: string
  madeIn: string
  sizeRange: string
}

// --- PRODUCT DATA WITH FILTER ATTRIBUTES ---
export const products: Record<TabKey, Product[]> = {
  featured: [
    {
      id: '1',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '40-46',
      brand: 'Nike',
    },
    {
      id: '2',
      name: 'Classic White Tennis Sneakers',
      price: '$25.00',
      img: 'tennis.png',
      madeIn: 'UK',
      sizeRange: '35-39',
      brand: 'Adidas',
    },
    {
      id: '3',
      name: 'Light Weight Running Shoes',
      price: '$21.00',
      img: 'running.png',
      madeIn: 'CN',
      sizeRange: '40-46',
      brand: 'Nike',
      isNew: true,
    },
    {
      id: '4',
      name: 'Waterproof White Sneaker',
      price: '$21.00',
      img: 'waterproof.png',
      madeIn: 'US',
      sizeRange: '35-39',
      brand: 'Vans',
      isDiscounted: true,
    },
    {
      id: '5',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'UK',
      sizeRange: '15-27',
      brand: 'Adidas',
    },
  ],
  newArrivals: [
    {
      id: '6',
      name: 'Light Weight Running Shoes',
      price: '$21.00',
      img: 'running.png',
      madeIn: 'CN',
      sizeRange: '28-34',
      brand: 'Nike',
      isNew: true,
    },
    {
      id: '7',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '40-46',
      brand: 'Vans',
      isNew: true,
    },
    {
      id: '8',
      name: 'Waterproof White Sneaker',
      price: '$21.00',
      img: 'waterproof.png',
      madeIn: 'UK',
      sizeRange: '35-39',
      brand: 'Nike',
      isNew: true,
    },
    {
      id: '9',
      name: 'Classic White Tennis Sneakers',
      price: '$25.00',
      img: 'tennis.png',
      madeIn: 'CN',
      sizeRange: '40-46',
      brand: 'Adidas',
      isNew: true,
    },
    {
      id: '10',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '15-27',
      brand: 'Nike',
      isNew: true,
    },
  ],
  bestSeller: [
    {
      id: '11',
      name: 'Classic White Tennis Sneakers',
      price: '$25.00',
      img: 'tennis.png',
      madeIn: 'UK',
      sizeRange: '35-39',
      brand: 'Adidas',
      isDiscounted: true,
    },
    {
      id: '12',
      name: 'Waterproof White Sneaker',
      price: '$25.00',
      img: 'waterproof.png',
      madeIn: 'CN',
      sizeRange: '40-46',
      brand: 'Vans',
      isDiscounted: true,
    },
    {
      id: '13',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '28-34',
      brand: 'Nike',
    },
    {
      id: '14',
      name: 'Light Weight Running Shoes',
      price: '$25.00',
      img: 'running.png',
      madeIn: 'UK',
      sizeRange: '40-46',
      brand: 'Adidas',
    },
    {
      id: '15',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'CN',
      sizeRange: '35-39',
      brand: 'Vans',
      isDiscounted: true,
    },
  ],
}

export const productsByCategory: Record<CategoryKey, Product[]> = {
  athleticFootwear: [
    {
      id: '16',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '40-46',
      brand: 'Nike',
    },
    {
      id: '17',
      name: 'Classic White Tennis Sneakers',
      price: '$25.00',
      img: 'tennis.png',
      madeIn: 'UK',
      sizeRange: '35-39',
      brand: 'Adidas',
      isNew: true,
    },
    {
      id: '18',
      name: 'Light Weight Running Shoes',
      price: '$21.00',
      img: 'running.png',
      madeIn: 'CN',
      sizeRange: '40-46',
      brand: 'Nike',
    },
    {
      id: '19',
      name: 'Waterproof White Sneaker',
      price: '$21.00',
      img: 'waterproof.png',
      madeIn: 'US',
      sizeRange: '28-34',
      brand: 'Vans',
      isDiscounted: true,
    },
    {
      id: '20',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'UK',
      sizeRange: '15-27',
      brand: 'Adidas',
    },
  ],
  luxuryLeatherShoes: [
    {
      id: '21',
      name: 'Light Weight Running Shoes',
      price: '$21.00',
      img: 'running.png',
      madeIn: 'CN',
      sizeRange: '35-39',
      brand: 'Nike',
      isNew: true,
    },
    {
      id: '22',
      name: 'Premium Leather Chelsea Boots',
      price: '$650.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '40-46',
      brand: 'Vans',
    },
    {
      id: '23',
      name: 'Waterproof White Sneaker',
      price: '$21.00',
      img: 'waterproof.png',
      madeIn: 'UK',
      sizeRange: '40-46',
      brand: 'Nike',
      isDiscounted: true,
    },
    {
      id: '24',
      name: 'Classic White Tennis Sneakers',
      price: '$750.00',
      img: 'tennis.png',
      madeIn: 'CN',
      sizeRange: '35-39',
      brand: 'Adidas',
    },
    {
      id: '25',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '28-34',
      brand: 'Nike',
    },
  ],
  sustainableFootwear: [
    {
      id: '26',
      name: 'Classic White Tennis Sneakers',
      price: '$25.00',
      img: 'tennis.png',
      madeIn: 'UK',
      sizeRange: '40-46',
      brand: 'Adidas',
      isNew: true,
    },
    {
      id: '27',
      name: 'Waterproof White Sneaker',
      price: '$850.00',
      img: 'waterproof.png',
      madeIn: 'CN',
      sizeRange: '35-39',
      brand: 'Vans',
      isDiscounted: true,
    },
    {
      id: '28',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '40-46',
      brand: 'Nike',
    },
    {
      id: '29',
      name: 'Light Weight Running Shoes',
      price: '$25.00',
      img: 'running.png',
      madeIn: 'UK',
      sizeRange: '28-34',
      brand: 'Adidas',
    },
    {
      id: '30',
      name: 'Classic White Tennis Sneakers',
      price: '$25.00',
      img: 'tennis.png',
      madeIn: 'CN',
      sizeRange: '35-39',
      brand: 'Vans',
    },
  ],
  sandalsAndslides: [
    {
      id: '31',
      name: 'Waterproof White Sneaker',
      price: '$25.00',
      img: 'waterproof.png',
      madeIn: 'US',
      sizeRange: '40-46',
      brand: 'Nike',
      isNew: true,
    },
    {
      id: '32',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'UK',
      sizeRange: '35-39',
      brand: 'Adidas',
    },
    {
      id: '33',
      name: 'Light Weight Running Shoes',
      price: '$21.00',
      img: 'running.png',
      madeIn: 'CN',
      sizeRange: '40-46',
      brand: 'Nike',
      isDiscounted: true,
    },
    {
      id: '34',
      name: 'Classic White Tennis Sneakers',
      price: '$21.00',
      img: 'tennis.png',
      madeIn: 'US',
      sizeRange: '28-34',
      brand: 'Vans',
    },
    {
      id: '35',
      name: 'Waterproof White Sneaker',
      price: '$25.00',
      img: 'waterproof.png',
      madeIn: 'UK',
      sizeRange: '15-27',
      brand: 'Adidas',
    },
  ],
}

export const productsByBrand: Record<BrandKey, Product[]> = {
  nike: [
    {
      id: '36',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '40-46',
      brand: 'Nike',
    },
    {
      id: '37',
      name: 'Light Weight Running Shoes',
      price: '$21.00',
      img: 'running.png',
      madeIn: 'UK',
      sizeRange: '35-39',
      brand: 'Nike',
      isNew: true,
    },
    {
      id: '38',
      name: 'Waterproof White Sneaker',
      price: '$21.00',
      img: 'waterproof.png',
      madeIn: 'CN',
      sizeRange: '40-46',
      brand: 'Nike',
    },
    {
      id: '39',
      name: 'Classic White Tennis Sneakers',
      price: '$25.00',
      img: 'tennis.png',
      madeIn: 'US',
      sizeRange: '28-34',
      brand: 'Nike',
      isDiscounted: true,
    },
    {
      id: '40',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'UK',
      sizeRange: '15-27',
      brand: 'Nike',
    },
  ],
  vans: [
    {
      id: '41',
      name: 'Light Weight Running Shoes',
      price: '$21.00',
      img: 'running.png',
      madeIn: 'CN',
      sizeRange: '35-39',
      brand: 'Vans',
      isNew: true,
    },
    {
      id: '42',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '40-46',
      brand: 'Vans',
    },
    {
      id: '43',
      name: 'Waterproof White Sneaker',
      price: '$21.00',
      img: 'waterproof.png',
      madeIn: 'UK',
      sizeRange: '40-46',
      brand: 'Vans',
      isDiscounted: true,
    },
    {
      id: '44',
      name: 'Classic White Tennis Sneakers',
      price: '$25.00',
      img: 'tennis.png',
      madeIn: 'CN',
      sizeRange: '28-34',
      brand: 'Vans',
    },
    {
      id: '45',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '35-39',
      brand: 'Vans',
    },
  ],
  adidas: [
    {
      id: '46',
      name: 'Classic White Tennis Sneakers',
      price: '$25.00',
      img: 'tennis.png',
      madeIn: 'UK',
      sizeRange: '40-46',
      brand: 'Adidas',
      isNew: true,
    },
    {
      id: '47',
      name: 'Waterproof White Sneaker',
      price: '$25.00',
      img: 'waterproof.png',
      madeIn: 'CN',
      sizeRange: '35-39',
      brand: 'Adidas',
    },
    {
      id: '48',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'US',
      sizeRange: '40-46',
      brand: 'Adidas',
      isDiscounted: true,
    },
    {
      id: '49',
      name: 'Light Weight Running Shoes',
      price: '$25.00',
      img: 'running.png',
      madeIn: 'UK',
      sizeRange: '28-34',
      brand: 'Adidas',
    },
    {
      id: '50',
      name: 'Premium Leather Chelsea Boots',
      price: '$25.00',
      img: 'chelsea.png',
      madeIn: 'CN',
      sizeRange: '15-27',
      brand: 'Adidas',
    },
  ],
}

// Tab definitions
export const tabs = [
  { id: 'featured' as TabKey, label: 'Featured' },
  { id: 'newArrivals' as TabKey, label: 'New Arrivals' },
  { id: 'bestSeller' as TabKey, label: 'Best Seller' },
]

export const categoryTabs = [
  { id: 'athleticFootwear' as CategoryKey, label: 'Athletic Footwear' },
  { id: 'luxuryLeatherShoes' as CategoryKey, label: 'Luxury Leather Shoes' },
  { id: 'sustainableFootwear' as CategoryKey, label: 'Sustainable Footwear' },
  { id: 'sandalsAndslides' as CategoryKey, label: 'Sandals & Slides' },
]

export const brandTabs = [
  { id: 'nike' as BrandKey, label: 'Nike' },
  { id: 'vans' as BrandKey, label: 'Vans' },
  { id: 'adidas' as BrandKey, label: 'Adidas' },
]

export const categories = [
  { id: 1, img: 'athletic_footwear.png', name: 'Athletic Footwear' },
  { id: 2, img: 'luxury_leather_shoes.png', name: 'Luxury Leather' },
  { id: 3, img: 'sustainable_footwear.png', name: 'Sustainable Footwear' },
  { id: 4, img: 'sandals&slides.png', name: 'Sandals & Slides' },
]

export const brands = [
  { id: 1, img: 'nike.png', name: 'Nike' },
  { id: 2, img: 'vans.png', name: 'Vans' },
  { id: 3, img: 'adidas.png', name: 'Adidas' },
]
// Helper function to convert Product to StoreProduct
function convertToStoreProduct(product: Product): StoreProduct {
  return {
    id: product.id,
    name: product.name,
    description: 'Classic sneakers with premium materials and comfort.',
    price: parseFloat(product.price.replace('$', '')),
    img: product.img,
    category: 'athleticFootwear',
    brand: (product.brand?.toLowerCase() as BrandKey) || 'nike',
    sizeRange: product.sizeRange || '40-46',
    stock: 100,
    published: true,
    isNew: product.isNew,
    isDiscounted: product.isDiscounted,
    createdAt: Date.now(),
  }
}

// --- LOCAL STORAGE HELPERS ---
const WISHLIST_STORAGE_KEY = 'wishlist'
const CART_STORAGE_KEY = 'cart'

const loadWishlist = (): WishlistItem[] => {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveWishlist = (items: WishlistItem[]) => {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
}

const loadCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveCart = (items: CartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

// --- PINIA STORE ---
export const useProductStore = defineStore('product', () => {
  // --- STATE ---
  const selectedProduct = ref<ProductDetail | null>(null)
  const selectedProductDetail = ref<ProductDetail | null>(null)
  const wishlistItems = ref<WishlistItem[]>(loadWishlist())
  const cartItems = ref<CartItem[]>(loadCart())
  const currentFilters = ref<FilterOptions>({
    newArrivalsOrDiscount: null,
    priceRange: 'all',
    madeIn: 'all',
    sizeRange: 'all',
  })

  // --- ADMIN PRODUCT MANAGEMENT ---
  const initialProducts: StoreProduct[] = [
    ...products.featured,
    ...products.newArrivals,
    ...products.bestSeller,
    ...Object.values(productsByCategory).flat(),
  ].map(convertToStoreProduct)

  const productList = ref<StoreProduct[]>(
    JSON.parse(localStorage.getItem('products') || 'null') ?? initialProducts,
  )
  
  watch(
    productList,
    () => {
      localStorage.setItem('products', JSON.stringify(productList.value))
    },
    { deep: true },
  )

  // --- COMPUTED / GETTERS ---
  // Static hardcoded products (without user products)
  const hardcodedProducts = computed(() => {
    return [
      ...products.featured,
      ...products.newArrivals,
      ...products.bestSeller,
      ...productsByBrand.nike,
      ...productsByBrand.vans,
      ...productsByBrand.adidas,
      ...Object.values(productsByCategory).flat(),
    ]
  })

  // Published user products
  const userProducts = computed(() => productList.value.filter((p) => p.published))

  // Converted user products to Product format
  const convertedUserProducts = computed(() => {
    return userProducts.value.map((p) => ({
      id: p.id,
      name: p.name,
      price: typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price,
      img: p.img,
      isNew: p.isNew,
      isDiscounted: p.isDiscounted,
      madeIn: undefined,
      sizeRange: p.sizeRange,
      brand: p.brand,
    }))
  })

  // All products including user products
  const allProducts = computed(() => {
    return [...hardcodedProducts.value, ...convertedUserProducts.value]
  })

  const wishlistCount = computed(() => wishlistItems.value.length)

  const cartCount = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0))

  const subtotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const totalItems = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0))

  const items = computed(() => cartItems.value)

  // Admin products (all products regardless of published status)
  const adminProducts = computed(() => productList.value)

  // --- PRODUCT METHODS ---
  const findProductById = (id: string): Product | undefined => {
    const product = hardcodedProducts.value.find((p) => p.id === id)
    if (product) return product
    const userProduct = userProducts.value.find((p) => p.id === id)
    if (userProduct) {
      // Convert StoreProduct to Product
      return {
        id: userProduct.id,
        name: userProduct.name,
        price:
          typeof userProduct.price === 'number'
            ? `$${userProduct.price.toFixed(2)}`
            : userProduct.price,
        img: userProduct.img,
        isNew: userProduct.isNew,
        isDiscounted: userProduct.isDiscounted,
        madeIn: undefined,
        sizeRange: userProduct.sizeRange,
        brand: userProduct.brand,
      }
    }
    return undefined
  }

  const getProductDetail = (id: string): ProductDetail | undefined => {
    const product = findProductById(id)
    if (!product) return undefined

    let category = 'Athletic Footwear'
    const brand = product.brand || 'Nike'
    const description = 'Classic sneakers with premium materials and comfort.'
    const madeIn = product.madeIn || 'United States'

    if (productsByCategory.athleticFootwear.some((p) => p.id === id)) {
      category = 'Athletic Footwear'
    } else if (productsByCategory.luxuryLeatherShoes.some((p) => p.id === id)) {
      category = 'Luxury Leather Shoes'
    } else if (productsByCategory.sustainableFootwear.some((p) => p.id === id)) {
      category = 'Sustainable Footwear'
    } else if (productsByCategory.sandalsAndslides.some((p) => p.id === id)) {
      category = 'Sandals & Slides'
    }

    return {
      ...product,
      description,
      sizes: ['S', 'M', 'L', 'XL'],
      brand,
      category,
      madeIn,
    }
  }

  // Filter products method
  const getFilteredProducts = (filters: FilterOptions): Product[] => {
    return allProducts.value.filter((product) => {
      // Filter by new arrivals or discount
      if (filters.newArrivalsOrDiscount === 'new' && !product.isNew) return false
      if (filters.newArrivalsOrDiscount === 'discount' && !product.isDiscounted) return false

      // Filter by price range
      if (filters.priceRange !== 'all') {
        const price = parseFloat(product.price.replace('$', ''))
        if (filters.priceRange === '100-500' && (price < 100 || price > 500)) return false
        if (filters.priceRange === '500-1000' && (price < 500 || price > 1000)) return false
      }

      // Filter by made in
      if (filters.madeIn !== 'all' && product.madeIn !== filters.madeIn) return false

      // Filter by size range
      if (filters.sizeRange !== 'all' && product.sizeRange !== filters.sizeRange) return false

      return true
    })
  }

  // Search products method
  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allProducts.value.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q),
    )
  }

  // Set filters
  const setFilters = (filters: FilterOptions) => {
    currentFilters.value = filters
  }

  // --- WISHLIST ACTIONS ---
  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.value.some((item) => item.id === productId)
  }

  const toggleWishlist = (productId: string) => {
    const index = wishlistItems.value.findIndex((item) => item.id === productId)
    if (index > -1) {
      wishlistItems.value.splice(index, 1)
    } else {
      const product = findProductById(productId)
      if (product) {
        wishlistItems.value.push({
          ...product,
          color: 'White',
          size: 'M',
          addedAt: Date.now(),
        })
      }
    }
    saveWishlist(wishlistItems.value)
  }

  const removeFromWishlist = (productId: string) => {
    wishlistItems.value = wishlistItems.value.filter((item) => item.id !== productId)
    saveWishlist(wishlistItems.value)
  }

  const clearWishlist = () => {
    wishlistItems.value = []
    localStorage.removeItem(WISHLIST_STORAGE_KEY)
  }

  // --- CART ACTIONS ---
  const addToCart = (payload: {
    id: string
    name: string
    price: number
    img: string
    size?: string
    quantity?: number
  }) => {
    const qty = payload.quantity ?? 1

    const existing = cartItems.value.find(
      (item) => item.id === payload.id && (item.size ?? '') === (payload.size ?? ''),
    )

    if (existing) {
      existing.quantity += qty
    } else {
      cartItems.value.push({
        id: payload.id,
        name: payload.name,
        price: payload.price,
        img: payload.img,
        size: payload.size,
        quantity: qty,
      })
    }

    saveCart(cartItems.value)
  }

  const removeItem = (id: string, size?: string) => {
    cartItems.value = cartItems.value.filter(
      (item) => !(item.id === id && (item.size ?? '') === (size ?? '')),
    )
    saveCart(cartItems.value)
  }

  const updateQuantity = (id: string, size: string | undefined, qty: number) => {
    const item = cartItems.value.find((i) => i.id === id && (i.size ?? '') === (size ?? ''))
    if (!item) return
    item.quantity = Math.max(1, qty)
    saveCart(cartItems.value)
  }

  const clearCart = () => {
    cartItems.value = []
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  // --- MODAL ACTIONS ---
  const openQuickView = (productId: string, brandName: string = 'Nike') => {
    const product = findProductById(productId)
    if (product) {
      selectedProduct.value = {
        ...product,
        description: 'Classic sneakers, clean, comfortable, perfect for any outfit.',
        sizes: ['S', 'M', 'L', 'XL'],
        brand: product.brand || brandName,
        category: 'Athletic Footwear',
        madeIn: product.madeIn || 'United States',
      }
    }
  }

  const closeQuickView = () => {
    selectedProduct.value = null
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openProductDetail = (productId: string, brandName = 'Nike') => {
    const productDetail = getProductDetail(productId)
    if (productDetail) {
      selectedProductDetail.value = productDetail
    }
  }

  const closeProductDetail = () => {
    selectedProductDetail.value = null
  }

  // --- ADMIN PRODUCT METHODS ---
  const addProduct = (payload: Omit<StoreProduct, 'id' | 'createdAt'>) => {
    productList.value.unshift({
      ...payload,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    })
  }

  const deleteProduct = (id: string) => {
    productList.value = productList.value.filter((p) => p.id !== id)
  }

  const updateProduct = (id: string, data: Partial<StoreProduct>) => {
    const p = productList.value.find((p) => p.id === id)
    if (p) Object.assign(p, data)
  }

  return {
    // State
    selectedProduct,
    selectedProductDetail,
    wishlistItems,
    cartItems,
    items,
    currentFilters,

    // Computed/Getters
    allProducts,
    wishlistCount,
    cartCount,
    subtotal,
    totalItems,

    // Product Methods
    findProductById,
    getProductDetail,
    getFilteredProducts,
    searchProducts,
    setFilters,

    // Wishlist Methods
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,

    // Cart Methods
    addToCart,
    removeItem,
    updateQuantity,
    clearCart,

    // Modal Methods
    openQuickView,
    closeQuickView,
    openProductDetail,
    closeProductDetail,
    
    // Admin product methods
    productList,
    adminProducts,
    userProducts,
    addProduct,
    deleteProduct,
    updateProduct,
  }
})

// For backward compatibility, export a composable version
export function useCartStore() {
  return useProductStore()
}