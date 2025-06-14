'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePerfume } from '@/contexts/PerfumeContext'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Perfume } from '@/types'
import { PerfumeService } from '@/lib/perfumeService'

export default function ExclusivePage() {
  const { t } = useLanguage()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = usePerfume()
  const router = useRouter()
  const [exclusivePerfumes, setExclusivePerfumes] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [priceFilter, setPriceFilter] = useState('all')
  const [sortBy, setSortBy] = useState('price-high')

  useEffect(() => {
    const fetchExclusivePerfumes = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch exclusive perfumes with different price thresholds
        let minPrice = 10000 // Default minimum price for exclusive
        if (priceFilter === 'ultra-luxury') {
          minPrice = 25000
        } else if (priceFilter === 'luxury') {
          minPrice = 15000
        } else if (priceFilter === 'premium') {
          minPrice = 10000
        }
        
        const data = await PerfumeService.getExclusivePerfumes(minPrice)
        setExclusivePerfumes(data)
      } catch (err) {
        console.error('Error fetching exclusive perfumes:', err)
        setError('Failed to load exclusive perfumes. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchExclusivePerfumes()
  }, [priceFilter])

  useEffect(() => {
    let sorted = [...exclusivePerfumes]

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price))
        break
      case 'price-high':
        sorted.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price))
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'brand':
        sorted.sort((a, b) => a.brand.localeCompare(b.brand))
        break
      default:
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    setExclusivePerfumes(sorted)
  }, [sortBy])

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
    console.log('Exclusive perfume clicked:', perfumeId)
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

  const getPriceRangeLabel = (price: number) => {
    if (price >= 25000) return 'Ultra Luxury'
    if (price >= 15000) return 'Luxury'
    if (price >= 10000) return 'Premium'
    return 'Exclusive'
  }

  const getPriceRangeColor = (price: number) => {
    if (price >= 25000) return 'bg-purple-100 text-purple-800'
    if (price >= 15000) return 'bg-blue-100 text-blue-800'
    if (price >= 10000) return 'bg-green-100 text-green-800'
    return 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading exclusive perfumes...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exclusive Collection</h1>
          <p className="text-gray-600">Discover our finest luxury fragrances for the discerning connoisseur</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              >
                <option value="all">All Exclusive (10K+)</option>
                <option value="premium">Premium (10K - 15K)</option>
                <option value="luxury">Luxury (15K - 25K)</option>
                <option value="ultra-luxury">Ultra Luxury (25K+)</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              >
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="name">Name A-Z</option>
                <option value="brand">Brand A-Z</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end">
              <p className="text-sm text-gray-600 font-bold">
                <sup className='text-purple-600 font-bold'>*</sup>{exclusivePerfumes.length} exclusive perfume{exclusivePerfumes.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>

        {/* Exclusive Perfumes Grid */}
        {exclusivePerfumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {exclusivePerfumes.map((perfume) => (
              <div 
                key={perfume.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer hover:scale-105"
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
                  
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {getPriceRangeLabel(perfume.price)}
                  </div>
                  
                  {perfume.discount_price && (
                    <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Sale
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
                    <span className={`text-xs capitalize px-2 py-1 rounded ${getPriceRangeColor(perfume.price)}`}>
                      {perfume.category}
                    </span>
                  </div>
                  
                  <button
                    onClick={(e) => handleAddToCart(perfume.id, e)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">💎</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Exclusive Perfumes Found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any exclusive perfumes matching your criteria. Try adjusting the price range filter.
              </p>
              <button
                onClick={() => setPriceFilter('all')}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                View All Exclusive
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
} 