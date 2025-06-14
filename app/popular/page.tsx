'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePerfume } from '@/contexts/PerfumeContext'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Perfume } from '@/types'
import { PerfumeService } from '@/lib/perfumeService'

export default function PopularPage() {
  const { t } = useLanguage()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = usePerfume()
  const router = useRouter()
  const [featuredPerfumes, setFeaturedPerfumes] = useState<Perfume[]>([])
  const [discountedPerfumes, setDiscountedPerfumes] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'featured' | 'discounted'>('featured')

  useEffect(() => {
    const fetchPopularPerfumes = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [featured, discounted] = await Promise.all([
          PerfumeService.getFeaturedPerfumes(),
          PerfumeService.getDiscountedPerfumes()
        ])
        
        setFeaturedPerfumes(featured)
        setDiscountedPerfumes(discounted)
      } catch (err) {
        console.error('Error fetching popular perfumes:', err)
        setError('Failed to load popular perfumes. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPopularPerfumes()
  }, [])

  const handleAddToWishlist = async (perfumeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isInWishlist(perfumeId)) {
      await removeFromWishlist(perfumeId)
    } else {
      await addToWishlist(perfumeId)
    }
  }

  const handleAddToCart = async (perfumeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    await addToCart(perfumeId, 1)
  }

  const handlePerfumeClick = (perfumeId: string) => {
    console.log('Popular perfume clicked:', perfumeId)
    console.log('Navigating to:', `/perfumes/${perfumeId}`)
    
    // Try router.push first, fallback to window.location
    try {
      router.push(`/perfumes/${perfumeId}`)
    } catch (error) {
      console.error('Router navigation failed:', error)
      window.location.href = `/perfumes/${perfumeId}`
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const calculateDiscountPercentage = (originalPrice: number, discountPrice: number) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading popular perfumes...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const currentPerfumes = activeTab === 'featured' ? featuredPerfumes : discountedPerfumes

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Popular Perfumes</h1>
          <p className="text-gray-600">Discover our most loved and trending fragrances</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('featured')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'featured'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ⭐ Featured Perfumes ({featuredPerfumes.length})
              </button>
              <button
                onClick={() => setActiveTab('discounted')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'discounted'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🎉 On Sale ({discountedPerfumes.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {currentPerfumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentPerfumes.map((perfume) => (
                  <div 
                    key={perfume.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
                    onClick={() => handlePerfumeClick(perfume.id)}
                  >
                    <div className="relative">
                      <img
                        src={perfume.image_url}
                        alt={perfume.name}
                        className="w-full h-64 object-cover"
                      />
                      <button
                        onClick={(e) => handleAddToWishlist(perfume.id, e)}
                        className={`absolute top-2 right-2 p-2 rounded-full ${
                          isInWishlist(perfume.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {activeTab === 'featured' && (
                        <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-sm font-medium">
                          Featured
                        </div>
                      )}
                      
                      {activeTab === 'discounted' && perfume.discount_price && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                          -{calculateDiscountPercentage(perfume.price, perfume.discount_price)}%
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{perfume.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{perfume.brand}</p>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{perfume.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          {perfume.discount_price ? (
                            <div>
                              <span className="text-lg font-bold text-purple-600">
                                {formatPrice(perfume.discount_price)}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                {formatPrice(perfume.price)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">
                              {formatPrice(perfume.price)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                          {perfume.category}
                        </span>
                      </div>
                      
                      <button
                        onClick={(e) => handleAddToCart(perfume.id, e)}
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {activeTab === 'featured' 
                    ? 'No featured perfumes available at the moment.' 
                    : 'No discounted perfumes available at the moment.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 