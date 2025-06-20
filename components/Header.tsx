'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { usePerfume } from '@/contexts/PerfumeContext'
import { Search, Heart, ShoppingCart, User, Globe, LogOut, Settings } from 'lucide-react'
import AuthModal from './AuthModal'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const { user, signOut } = useAuth()
  const { getCartItemCount, wishlistItems } = usePerfume()
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const infoItems = [
    t('click_collect'),
    t('cash_delivery'),
    t('buy_now_pay_later'),
    t('delivery_dhaka')
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prev) => (prev + 1) % infoItems.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [infoItems.length])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showUserMenu && !target.closest('.user-menu')) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  const getUserDisplayName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name
    }
    return user?.email?.split('@')[0] || 'User'
  }

  return (
    <header className="w-full">
      {/* Info Bar */}
      <div className="bg-gray-100 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex-1">
            <p className="text-sm text-gray-700 transition-all duration-500">
              {infoItems[currentInfoIndex]}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'bn')}
              className="text-sm bg-transparent border-none focus:outline-none text-gray-700"
            >
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white shadow-md py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 mr-20">
            <h1 className="text-2xl font-bold text-gray-900 cursor-pointer font-serif" onClick={() => router.push('/')}>SCENTARE</h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              {t('nav.home')}
            </a>
            <a href="/new-arrivals" className="text-gray-700 hover:text-gray-900 font-medium">
              New Arrivals
            </a>
            <a href="/perfumes" className="text-gray-700 hover:text-gray-900 font-medium">
              All Perfumes
            </a>
            <a href="/popular" className="text-gray-700 hover:text-gray-900 font-medium">
              {t('nav.popular')}
            </a>
            <a href="/exclusive" className="text-gray-700 hover:text-gray-900 font-medium">
              {t('nav.exclusive')}
            </a>
            <a href="/brands" className="text-gray-700 hover:text-gray-900 font-medium">
              {t('nav.brands')}
            </a>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Wishlist */}
            <a href="/wishlist" className="relative group">
              <Heart className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
              <span className="hidden group-hover:block absolute top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                {t('wishlist')}
              </span>
            </a>

            {/* Cart */}
            <a href="/cart" className="relative group">
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
              <span className="hidden group-hover:block absolute top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                {t('cart')}
              </span>
            </a>

            {/* User Menu */}
            {user ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden lg:block font-medium">{getUserDisplayName()}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <button
                      onClick={() => router.push('/profile')}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                     // onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      My Profile
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <User className="w-6 h-6" />
                <span className="hidden lg:block font-medium">{t('login')}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </header>
  )
} 