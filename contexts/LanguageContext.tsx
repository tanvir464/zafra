'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Language } from '@/types'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.popular': 'Popular',
    'nav.exclusive': 'Exclusive',
    'nav.brands': 'Brands',
    'search.placeholder': 'Search perfumes...',
    'wishlist': 'Wishlist',
    'cart': 'My Cart',
    'login': 'Login',
    'register': 'Register',
    'add_to_cart': 'Add to Cart',
    'buy_now': 'Buy Now',
    'featured': 'Featured',
    'new_arrivals': 'New Arrivals',
    'best_sellers': 'Best Sellers',
    'exclusive_collection': 'Exclusive Collection',
    'click_collect': 'Click & Collect Available',
    'cash_delivery': 'Cash on Delivery',
    'buy_now_pay_later': 'Buy Now Pay Later',
    'delivery_dhaka': '50tk Delivery in Dhaka',
    'social.follow': 'Follow Us',
    'support.24_7': '24/7 Customer Support',
    'guarantee.money_back': 'Money Back Guarantee',
    'policy.terms': 'Terms & Conditions',
    'policy.privacy': 'Privacy Policy',
    'info.about': 'About Us',
    'info.contact': 'Contact Us',
    'payment.with': 'Pay with',
    'copyright': 'Scentare © All Rights Reserved'
  },
  bn: {
    'nav.home': 'হোম',
    'nav.popular': 'জনপ্রিয়',
    'nav.exclusive': 'এক্সক্লুসিভ',
    'nav.brands': 'ব্র্যান্ড',
    'search.placeholder': 'পারফিউম খুঁজুন...',
    'wishlist': 'উইশলিস্ট',
    'cart': 'আমার কার্ট',
    'login': 'লগইন',
    'register': 'রেজিস্টার',
    'add_to_cart': 'কার্টে যোগ করুন',
    'buy_now': 'এখনই কিনুন',
    'featured': 'ফিচার্ড',
    'new_arrivals': 'নতুন আগমন',
    'best_sellers': 'বেস্ট সেলার',
    'exclusive_collection': 'এক্সক্লুসিভ কালেকশন',
    'click_collect': 'ক্লিক ও সংগ্রহ উপলব্ধ',
    'cash_delivery': 'ক্যাশ অন ডেলিভারি',
    'buy_now_pay_later': 'এখন কিনুন পরে পেমেন্ট',
    'delivery_dhaka': 'ঢাকায় ৫০ টাকা ডেলিভারি',
    'social.follow': 'আমাদের ফলো করুন',
    'support.24_7': '২৪/৭ কাস্টমার সাপোর্ট',
    'guarantee.money_back': 'মানি ব্যাক গ্যারান্টি',
    'policy.terms': 'শর্তাবলী',
    'policy.privacy': 'প্রাইভেসি পলিসি',
    'info.about': 'আমাদের সম্পর্কে',
    'info.contact': 'যোগাযোগ',
    'payment.with': 'পেমেন্ট করুন',
    'copyright': 'জাফরা © সকল অধিকার সংরক্ষিত'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
} 