'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { User, Order, OrderItem } from '@/types'
import { UserService } from '@/lib/userService'

type TabType = 'profile' | 'orders' | 'order-history'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    fetchUserData()
  }, [user, router])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch user profile
      const profileData = await UserService.getUserProfile(user!.id)
      setUserProfile(profileData)
      setEditForm({
        name: profileData?.name || '',
        phone: profileData?.phone || '',
        address: profileData?.address || ''
      })

      // Fetch orders
      const ordersData = await UserService.getUserOrders(user!.id)
      setOrders(ordersData)

      // Fetch order items for all orders
      if (ordersData.length > 0) {
        const orderIds = ordersData.map(order => order.id)
        const itemsData = await UserService.getOrderItems(orderIds)
        setOrderItems(itemsData)
      }

    } catch (err) {
      console.error('Error fetching user data:', err)
      setError('Failed to load user data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = await UserService.updateUserProfile(user!.id, {
        name: editForm.name,
        phone: editForm.phone,
        address: editForm.address
      })

      setUserProfile(updatedProfile)
      setIsEditing(false)
    } catch (err) {
      console.error('Error updating profile:', err)
      setError('Failed to update profile. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (err) {
      console.error('Error signing out:', err)
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
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
              onClick={fetchUserData} 
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
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and view your orders</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'profile', label: 'Profile', icon: '👤' },
                { id: 'orders', label: 'Current Orders', icon: '📦' },
                { id: 'order-history', label: 'Order History', icon: '📋' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  <div className="space-x-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleUpdateProfile}
                          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false)
                            setEditForm({
                              name: userProfile?.name || '',
                              phone: userProfile?.phone || '',
                              address: userProfile?.address || ''
                            })
                          }}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-500 text-black"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Orders</h2>
                {orders.filter(order => ['pending', 'confirmed', 'shipped'].includes(order.status)).length > 0 ? (
                  <div className="space-y-4">
                    {orders
                      .filter(order => ['pending', 'confirmed', 'shipped'].includes(order.status))
                      .map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(-8)}</h3>
                              <p className="text-sm text-gray-600">{formatDate(order.created_at)}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Total Amount</p>
                              <p className="text-lg font-bold text-purple-600">{formatPrice(order.total_amount)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Payment Method</p>
                              <p className="text-sm text-gray-600 capitalize">{order.payment_method}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Shipping Address</p>
                              <p className="text-sm text-gray-600">{order.shipping_address}</p>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                            <div className="space-y-2">
                              {orderItems
                                .filter(item => item.order_id === order.id)
                                .map((item) => (
                                  <div key={item.id} className="flex items-center space-x-4">
                                    <img
                                      src={item.perfume?.image_url}
                                      alt={item.perfume?.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                      <p className="font-medium text-gray-900">{item.perfume?.name}</p>
                                      <p className="text-sm text-gray-600">{item.perfume?.brand}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium text-gray-900">Qty: {item.quantity}</p>
                                      <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No current orders found.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'order-history' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
                {orders.filter(order => ['delivered', 'cancelled'].includes(order.status)).length > 0 ? (
                  <div className="space-y-4">
                    {orders
                      .filter(order => ['delivered', 'cancelled'].includes(order.status))
                      .map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(-8)}</h3>
                              <p className="text-sm text-gray-600">{formatDate(order.created_at)}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Total Amount</p>
                              <p className="text-lg font-bold text-purple-600">{formatPrice(order.total_amount)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Payment Method</p>
                              <p className="text-sm text-gray-600 capitalize">{order.payment_method}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Shipping Address</p>
                              <p className="text-sm text-gray-600">{order.shipping_address}</p>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                            <div className="space-y-2">
                              {orderItems
                                .filter(item => item.order_id === order.id)
                                .map((item) => (
                                  <div key={item.id} className="flex items-center space-x-4">
                                    <img
                                      src={item.perfume?.image_url}
                                      alt={item.perfume?.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                      <p className="font-medium text-gray-900">{item.perfume?.name}</p>
                                      <p className="text-sm text-gray-600">{item.perfume?.brand}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium text-gray-900">Qty: {item.quantity}</p>
                                      <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No order history found.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 