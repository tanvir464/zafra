'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePerfume } from '@/contexts/PerfumeContext'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Trash2, Minus, Plus } from 'lucide-react'

export default function CartPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { 
    cartItems, 
    removeFromCart, 
    updateCartQuantity, 
    getCartTotal, 
    clearCart,
    createOrder,
    cartLoading 
  } = usePerfume()

  const [checkoutData, setCheckoutData] = useState({
    name: user?.user_metadata?.name || '',
    phone: user?.phone || '',
    shipping_address: '',
    payment_method: 'cod' as 'cod' | 'bkash' | 'sslcommerz'
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleQuantityChange = async (perfumeId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(perfumeId)
    } else {
      await updateCartQuantity(perfumeId, newQuantity)
    }
  }

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to checkout')
      return
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty')
      return
    }

    if (!checkoutData.name || !checkoutData.phone || !checkoutData.shipping_address) {
      alert('Please fill in all required fields')
      return
    }

    const orderId = await createOrder({
      total_amount: getCartTotal(),
      payment_method: checkoutData.payment_method,
      shipping_address: checkoutData.shipping_address,
      phone: checkoutData.phone,
      name: checkoutData.name
    })

    if (orderId) {
      alert(`Order placed successfully! Order ID: ${orderId}`)
      // Redirect to order confirmation page or home
      window.location.href = '/'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please login to view your cart</p>
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-sm sm:text-base text-gray-600">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg mb-4">Your cart is empty</p>
            <a
              href="/perfumes"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.perfume?.image_url}
                          alt={item.perfume?.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.perfume?.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{item.perfume?.brand}</p>
                        <p className="text-xs sm:text-sm text-gray-500 capitalize">{item.perfume?.category}</p>
                        
                        {/* Mobile: Show price below details */}
                        <div className="sm:hidden mt-2">
                          <p className="font-semibold text-gray-900 text-sm">
                            {formatPrice((item.perfume?.discount_price || item.perfume?.price || 0) * item.quantity)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatPrice(item.perfume?.discount_price || item.perfume?.price || 0)} each
                          </p>
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between sm:justify-center space-x-2 sm:space-x-3 ">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.perfume_id, item.quantity - 1)}
                            disabled={cartLoading}
                            className="p-1 sm:p-2 rounded hover:bg-gray-100 disabled:opacity-50 text-black"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base text-black">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.perfume_id, item.quantity + 1)}
                            disabled={cartLoading}
                            className="p-1 sm:p-2 rounded hover:bg-gray-100 disabled:opacity-50 text-black"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        
                        {/* Desktop: Show price */}
                        <div className="hidden sm:block text-right">
                          <p className="font-semibold text-gray-900 text-sm">
                            {formatPrice((item.perfume?.discount_price || item.perfume?.price || 0) * item.quantity)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatPrice(item.perfume?.discount_price || item.perfume?.price || 0)} each
                          </p>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.perfume_id)}
                        disabled={cartLoading}
                        className="p-2 text-red-500 hover:bg-red-50 rounded disabled:opacity-50 self-start xl:self-center  bg-red-200 lg:bg-transparent "
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" /> 
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    disabled={cartLoading}
                    className="text-red-600 hover:text-red-700 font-medium disabled:opacity-50 text-sm sm:text-base"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-base sm:text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(getCartTotal())}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Form */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={checkoutData.name}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address *</label>
                    <textarea
                      value={checkoutData.shipping_address}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, shipping_address: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
                    <select
                      value={checkoutData.payment_method}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, payment_method: e.target.value as 'cod' | 'bkash' | 'sslcommerz' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                    >
                      <option value="cod">Cash on Delivery</option>
                      <option value="bkash">bKash</option>
                      <option value="sslcommerz">SSLCommerz</option>
                    </select>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={cartLoading}
                    className="w-full bg-purple-600 text-white py-2 sm:py-3 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
                  >
                    {cartLoading ? 'Processing...' : `Place Order - ${formatPrice(getCartTotal())}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
} 