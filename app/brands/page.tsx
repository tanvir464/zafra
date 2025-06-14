'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePerfume } from '@/contexts/PerfumeContext'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Perfume } from '@/types'
import { PerfumeService } from '@/lib/perfumeService'

interface BrandWithPerfumes {
  name: string
  perfumes: Perfume[]
  count: number
}

export default function BrandsPage() {
  const { t } = useLanguage()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = usePerfume()
  const router = useRouter()
  const [brands, setBrands] = useState<BrandWithPerfumes[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'count'>('name')

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const uniqueBrands = await PerfumeService.getUniqueBrands()
        const brandsWithPerfumes: BrandWithPerfumes[] = []
        
        // Fetch perfumes for each brand
        for (const brand of uniqueBrands) {
          const perfumes = await PerfumeService.getPerfumesByBrand(brand)
          brandsWithPerfumes.push({
            name: brand,
            perfumes,
            count: perfumes.length
          })
        }
        
        setBrands(brandsWithPerfumes)
      } catch (err) {
        console.error('Error fetching brands:', err)
        setError('Failed to load brands. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
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
    console.log('Brand perfume clicked:', perfumeId)
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

  const getBrandInitial = (brandName: string) => {
    return brandName.charAt(0).toUpperCase()
  }

  const getBrandColor = (brandName: string) => {
    const colors = [
      'bg-purple-100 text-purple-800',
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-yellow-100 text-yellow-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-red-100 text-red-800',
      'bg-orange-100 text-orange-800'
    ]
    const index = brandName.charCodeAt(0) % colors.length
    return colors[index]
  }

  // Filter and sort brands
  const filteredAndSortedBrands = brands
    .filter(brand => 
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'count') {
        return b.count - a.count
      }
      return a.name.localeCompare(b.name)
    })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading brands...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Perfume Brands</h1>
          <p className="text-gray-600">Explore our curated collection of premium fragrance brands</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Brands</label>
              <input
                type="text"
                placeholder="Search by brand name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'count')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              >
                <option value="name">Name A-Z</option>
                <option value="count">Most Products</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end">
              <p className="text-sm text-gray-600 font-bold">
                <sup className='text-purple-600 font-bold'>*</sup>{filteredAndSortedBrands.length} brand{filteredAndSortedBrands.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        {filteredAndSortedBrands.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedBrands.map((brand) => (
              <div key={brand.name} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 text-center">
                  {/* Brand Avatar */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold ${getBrandColor(brand.name)}`}>
                    {getBrandInitial(brand.name)}
                  </div>
                  
                  {/* Brand Name */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{brand.name}</h3>
                  
                  {/* Product Count */}
                  <p className="text-sm text-gray-600 mb-4">{brand.count} product{brand.count !== 1 ? 's' : ''}</p>
                  
                  {/* View Collection Button */}
                  <button
                    onClick={() => setSelectedBrand(selectedBrand === brand.name ? null : brand.name)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    {selectedBrand === brand.name ? 'Hide Collection' : 'View Collection'}
                  </button>
                </div>

                {/* Brand Collection */}
                {selectedBrand === brand.name && (
                  <div className="border-t border-gray-200 p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Collection</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {brand.perfumes.map((perfume) => (
                        <div 
                          key={perfume.id} 
                          className="flex items-center space-x-3 p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handlePerfumeClick(perfume.id)}
                        >
                          <img
                            src={perfume.image_url}
                            alt={perfume.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">{perfume.name}</p>
                            <p className="text-xs text-gray-600 capitalize">{perfume.category}</p>
                            <p className="text-xs font-medium text-purple-600">
                              {perfume.discount_price ? formatPrice(perfume.discount_price) : formatPrice(perfume.price)}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={(e) => handleAddToWishlist(perfume.id, e)}
                              className={`p-1 rounded ${
                                isInWishlist(perfume.id)
                                  ? 'text-red-500'
                                  : 'text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => handleAddToCart(perfume.id, e)}
                              className="p-1 text-gray-400 hover:text-gray-600 rounded"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏷️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Brands Found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any brands matching your search criteria.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                View All Brands
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
} 