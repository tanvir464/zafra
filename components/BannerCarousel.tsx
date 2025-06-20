'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Perfume } from '@/types'
import { PerfumeService } from '@/lib/perfumeService'


interface Banner {
  id: string
  title: string
  image_url: string
  link?: string
  perfumes?: Perfume[]
  }

const mockBanners: Banner[] = [
  {
    id: '1',
    title: 'Luxury Perfumes Collection',
    image_url: '/images/lux.png',
    link: '/perfumes/popular',
    perfumes: []
  },
  {
    id: '2',
    title: 'New Arrivals - 50% Off',
    image_url: '/images/new.png',
    link: '/perfumes/new-arrivals',
    perfumes: []
  },
  {
    id: '3',
    title: 'Exclusive Designer Fragrances',
    image_url: '/images/exc.png',
    link: '/perfumes/exclusive',
    perfumes: []
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
                <div className="flex flex-col items-center justify-end absolute bottom-0 left-0 w-full h-full  mb-10">                 
                    {banner.link && (
                      <a
                        href={banner.link}
                        className="inline-block text-black bg-white px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                      >
                        Shop Now
                      </a>
                    )}
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 