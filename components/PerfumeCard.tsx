'use client'

import React, { useState } from 'react'
import { Heart, ShoppingCart, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false)

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onAddToWishlist) {
      setIsLoading(true)
      await onAddToWishlist(perfume.id)
      setIsLoading(false)
    }
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onAddToCart) {
      setIsLoading(true)
      await onAddToCart(perfume.id)
      setIsLoading(false)
    }
  }

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (perfume.stock === 0) return
    
    setIsBuyNowLoading(true)
    try {
      // First add to cart
      if (onAddToCart) {
        await onAddToCart(perfume.id)
      }
      // Then navigate to cart page
      router.push('/cart')
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsBuyNowLoading(false)
    }
  }

  const handleCardClick = () => {
    router.push(`/perfumes/${perfume.id}`)
  }

  const discountPercentage = perfume.discount_price 
    ? Math.round(((perfume.price - perfume.discount_price) / perfume.price) * 100)
    : 0

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 h-full"
      onClick={handleCardClick}
    >
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
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 shadow-sm ${
            isInWishlist 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500 hover:scale-110'
          }`}
        >
          <Heart 
            className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} 
          />
        </button>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold shadow-sm">
            -{discountPercentage}%
          </div>
        )}

        {/* Out of Stock Overlay */}
        {perfume.stock === 0 && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-semibold text-lg bg-black bg-opacity-50 px-4 py-2 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-4 h-[200px]">
        {/* Perfume Name */}
       <div>
       <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {perfume.name}
        </h3>

        {/* Brand */}
        <p className="text-sm text-gray-600 mb-2">{perfume.brand}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
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
       </div>

        {/* Action Buttons */}
        <div className="flex flex-row justify-between items-center gap-4">
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
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
            onClick={handleBuyNow}
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
  )
} 