import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// --- TYPES ---
export interface Product {
  id: string
  name: string
  price: string
  img: string
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
  id: number
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

// --- PRODUCT DATA ---
export const products: Record<TabKey, Product[]> = {
  featured: [
    { id: '1', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '2', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '3', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '4', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
    { id: '5', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
  ],
  newArrivals: [
    { id: '6', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '7', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '8', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
    { id: '9', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '10', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
  ],
  bestSeller: [
    { id: '11', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '12', name: 'Waterproof White Sneaker', price: '$25.00', img: 'waterproof.png' },
    { id: '13', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '14', name: 'Light Weight Running Shoes', price: '$25.00', img: 'running.png' },
    { id: '15', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
  ],
}

export const productsByCategory: Record<CategoryKey, Product[]> = {
  athleticFootwear: [
    { id: '16', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '17', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '18', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '19', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
    { id: '20', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
  ],
  luxuryLeatherShoes: [
    { id: '21', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '22', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '23', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
    { id: '24', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '25', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
  ],
  sustainableFootwear: [
    { id: '26', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '27', name: 'Waterproof White Sneaker', price: '$25.00', img: 'waterproof.png' },
    { id: '28', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '29', name: 'Light Weight Running Shoes', price: '$25.00', img: 'running.png' },
    { id: '30', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
  ],
  sandalsAndslides: [
    { id: '31', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
    { id: '32', name: 'Classic White Tennis Sneakers', price: '$25.00', img: 'tennis.png' },
    { id: '33', name: 'Light Weight Running Shoes', price: '$21.00', img: 'running.png' },
    { id: '34', name: 'Waterproof White Sneaker', price: '$21.00', img: 'waterproof.png' },
    { id: '35', name: 'Premium Leather Chelsea Boots', price: '$25.00', img: 'chelsea.png' },
  ],
}

export const productsByBrand: Record<BrandKey, Product[]> = {
  nike: Array.from({ length: 10 }, (_, i) => ({
    id: `nike-${i + 1}`,
    name: 'Classic White Tennis Sneakers',
    price: '$25.00',
    img: 'tennis.png',
  })),
  vans: Array.from({ length: 10 }, (_, i) => ({
    id: `vans-${i + 1}`,
    name: 'Premium Leather Chelsea Boots',
    price: '$25.00',
    img: 'chelsea.png',
  })),
  adidas: Array.from({ length: 10 }, (_, i) => ({
    id: `adidas-${i + 1}`,
    name: 'Waterproof White Sneaker',
    price: '$25.00',
    img: 'waterproof.png',
  })),
}

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

export const tabs: { id: TabKey; label: string }[] = [
  { id: 'featured', label: 'FEATURED' },
  { id: 'newArrivals', label: 'NEW ARRIVALS' },
  { id: 'bestSeller', label: 'BEST SELLER' },
]

export const categoryTabs: { id: CategoryKey; label: string }[] = [
  { id: 'athleticFootwear', label: 'Athletic Footwear' },
  { id: 'luxuryLeatherShoes', label: 'Luxury Leather Shoes' },
  { id: 'sustainableFootwear', label: 'Sustainable Footwear' },
  { id: 'sandalsAndslides', label: 'Sandals & Slides' },
]

export const brandTabs: { id: BrandKey; label: string }[] = [
  { id: 'nike', label: 'NIKE' },
  { id: 'vans', label: 'VANS' },
  { id: 'adidas', label: 'ADIDAS' },
]

// --- HELPER FUNCTIONS FOR LOCALSTORAGE ---
const CART_STORAGE_KEY = 'velocity_cart_items'
const WISHLIST_STORAGE_KEY = 'velocity_wishlist_items'

function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

function loadWishlist(): WishlistItem[] {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveWishlist(items: WishlistItem[]) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
}

// --- PINIA STORE ---
export const useProductStore = defineStore('product', () => {
  // --- STATE ---
  const selectedProduct = ref<ProductDetail | null>(null)
  const selectedProductDetail = ref<ProductDetail | null>(null)
  const wishlistItems = ref<WishlistItem[]>(loadWishlist())
  const cartItems = ref<CartItem[]>(loadCart())

  // --- COMPUTED / GETTERS ---
  const allProducts = computed(() => {
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

  const wishlistCount = computed(() => wishlistItems.value.length)
  
  const cartCount = computed(() => 
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  
  const subtotal = computed(() => 
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )
  
  const totalItems = computed(() => 
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  // Expose items as a computed property for template access
  const items = computed(() => cartItems.value)

  // --- PRODUCT METHODS ---
  const findProductById = (id: string): Product | undefined => {
    return allProducts.value.find((p) => p.id === id)
  }

  const getProductDetail = (id: string): ProductDetail | undefined => {
    const product = findProductById(id)
    if (!product) return undefined

    let category = 'Athletic Footwear'
    let brand = 'Nike'
    const description = 'Classic sneakers with premium materials and comfort.'
    const madeIn = 'United States'

    if (product.id.includes('nike')) brand = 'Nike'
    if (product.id.includes('vans')) brand = 'Vans'
    if (product.id.includes('adidas')) brand = 'Adidas'

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
    id: number
    name: string
    price: number
    img: string
    size?: string
    quantity?: number
  }) => {
    const qty = payload.quantity ?? 1

    const existing = cartItems.value.find(
      (item) => item.id === payload.id && (item.size ?? '') === (payload.size ?? '')
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

  const removeItem = (id: number, size?: string) => {
    cartItems.value = cartItems.value.filter(
      (item) => !(item.id === id && (item.size ?? '') === (size ?? ''))
    )
    saveCart(cartItems.value)
  }

  const updateQuantity = (id: number, size: string | undefined, qty: number) => {
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
        brand: brandName,
        category: 'Athletic Footwear',
        madeIn: 'United States',
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

  return {
    // State
    selectedProduct,
    selectedProductDetail,
    wishlistItems,
    cartItems,
    items, // Expose for template access
    
    // Computed/Getters
    allProducts,
    wishlistCount,
    cartCount,
    subtotal,
    totalItems,
    
    // Product Methods
    findProductById,
    getProductDetail,
    
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
  }
})

// For backward compatibility, export a composable version
export function useCartStore() {
  return useProductStore()
}