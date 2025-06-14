'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './AuthContext'
import { Perfume, CartItem, WishlistItem } from '@/types'

interface PerfumeContextType {
  // Cart functionality
  cartItems: CartItem[]
  addToCart: (perfumeId: string, quantity?: number) => Promise<void>
  removeFromCart: (perfumeId: string) => Promise<void>
  updateCartQuantity: (perfumeId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getCartTotal: () => number
  getCartItemCount: () => number

  // Wishlist functionality
  wishlistItems: WishlistItem[]
  addToWishlist: (perfumeId: string) => Promise<void>
  removeFromWishlist: (perfumeId: string) => Promise<void>
  isInWishlist: (perfumeId: string) => boolean

  // Purchase functionality
  createOrder: (orderData: {
    total_amount: number
    payment_method: 'cod' | 'bkash' | 'sslcommerz'
    shipping_address: string
    phone: string
    name: string
  }) => Promise<string | null>

  // Loading states
  cartLoading: boolean
  wishlistLoading: boolean
  orderLoading: boolean
}

const PerfumeContext = createContext<PerfumeContextType | undefined>(undefined)

export const usePerfume = () => {
  const context = useContext(PerfumeContext)
  if (context === undefined) {
    throw new Error('usePerfume must be used within a PerfumeProvider')
  }
  return context
}

interface PerfumeProviderProps {
  children: ReactNode
}

export const PerfumeProvider: React.FC<PerfumeProviderProps> = ({ children }) => {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [cartLoading, setCartLoading] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)
  const [orderLoading, setOrderLoading] = useState(false)

  // Load user's cart and wishlist on login
  useEffect(() => {
    if (user) {
      loadUserCart()
      loadUserWishlist()
    } else {
      // Clear cart and wishlist when user logs out
      setCartItems([])
      setWishlistItems([])
    }
  }, [user])

  // Load user's cart from database
  const loadUserCart = async () => {
    if (!user) return

    try {
      setCartLoading(true)
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          perfume:perfumes(*)
        `)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error loading cart:', error)
        return
      }

      setCartItems(data || [])
    } catch (error) {
      console.error('Error in loadUserCart:', error)
    } finally {
      setCartLoading(false)
    }
  }

  // Load user's wishlist from database
  const loadUserWishlist = async () => {
    if (!user) return

    try {
      setWishlistLoading(true)
      const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
          *,
          perfume:perfumes(*)
        `)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error loading wishlist:', error)
        return
      }

