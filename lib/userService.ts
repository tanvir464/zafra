import { supabase } from './supabase'
import { User, Order, OrderItem } from '@/types'

export class UserService {
  static async getUserProfile(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      throw error
    }
  }

  static async updateUserProfile(userId: string, updates: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  }

  static async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching user orders:', error)
      throw error
    }
  }

  static async getOrderItems(orderIds: string[]): Promise<OrderItem[]> {
    try {
      if (orderIds.length === 0) return []

      const { data, error } = await supabase
        .from('order_items')
        .select(`
          *,
          perfume:perfumes(*)
        `)
        .in('order_id', orderIds)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching order items:', error)
      throw error
    }
  }

  static async getCurrentOrders(userId: string): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .in('status', ['pending', 'confirmed', 'shipped'])
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching current orders:', error)
      throw error
    }
  }

  static async getOrderHistory(userId: string): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .in('status', ['delivered', 'cancelled'])
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching order history:', error)
      throw error
    }
  }
} 