import { supabase } from './supabase'
import { Perfume } from '@/types'

export class PerfumeService {
  // Fetch all perfumes from the database
  static async getAllPerfumes(): Promise<Perfume[]> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching perfumes:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in getAllPerfumes:', error)
      return []
    }
  }

  // Fetch featured perfumes
  static async getFeaturedPerfumes(): Promise<Perfume[]> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching featured perfumes:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in getFeaturedPerfumes:', error)
      return []
    }
  }

  // Fetch perfumes by category
  static async getPerfumesByCategory(category: string): Promise<Perfume[]> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching perfumes by category:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in getPerfumesByCategory:', error)
      return []
    }
  }

  // Fetch perfumes with discounts
  static async getDiscountedPerfumes(): Promise<Perfume[]> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('*')
        .not('discount_price', 'is', null)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching discounted perfumes:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in getDiscountedPerfumes:', error)
      return []
    }
  }

  // Fetch expensive perfumes (exclusive collection)
  static async getExclusivePerfumes(minPrice: number = 10000): Promise<Perfume[]> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('*')
        .gte('price', minPrice)
        .order('price', { ascending: false })

      if (error) {
        console.error('Error fetching exclusive perfumes:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in getExclusivePerfumes:', error)
      return []
    }
  }

  // Search perfumes by name or brand
  static async searchPerfumes(query: string): Promise<Perfume[]> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('*')
        .or(`name.ilike.%${query}%,brand.ilike.%${query}%`)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error searching perfumes:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in searchPerfumes:', error)
      return []
    }
  }
} 