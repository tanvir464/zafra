'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Banner {
  id: string
  title: string
  image_url: string
  link?: string
}

const mockBanners: Banner[] = [
  {
    id: '1',
    title: 'Luxury Perfumes Collection',
    image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=400&fit=crop',
    link: '/collection/luxury'
  },
  {
    id: '2',
    title: 'New Arrivals - 50% Off',
    image_url: 'https://images.unsplash.com/photo-1594736797933-d0fa47032d9d?w=1200&h=400&fit=crop',
    link: '/new-arrivals'
  },
  {
    id: '3',
    title: 'Exclusive Designer Fragrances',
    image_url: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=1200&h=400&fit=crop',
    link: '/exclusive'
  }
]

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners)

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 mb-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full rounded-lg overflow-hidden"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full">
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {banner.title}
                  </h2>
                  {banner.link && (
                    <a
                      href={banner.link}
                      className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Shop Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 