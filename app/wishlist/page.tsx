'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePerfume } from '@/contexts/PerfumeContext'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Trash2, ShoppingCart } from 'lucide-react'

export default function WishlistPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { 
    wishlistItems, 
    removeFromWishlist, 
    addToCart,
    wishlistLoading 
  } = usePerfume()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = async (perfumeId: string) => {
    await addToCart(perfumeId, 1)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please login to view your wishlist</p>
            <a
              href="/"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Go to Home
            </a>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
            <a
              href="/perfumes"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Perfumes
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={item.perfume?.image_url}
                    alt={item.perfume?.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.perfume_id)}
                    disabled={wishlistLoading}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {item.perfume?.discount_price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Sale
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.perfume?.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.perfume?.brand}</p>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.perfume?.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      {item.perfume?.discount_price ? (
                        <div>
                          <span className="text-lg font-bold text-purple-600">
                            {formatPrice(item.perfume.discount_price)}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(item.perfume.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(item.perfume?.price || 0)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                      {item.perfume?.category}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(item.perfume_id)}
                    disabled={wishlistLoading}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
} 