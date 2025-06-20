'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePerfume } from '@/contexts/PerfumeContext'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Perfume } from '@/types'
import { PerfumeService } from '@/lib/perfumeService'
import { ShoppingCart, Zap } from 'lucide-react'

export default function NewArrivalsPage() {
  const { t } = useLanguage()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = usePerfume()
  const router = useRouter()
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [filteredPerfumes, setFilteredPerfumes] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [brands, setBrands] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch all perfumes (they're already ordered by newest first)
        const allPerfumes = await PerfumeService.getAllPerfumes()
        setPerfumes(allPerfumes)
        setFilteredPerfumes(allPerfumes)

        // Fetch unique brands for filter
        const uniqueBrands = await PerfumeService.getUniqueBrands()
        setBrands(uniqueBrands)
      } catch (err) {
        console.error('Error fetching perfumes:', err)
        setError('Failed to load new arrivals. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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

    // Filter by brand
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(perfume => perfume.brand === selectedBrand)
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
  }, [perfumes, searchQuery, selectedCategory, selectedBrand, sortBy])

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

  const handleBuyNow = async (perfumeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    await addToCart(perfumeId, 1)
  }

  const handlePerfumeClick = (perfumeId: string) => {
    router.push(`/perfumes/${perfumeId}`)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading new arrivals...</p>
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
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest additions to our perfume collection. Fresh fragrances, 
            trending scents, and exclusive releases - all waiting to be explored.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-theme-900 mb-2">{perfumes.length}</div>
            <div className="text-gray-600">Total Products</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {perfumes.filter(p => p.discount_price).length}
            </div>
            <div className="text-gray-600">On Sale</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-theme-900 mb-2">
              {perfumes.filter(p => p.featured).length}
            </div>
            <div className="text-gray-600">Featured</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              >
                <option value="all">All Categories</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              >
                <option value="all">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
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
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
                <option value="brand">Brand A-Z</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end">
              <p className="text-sm text-gray-600 font-bold">
                <sup className='text-theme-900 font-bold'>*</sup>{filteredPerfumes.length} perfume{filteredPerfumes.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>

        {/* Perfumes Grid */}
        {filteredPerfumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPerfumes.map((perfume) => (
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
                  
                 <div className='flex flex-row absolute top-2 left-2 w-full  gap-1 '>
                   {/* New Arrival Badge */}
                   <div className=" bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                    New
                  </div>
                  
                  {/* Sale Badge */}
                  {perfume.discount_price && (
                    <div className=" bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Sale
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {perfume.featured && (
                    <div className=" bg-theme-900 text-white px-2 py-1 rounded text-sm font-medium">
                      Featured
                    </div>
                  )}
                 </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{perfume.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{perfume.brand}</p>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{perfume.description}</p>
                  
                  {/* Arrival Date */}
                  <div className="text-xs text-green-600 font-medium mb-2">
                    Arrived {formatDate(perfume.created_at)}
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      {perfume.discount_price ? (
                        <div>
                          <span className="text-lg font-bold text-theme-900">
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
                   {/* Action Buttons */}
        <div className="flex flex-row justify-between items-center gap-4">
          {/* Add to Cart Button */}
          <button
            onClick={(e) => handleAddToCart(perfume.id, e)}
            disabled={perfume.stock === 0 || isLoading}
            className={`flex-1 py-2.5 px-3 rounded-lg font-semibold transition-all duration-200 text-sm ${
              perfume.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1">
                <ShoppingCart className="w-3 h-3" />
                <span className="truncate">Cart</span>
              </div>
            )}
          </button>

          {/* Buy Now Button */}
                <button
                  onClick={(e) => handleBuyNow(perfume.id, e)}
                  disabled={perfume.stock === 0 || isBuyNowLoading}
                  className={`flex-1 py-2.5 px-3 rounded-lg font-semibold transition-all duration-200 text-sm ${
                    perfume.stock === 0
                      ? 'bg-[#B2A5FF] text-gray-500 cursor-not-allowed'
                      : 'bg-[#493D9E] text-white hover:bg-[#493D9E] hover:scale-[1.02] shadow-sm'
                  }`}
                >
                  {isBuyNowLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1">
                      <Zap className="w-3 h-3" />
                      <span className="truncate">Buy</span>
                    </div>
                  )}
                </button>
              </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No new arrivals found matching your criteria.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-12 bg-gradient-to-r from-purple-900 to-theme-900 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with New Arrivals</h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Be the first to know about our latest perfume releases, exclusive offers, and trending fragrances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 border-1 border-gray-300"
            />
            <button className="bg-white text-theme-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 