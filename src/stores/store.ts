import { ref, computed } from 'vue'

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

export interface CartItem extends Product {
  quantity: number
}

export type TabKey = 'featured' | 'newArrivals' | 'bestSeller'
export type CategoryKey = 'athleticFootwear' | 'luxuryLeatherShoes' | 'sustainableFootwear' | 'sandalsAndslides'
export type BrandKey = 'nike' | 'vans' | 'adidas'

// --- SHARED GLOBAL STATE ---
// We keep these outside the function so the data is shared across all components
// and persists when you navigate between pages.
const selectedProduct = ref<ProductDetail | null>(null)
const wishlistItems = ref<WishlistItem[]>([])
const cartItems = ref<CartItem[]>([])

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

// --- STORE COMPOSABLE ---
export function useProductStore() {
  // Get all products as a flat array for searching
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

  const findProductById = (id: string): Product | undefined => {
    return allProducts.value.find((p) => p.id === id)
  }

  // --- WISHLIST LOGIC ---
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
  }

  const removeFromWishlist = (productId: string) => {
    wishlistItems.value = wishlistItems.value.filter((item) => item.id !== productId)
  }

  const wishlistCount = computed(() => wishlistItems.value.length)

  // --- CART LOGIC ---
  const addToCart = (productId: string) => {
    const existingItem = cartItems.value.find((item) => item.id === productId)
    if (existingItem) {
      existingItem.quantity++
    } else {
      const product = findProductById(productId)
      if (product) {
        cartItems.value.push({ ...product, quantity: 1 })
      }
    }
  }

  const cartCount = computed(() => cartItems.value.reduce((acc, item) => acc + item.quantity, 0))

  // --- QUICK VIEW LOGIC ---
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

  return {
    // State
    selectedProduct,
    wishlistItems,
    cartItems,
    allProducts,
    // Wishlist Methods
    wishlistCount,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    // Cart Methods
    addToCart,
    cartCount,
    // Modal Methods
    openQuickView,
    closeQuickView,
    findProductById,
  }
}