'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Facebook, Instagram, Youtube, Phone, MessageCircle, Shield, Clock } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* 24/7 Support */}
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 mb-3 text-blue-400" />
              <h3 className="font-semibold mb-2">{t('support.24_7')}</h3>
              <p className="text-sm text-gray-300">Get help whenever you need it</p>
            </div>

            {/* Money Back Guarantee */}
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 mb-3 text-green-400" />
              <h3 className="font-semibold mb-2">{t('guarantee.money_back')}</h3>
              <p className="text-sm text-gray-300">100% satisfaction guaranteed</p>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center">
              <div className="flex space-x-4 mb-3">
                <Facebook className="w-6 h-6 text-blue-500" />
                <Instagram className="w-6 h-6 text-pink-500" />
                <Youtube className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-semibold mb-2">{t('social.follow')}</h3>
              <p className="text-sm text-gray-300">Stay connected with us</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Scentare</h2>
              <p className="text-gray-300 mb-4">
                Your premium destination for luxury perfumes and fragrances. 
                Experience the art of scent with our curated collection.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-semibold mb-4">Policies</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/terms" className="text-gray-300 hover:text-white transition-colors">
                    {t('policy.terms')}
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    {t('policy.privacy')}
                  </a>
                </li>
                <li>
                  <a href="/refund" className="text-gray-300 hover:text-white transition-colors">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="text-gray-300 hover:text-white transition-colors">
                    Shipping Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="font-semibold mb-4">Information</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                    {t('info.about')}
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    {t('info.contact')}
                  </a>
                </li>
                <li>
                  <a href="/stores" className="text-gray-300 hover:text-white transition-colors">
                    Store Locations
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-gray-300 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Payment */}
            <div>
              <h3 className="font-semibold mb-4">Contact & Payment</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">+880 1XX XXX XXXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">WhatsApp Support</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="font-semibold mb-3">{t('payment.with')}</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white rounded p-2 flex items-center justify-center">
                    <span className="text-black text-xs font-bold">bKash</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center justify-center">
                    <span className="text-black text-xs font-bold">SSL</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center justify-center">
                    <span className="text-black text-xs font-bold">COD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('copyright')}
            </p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <span className="text-gray-400 text-sm">Powered by Next.js & Supabase</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 