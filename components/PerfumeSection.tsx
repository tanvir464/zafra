'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Perfume } from '@/types'
import PerfumeCard from './PerfumeCard'
import { useRouter } from 'next/navigation'

interface PerfumeSectionProps {
  title: string
  perfumes: Perfume[]
  onAddToWishlist?: (perfumeId: string) => void
  onAddToCart?: (perfumeId: string) => void
  wishlistItems?: string[]
}

export default function PerfumeSection({
  title,
  perfumes,
  onAddToWishlist,
  onAddToCart,
  wishlistItems = []
}: PerfumeSectionProps) {
  const { t } = useLanguage()
  const router = useRouter()
  if (perfumes.length === 0) return null

  const handleViewAll = () => {
    if (title === 'Exclusive Collection') {
      router.push('/exclusive')
    } else if (title === 'Best Sellers') {
      router.push('/popular')
    } else if (title === 'New Arrivals') {
      router.push('/new-arrivals')
    } else  {
      router.push('/perfumes')
    }
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
        <button className="text-gray-600 hover:text-gray-900 font-medium"
        onClick={handleViewAll}
        >
          View All →
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {perfumes.map((perfume) => (
          <PerfumeCard
            key={perfume.id}
            perfume={perfume}
            onAddToWishlist={onAddToWishlist}
            onAddToCart={onAddToCart}
            isInWishlist={wishlistItems.includes(perfume.id)}
          />
        ))}
      </div>
    </section>
  )
} 