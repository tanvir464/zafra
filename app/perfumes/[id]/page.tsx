'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePerfume } from '@/contexts/PerfumeContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReviewForm from '@/components/ReviewForm'
import ReviewList from '@/components/ReviewList'
import { Perfume, Review } from '@/types'
import { PerfumeService } from '@/lib/perfumeService'
import { ReviewService } from '@/lib/reviewService'
import { ChevronLeft, ChevronRight, X, ZoomIn, Heart, ShoppingCart, Star, Package, Truck, Shield, Clock, Zap } from 'lucide-react'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = usePerfume()
  
  const [perfume, setPerfume] = useState<Perfume | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description')

  const perfumeId = params.id as string

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch perfume details
        const foundPerfume = await PerfumeService.getPerfumeById(perfumeId)
        
        if (!foundPerfume) {
          setError('Perfume not found')
          return
        }
        
        setPerfume(foundPerfume)

        // Fetch reviews
        const reviewsData = await ReviewService.getReviewsByPerfumeId(perfumeId)
        setReviews(reviewsData)

        // Calculate average rating
        const avgRating = await ReviewService.getAverageRating(perfumeId)
        setAverageRating(avgRating)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load product details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (perfumeId) {
      fetchData()
    }
  }, [perfumeId])

  const handleAddToWishlist = async () => {
    if (!perfume) return
    
    if (isInWishlist(perfume.id)) {
      await removeFromWishlist(perfume.id)
    } else {
      await addToWishlist(perfume.id)
    }
  }

  const handleAddToCart = async () => {
    if (!perfume) return
    await addToCart(perfume.id, quantity)
  }

  const handleReviewSubmit = async (reviewData: { rating: number; comment: string }) => {
    if (!perfume) return
    
    try {
      setIsSubmittingReview(true)
      
      const newReview = await ReviewService.addReview({
        user_id: 'current-user', // This would come from auth context
        perfume_id: perfume.id,
        rating: reviewData.rating,
        comment: reviewData.comment,
        user_name: 'You' // This would come from auth context
      })
      
      // Add the new review to the list
      setReviews(prev => [newReview, ...prev])
      
      // Recalculate average rating
      const newAvgRating = await ReviewService.getAverageRating(perfume.id)
      setAverageRating(newAvgRating)
      
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Failed to submit review. Please try again.')
    } finally {
      setIsSubmittingReview(false)
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

  const calculateDiscountPercentage = (originalPrice: number, discountPrice: number) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
  }

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePosition({ x, y })
  }

  const handleImageClick = () => {
    setShowImageModal(true)
  }

  const closeImageModal = () => {
    setShowImageModal(false)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % 1) // Only one image for now
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + 1) % 1) // Only one image for now
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !perfume) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
            <button 
              onClick={() => router.push('/perfumes')} 
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Back to Perfumes
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
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button onClick={() => router.push('/')} className="hover:text-purple-600">Home</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => router.push('/perfumes')} className="hover:text-purple-600">Perfumes</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{perfume.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div 
              className="relative bg-white rounded-lg overflow-hidden cursor-zoom-in shadow-sm"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleImageMouseMove}
              onClick={handleImageClick}
            >
              <img
                src={perfume.image_url}
                alt={perfume.name}
                className={`w-full h-96 object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={{
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                }}
              />
              
              {/* Zoom indicator */}
              {!isZoomed && (
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full">
                  <ZoomIn className="w-5 h-5" />
                </div>
              )}
              
              {/* Sale badge */}
              <div className='flex flex-row absolute top-2 left-0 justify-between w-full m'>
             <div className='flex flex-row gap-2'>
              {perfume.discount_price && (
                  <div className=" bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    -{calculateDiscountPercentage(perfume.price, perfume.discount_price)}% OFF
                  </div>
                )}
                
                {/* Featured badge */}
                {perfume.featured && (
                  <div className=" bg-[#493D9E] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
             </div>
              <button className={`${isInWishlist(perfume.id) ? 'bg-theme-900 text-white' : 'bg-gray-200 text-gray-500'} rounded-full mr-16 w-7 h-7 flex items-center justify-center transition-all duration-300 scale-100 hover:scale-105 `}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToWishlist();
              }}
              >
                <Heart className="w-4 h-4" />
              </button>

              </div>
            </div>

            {/* Thumbnail */}
            <div className="flex justify-center">
              <div className="w-20 h-20 border-2 border-purple-500 rounded-lg overflow-hidden">
                <img
                  src={perfume.image_url}
                  alt={perfume.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{perfume.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{perfume.brand}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({averageRating} out of 5)</span>
                <span className="text-sm text-gray-500">• {reviews.length} reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              {perfume.discount_price ? (
                <div>
                  <span className="text-3xl font-bold text-theme-900">  
                    {formatPrice(perfume.discount_price)}
                  </span>
                  <span className="text-xl text-gray-500 line-through ml-3">
                    {formatPrice(perfume.price)}
                  </span>
                  <div className="text-sm text-green-600 font-medium">
                    Save {formatPrice(perfume.price - perfume.discount_price)} ({calculateDiscountPercentage(perfume.price, perfume.discount_price)}% off)
                  </div>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(perfume.price)}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Category</span>
                <p className="text-gray-900 capitalize">{perfume.category}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Stock</span>
                <p className="text-gray-900">{perfume.stock} units available</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 text-black"
                >
                  -
                </button>
                <span className="w-16 text-center font-medium text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(perfume.stock, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 text-black"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="w-full bg-theme-900 text-white py-3 px-6 rounded-md hover:bg-theme-900 disabled:bg-gray-400 disabled:cursor-not-allowed  font-medium
              transition-all duration-300 scale-100 hover:scale-105
              ">
                <Zap className="w-5 h-5 inline mr-2" />
                Buy Now 
              </button>
             
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleAddToCart}
                disabled={perfume.stock === 0}
                className="py-3 w-full flex items-center justify-center px-6 rounded-md font-medium border-2 border-gray-700/60 text-gray-700
                hover:border-gray-700/100 transition-all duration-300 scale-100 hover:scale-105
                "
              >
                <ShoppingCart className="w-5 h-5 inline mr-2" />
                {perfume.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free shipping on orders over ৳1000</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Authentic product guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'description', label: 'Description', icon: Package },
                { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star },
                { id: 'shipping', label: 'Shipping & Returns', icon: Truck }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === 'description' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">{perfume.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Long-lasting fragrance
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Premium quality ingredients
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Elegant packaging
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Suitable for all occasions
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Usage</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Apply to pulse points
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Best used after shower
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Avoid direct sunlight
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Store in cool, dry place
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <ReviewList 
                  reviews={reviews} 
                  averageRating={averageRating} 
                  totalReviews={reviews.length} 
                />
                <ReviewForm 
                  perfumeId={perfume.id} 
                  onSubmit={handleReviewSubmit}
                  isSubmitting={isSubmittingReview}
                />
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping & Returns</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-purple-600" />
                      Shipping Information
                    </h4>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Free Shipping:</strong> On orders over ৳1000</p>
                      <p><strong>Standard Delivery:</strong> 3-5 business days</p>
                      <p><strong>Express Delivery:</strong> 1-2 business days (৳200 extra)</p>
                      <p><strong>Delivery Areas:</strong> All major cities in Bangladesh</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-purple-600" />
                      Return Policy
                    </h4>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Return Period:</strong> 30 days from delivery</p>
                      <p><strong>Condition:</strong> Unused and in original packaging</p>
                      <p><strong>Refund:</strong> Full refund within 7 days</p>
                      <p><strong>Return Shipping:</strong> Customer responsibility</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Image */}
            <img
              src={perfume.image_url}
              alt={perfume.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
} 