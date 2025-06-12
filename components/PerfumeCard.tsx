'use client'

import React, { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Perfume } from '@/types'

interface PerfumeCardProps {
  perfume: Perfume
  onAddToWishlist?: (perfumeId: string) => void
  onAddToCart?: (perfumeId: string) => void
  isInWishlist?: boolean
}

export default function PerfumeCard({ 
  perfume, 
  onAddToWishlist, 
  onAddToCart, 
  isInWishlist = false 
}: PerfumeCardProps) {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToWishlist = async () => {
    if (onAddToWishlist) {
      setIsLoading(true)
      await onAddToWishlist(perfume.id)
      setIsLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (onAddToCart) {
      setIsLoading(true)
      await onAddToCart(perfume.id)
      setIsLoading(false)
    }
  }

  const discountPercentage = perfume.discount_price 
    ? Math.round(((perfume.price - perfume.discount_price) / perfume.price) * 100)
    : 0

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={perfume.image_url}
          alt={perfume.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          disabled={isLoading}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isInWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <Heart 
            className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} 
          />
        </button>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}

        {/* Out of Stock Overlay */}
        {perfume.stock === 0 && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Perfume Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {perfume.name}
        </h3>

        {/* Brand */}
        <p className="text-sm text-gray-600 mb-2">{perfume.brand}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          {perfume.discount_price ? (
            <>
              <span className="text-lg font-bold text-red-600">
                ৳{perfume.discount_price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ৳{perfume.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ৳{perfume.price}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={perfume.stock === 0 || isLoading}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            perfume.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              {t('add_to_cart')}
            </div>
          )}
        </button>
      </div>
    </div>
  )
} 