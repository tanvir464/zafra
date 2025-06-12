'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import BannerCarousel from '@/components/BannerCarousel'
import PerfumeSection from '@/components/PerfumeSection'
import Footer from '@/components/Footer'
import { Perfume } from '@/types'

// Mock data for demonstration
const mockPerfumes: Perfume[] = [
  {
    id: '1',
    name: 'Chanel No. 5 Eau de Parfum',
    brand: 'Chanel',
    description: 'The iconic fragrance',
    price: 8500,
    discount_price: 7500,
    image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    category: 'women',
    stock: 10,
    featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    name: 'Dior Sauvage Eau de Toilette',
    brand: 'Dior',
    description: 'Fresh and masculine',
    price: 6500,
    image_url: 'https://images.unsplash.com/photo-1747916148827-d5fb453bb978?w=400&h=400&fit=crop',
    category: 'men',
    stock: 15,
    featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '3',
    name: 'Tom Ford Black Orchid',
    brand: 'Tom Ford',
    description: 'Luxurious and mysterious',
    price: 12000,
    discount_price: 10500,
    image_url: 'https://images.unsplash.com/photo-1618261325436-dc799dca3874?w=400&h=400&fit=crop',
    category: 'unisex',
    stock: 8,
    featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '4',
    name: 'Versace Bright Crystal',
    brand: 'Versace',
    description: 'Fresh and floral',
    price: 4500,
    image_url: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop',
    category: 'women',
    stock: 12,
    featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '5',
    name: 'Armani Code Men',
    brand: 'Giorgio Armani',
    description: 'Sophisticated and seductive',
    price: 5500,
    discount_price: 4800,
    image_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop',
    category: 'men',
    stock: 20,
    featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '6',
    name: 'Marc Jacobs Daisy',
    brand: 'Marc Jacobs',
    description: 'Youthful and feminine',
    price: 3800,
    image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    category: 'women',
    stock: 18,
    featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
]

export default function HomePage() {
  const { t } = useLanguage()
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<string[]>([])

  // Filter perfumes by categories
  const featuredPerfumes = mockPerfumes.filter(p => p.featured)
  const newArrivals = mockPerfumes.slice(0, 4)
  const bestSellers = mockPerfumes.filter(p => p.discount_price).slice(0, 4)
  const exclusiveCollection = mockPerfumes.filter(p => p.price > 10000)

  const handleAddToWishlist = async (perfumeId: string) => {
    // In a real app, this would make an API call
    if (wishlistItems.includes(perfumeId)) {
      setWishlistItems(prev => prev.filter(id => id !== perfumeId))
    } else {
      setWishlistItems(prev => [...prev, perfumeId])
    }
  }

  const handleAddToCart = async (perfumeId: string) => {
    // In a real app, this would make an API call
    setCartItems(prev => [...prev, perfumeId])
    // Show success notification
    alert('Added to cart!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Banner Carousel */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <BannerCarousel />
        </div>

        {/* Perfume Sections */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Featured Products */}
          <PerfumeSection
            title={t('featured')}
            perfumes={featuredPerfumes}
            onAddToWishlist={handleAddToWishlist}
            onAddToCart={handleAddToCart}
            wishlistItems={wishlistItems}
          />

          {/* New Arrivals */}
          <PerfumeSection
            title={t('new_arrivals')}
            perfumes={newArrivals}
            onAddToWishlist={handleAddToWishlist}
            onAddToCart={handleAddToCart}
            wishlistItems={wishlistItems}
          />

          {/* Best Sellers */}
          <PerfumeSection
            title={t('best_sellers')}
            perfumes={bestSellers}
            onAddToWishlist={handleAddToWishlist}
            onAddToCart={handleAddToCart}
            wishlistItems={wishlistItems}
          />

          {/* Exclusive Collection */}
          {exclusiveCollection.length > 0 && (
            <PerfumeSection
              title={t('exclusive_collection')}
              perfumes={exclusiveCollection}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              wishlistItems={wishlistItems}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