      setWishlistItems(data || [])
    } catch (error) {
      console.error('Error in loadUserWishlist:', error)
    } finally {
      setWishlistLoading(false)
    }
  }

  // Add item to cart
  const addToCart = async (perfumeId: string, quantity: number = 1) => {
    if (!user) {
      alert('Please login to add items to cart')
      return
    }

    try {
      setCartLoading(true)

      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.perfume_id === perfumeId)

      if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + quantity
        await updateCartQuantity(perfumeId, newQuantity)
      } else {
        // Add new item
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            perfume_id: perfumeId,
            quantity: quantity
          })
          .select(`
            *,
            perfume:perfumes(*)
          `)
          .single()

        if (error) {
          console.error('Error adding to cart:', error)
          alert('Failed to add item to cart')
          return
        }

        setCartItems(prev => [...prev, data])
      }

      alert('Added to cart successfully!')
    } catch (error) {
      console.error('Error in addToCart:', error)
      alert('Failed to add item to cart')
    } finally {
      setCartLoading(false)
    }
  }

  // Remove item from cart
  const removeFromCart = async (perfumeId: string) => {
    if (!user) return

    try {
      setCartLoading(true)
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('perfume_id', perfumeId)

      if (error) {
        console.error('Error removing from cart:', error)
        return
      }

      setCartItems(prev => prev.filter(item => item.perfume_id !== perfumeId))
    } catch (error) {
      console.error('Error in removeFromCart:', error)
    } finally {
      setCartLoading(false)
    }
  }

  // Update cart item quantity
  const updateCartQuantity = async (perfumeId: string, quantity: number) => {
    if (!user) return

    try {
      setCartLoading(true)
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('perfume_id', perfumeId)

      if (error) {
        console.error('Error updating cart quantity:', error)
        return
      }

      setCartItems(prev => 
        prev.map(item => 
          item.perfume_id === perfumeId 
            ? { ...item, quantity }
            : item
        )
      )
    } catch (error) {
      console.error('Error in updateCartQuantity:', error)
    } finally {
      setCartLoading(false)
    }
  }

  // Clear entire cart
  const clearCart = async () => {
    if (!user) return

    try {
      setCartLoading(true)
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

      if (error) {
        console.error('Error clearing cart:', error)
        return
      }

      setCartItems([])
    } catch (error) {
      console.error('Error in clearCart:', error)
    } finally {
      setCartLoading(false)
    }
  }

  // Add item to wishlist
  const addToWishlist = async (perfumeId: string) => {
    if (!user) {
      alert('Please login to add items to wishlist')
      return
    }

    try {
      setWishlistLoading(true)
      const { data, error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          perfume_id: perfumeId
        })
        .select(`
          *,
          perfume:perfumes(*)
        `)
        .single()

      if (error) {
        console.error('Error adding to wishlist:', error)
        alert('Failed to add item to wishlist')
        return
      }

      setWishlistItems(prev => [...prev, data])
      alert('Added to wishlist successfully!')
    } catch (error) {
      console.error('Error in addToWishlist:', error)
      alert('Failed to add item to wishlist')
    } finally {
      setWishlistLoading(false)
    }
  }

  // Remove item from wishlist
  const removeFromWishlist = async (perfumeId: string) => {
    if (!user) return

    try {
      setWishlistLoading(true)
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('perfume_id', perfumeId)

      if (error) {
        console.error('Error removing from wishlist:', error)
        return
      }

      setWishlistItems(prev => prev.filter(item => item.perfume_id !== perfumeId))
    } catch (error) {
      console.error('Error in removeFromWishlist:', error)
    } finally {
      setWishlistLoading(false)
    }
  }

  // Check if item is in wishlist
  const isInWishlist = (perfumeId: string): boolean => {
    return wishlistItems.some(item => item.perfume_id === perfumeId)
  }

  // Create order
  const createOrder = async (orderData: {
    total_amount: number
    payment_method: 'cod' | 'bkash' | 'sslcommerz'
    shipping_address: string
    phone: string
    name: string
  }): Promise<string | null> => {
    if (!user) {
      alert('Please login to place an order')
      return null
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty')
      return null
    }

    try {
      setOrderLoading(true)
       
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: orderData.total_amount,
          payment_method: orderData.payment_method,
          shipping_address: orderData.shipping_address,
          phone: orderData.phone,
          name: orderData.name
        })
        .select()
        .single()

    

      if (orderError) {
        console.error('Error creating order:', orderError)
        alert('Failed to create order')
        return null
      }
      const { data: userData, error: userError } = await supabase
        .from('users')
        .update({
            address: orderData.shipping_address,
            phone: orderData.phone,
        })
        .eq('id', user.id)


      if (userError) {
        console.error('Error updating user data:', userError)
        alert('Failed to update user data')
        return null
      }

    //   if (userError) {
    //     console.error('Error adding user data:', userError)
    //     alert('Failed to add user data')
    //     return null
    //   }



      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        perfume_id: item.perfume_id,
        quantity: item.quantity,
        price: item.perfume?.discount_price || item.perfume?.price || 0
      }))

      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (orderItemsError) {
        console.error('Error creating order items:', orderItemsError)
        alert('Failed to create order items')
        return null
      }

      // Clear cart after successful order
      await clearCart()

      alert('Order placed successfully!')
      return order.id
    } catch (error) {
      console.error('Error in createOrder:', error)
      alert('Failed to place order')
      return null
    } finally {
      setOrderLoading(false)
    }
  }

  // Calculate cart total
  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => {
      const price = item.perfume?.discount_price || item.perfume?.price || 0
      return total + (price * item.quantity)
    }, 0)
  }

  // Get cart item count
  const getCartItemCount = (): number => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value: PerfumeContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    createOrder,
    cartLoading,
    wishlistLoading,
    orderLoading
  }

  return (
    <PerfumeContext.Provider value={value}>
      {children}
    </PerfumeContext.Provider>
  )
} 