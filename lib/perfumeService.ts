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

  // Fetch a single perfume by ID
  static async getPerfumeById(id: string): Promise<Perfume | null> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching perfume by ID:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in getPerfumeById:', error)
      return null
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

  // Fetch unique brands
  static async getUniqueBrands(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('brand')
        .order('brand', { ascending: true })

      if (error) {
        console.error('Error fetching brands:', error)
        throw error
      }

      // Remove duplicates and return unique brands
      const uniqueBrands = [...new Set(data?.map(item => item.brand) || [])]
      return uniqueBrands
    } catch (error) {
      console.error('Error in getUniqueBrands:', error)
      return []
    }
  }

  // Fetch perfumes by brand
  static async getPerfumesByBrand(brand: string): Promise<Perfume[]> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('*')
        .eq('brand', brand)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching perfumes by brand:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in getPerfumesByBrand:', error)
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