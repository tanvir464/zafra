export interface Perfume {
  id: string
  name: string
  brand: string
  description: string
  price: number
  discount_price?: number
  image_url: string
  category: string
  stock: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email?: string
  phone?: string
  name?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  user_id: string
  perfume_id: string
  quantity: number
  perfume?: Perfume
}

export interface WishlistItem {
  id: string
  user_id: string
  perfume_id: string
  perfume?: Perfume
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  payment_method: 'cod' | 'bkash' | 'sslcommerz'
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: string
  phone: string
  name: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  perfume_id: string
  quantity: number
  price: number
  perfume?: Perfume
}

export interface Banner {
  id: string
  title: string
  image_url: string
  link?: string
  active: boolean
  order: number
  created_at: string
}

export type Language = 'en' | 'bn' 