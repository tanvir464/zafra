'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePerfume } from '@/contexts/PerfumeContext'
import Header from '@/components/Header'
import BannerCarousel from '@/components/BannerCarousel'
import PerfumeSection from '@/components/PerfumeSection'
import Footer from '@/components/Footer'
import { Perfume } from '@/types'
import { PerfumeService } from '@/lib/perfumeService'

export default function HomePage() {
  const { t } = useLanguage()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = usePerfume()
  const [allPerfumes, setAllPerfumes] = useState<Perfume[]>([])
  const [featuredPerfumes, setFeaturedPerfumes] = useState<Perfume[]>([])
  const [newArrivals, setNewArrivals] = useState<Perfume[]>([])
  const [bestSellers, setBestSellers] = useState<Perfume[]>([])
  const [exclusiveCollection, setExclusiveCollection] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all perfumes
        const allPerfumesData = await PerfumeService.getAllPerfumes()
        setAllPerfumes(allPerfumesData)

        // Fetch featured perfumes
        const featuredData = await PerfumeService.getFeaturedPerfumes()
        setFeaturedPerfumes(featuredData)

        // Get new arrivals (latest 4 perfumes)
        const newArrivalsData = allPerfumesData.slice(0, 4)
        setNewArrivals(newArrivalsData)

        // Fetch discounted perfumes for best sellers
        const discountedData = await PerfumeService.getDiscountedPerfumes()
        setBestSellers(discountedData.slice(0, 4))

        // Fetch exclusive collection
        const exclusiveData = await PerfumeService.getExclusivePerfumes()
        setExclusiveCollection(exclusiveData)

      } catch (err) {
        console.error('Error fetching perfumes:', err)
        setError('Failed to load perfumes. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPerfumes()
  }, [])

  const handleAddToWishlist = async (perfumeId: string) => {
    if (isInWishlist(perfumeId)) {
      await removeFromWishlist(perfumeId)
    } else {
      await addToWishlist(perfumeId)
    }
  }

  const handleAddToCart = async (perfumeId: string) => {
    await addToCart(perfumeId, 1)
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
      
      <main>
        {/* Banner Carousel */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <BannerCarousel />
        </div>

        {/* Perfume Sections */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Featured Products */}
          {featuredPerfumes.length > 0 && (
            <PerfumeSection
              title={t('featured')}
              perfumes={featuredPerfumes}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              wishlistItems={featuredPerfumes.map(p => p.id).filter(id => isInWishlist(id))}
            />
          )}

          {/* New Arrivals */}
          {newArrivals.length > 0 && (
            <PerfumeSection
              title={t('new_arrivals')}
              perfumes={newArrivals}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              wishlistItems={newArrivals.map(p => p.id).filter(id => isInWishlist(id))}
            />
          )}

          {/* Best Sellers */}
          {bestSellers.length > 0 && (
            <PerfumeSection
              title={t('best_sellers')}
              perfumes={bestSellers}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              wishlistItems={bestSellers.map(p => p.id).filter(id => isInWishlist(id))}
            />
          )}

          {/* Exclusive Collection */}
          {exclusiveCollection.length > 0 && (
            <PerfumeSection
              title={t('exclusive_collection')}
              perfumes={exclusiveCollection}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              wishlistItems={exclusiveCollection.map(p => p.id).filter(id => isInWishlist(id))}
            />
          )}

          {/* View All Perfumes Link */}
          <div className="text-center py-8">
            <a
              href="/perfumes"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              View All Perfumes
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
