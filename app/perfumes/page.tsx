'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Perfume } from '@/types'
import { PerfumeService } from '@/lib/perfumeService'

export default function AllPerfumesPage() {
  const { t } = useLanguage()
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [filteredPerfumes, setFilteredPerfumes] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [wishlistItems, setWishlistItems] = useState<string[]>([])

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await PerfumeService.getAllPerfumes()
        setPerfumes(data)
        setFilteredPerfumes(data)
      } catch (err) {
        console.error('Error fetching perfumes:', err)
        setError('Failed to load perfumes. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPerfumes()
  }, [])

  useEffect(() => {
    let filtered = [...perfumes]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(perfume =>
        perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        perfume.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(perfume => perfume.category === selectedCategory)
    }

    // Sort perfumes
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price))
        break
      case 'price-high':
        filtered.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price))
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'brand':
        filtered.sort((a, b) => a.brand.localeCompare(b.brand))
        break
      default: // newest
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    setFilteredPerfumes(filtered)
  }, [perfumes, searchQuery, selectedCategory, sortBy])

  const handleAddToWishlist = (perfumeId: string) => {
    if (wishlistItems.includes(perfumeId)) {
      setWishlistItems(prev => prev.filter(id => id !== perfumeId))
    } else {
      setWishlistItems(prev => [...prev, perfumeId])
    }
  }

  const handleAddToCart = (perfumeId: string) => {
    // In a real app, this would make an API call
    alert('Added to cart!')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading perfumes...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Perfumes</h1>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search by name or brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                  <option value="brand">Brand A-Z</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <p className="text-sm text-gray-600">
                  {filteredPerfumes.length} perfume{filteredPerfumes.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Perfumes Grid */}
        {filteredPerfumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPerfumes.map((perfume) => (
              <div key={perfume.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={perfume.image_url}
                    alt={perfume.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => handleAddToWishlist(perfume.id)}
                    className={`absolute top-2 right-2 p-2 rounded-full ${
                      wishlistItems.includes(perfume.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {perfume.discount_price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
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
                    <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                      {perfume.category}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(perfume.id)}
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
            <p className="text-gray-500 text-lg">No perfumes found matching your criteria.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
} 