import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useProductStore } from '@/stores/store'

/** Product stock inside a warehouse */
export interface WarehouseProduct {
  productId: string
  stockAvailable: number
  stockShipping: number
}

/** Warehouse = Brand */
export interface Warehouse {
  id: string
  brand: string
  manager: string
  products: WarehouseProduct[]
}

export const useInventoryStore = defineStore('inventory', () => {
  const productStore = useProductStore()

  /**
   * INITIALIZE WAREHOUSES BASED ON BRAND
   * (Nike, Adidas, Vans)
   */
  const warehouses = ref<Warehouse[]>([
    {
      id: 'WH-NIKE',
      brand: 'Nike',
      manager: 'NIKE MANAGER',
      products: [],
    },
    {
      id: 'WH-ADIDAS',
      brand: 'Adidas',
      manager: 'ADIDAS MANAGER',
      products: [],
    },
    {
      id: 'WH-VANS',
      brand: 'Vans',
      manager: 'VANS MANAGER',
      products: [],
    },
  ])

  /**
   * AUTO LOAD PRODUCTS INTO THEIR BRAND WAREHOUSE
   * (RUN ONCE)
   */
  const initializeInventory = () => {
    warehouses.value.forEach(warehouse => {
      const brandProducts = productStore.allProducts.filter(
        p => p.brand === warehouse.brand
      )

      warehouse.products = brandProducts.map(p => ({
        productId: p.id,
        stockAvailable: 0, // start empty
        stockShipping: 0,
      }))
    })
  }

  /**
   * GET PRODUCT STOCK (PER WAREHOUSE)
   */
  const getProductStock = (warehouseId: string, productId: string) => {
    const warehouse = warehouses.value.find(w => w.id === warehouseId)
    return warehouse?.products.find(p => p.productId === productId)
  }

  /**
   * UPDATE STOCK
   */
  const updateStock = (
    warehouseId: string,
    productId: string,
    stockAvailable: number,
    stockShipping = 0
  ) => {
    const product = getProductStock(warehouseId, productId)
    if (!product) return

    product.stockAvailable = stockAvailable
    product.stockShipping = stockShipping
  }

  /**
   * SUMMARY (FOR DASHBOARD)
   */
  const totalProductItems = computed(() =>
    warehouses.value.reduce(
      (sum, w) =>
        sum + w.products.reduce((s, p) => s + p.stockAvailable, 0),
      0
    )
  )

  const shippingItems = computed(() =>
    warehouses.value.reduce(
      (sum, w) =>
        sum + w.products.reduce((s, p) => s + p.stockShipping, 0),
      0
    )
  )

  return {
    warehouses,
    initializeInventory,
    getProductStock,
    updateStock,
    totalProductItems,
    shippingItems,
  }
})
