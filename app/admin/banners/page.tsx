'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, RefreshCw, Save, X } from 'lucide-react'
import { AdminService, Banner } from '@/lib/adminService'

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminService.getAllBanners()
      setBanners(data)
    } catch (err) {
      console.error('Error fetching banners:', err)
      setError('Failed to load banners. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (bannerId: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) {
      return
    }

    try {
      await AdminService.deleteBanner(bannerId)
      setBanners(banners.filter(b => b.id !== bannerId))
    } catch (err) {
      console.error('Error deleting banner:', err)
      alert('Failed to delete banner. Please try again.')
    }
  }

  const toggleActive = async (bannerId: string) => {
    try {
      const banner = banners.find(b => b.id === bannerId)
      if (!banner) return

      await AdminService.updateBanner(bannerId, { is_active: !banner.is_active })
      setBanners(banners.map(b => 
        b.id === bannerId ? { ...b, is_active: !b.is_active } : b
      ))
    } catch (err) {
      console.error('Error updating banner:', err)
      alert('Failed to update banner. Please try again.')
    }
  }

  const handleAddBanner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setSaving(true)
      const formData = new FormData(e.currentTarget)
      
      const bannerData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        image_url: formData.get('image_url') as string,
        link_url: formData.get('link_url') as string,
        position: formData.get('position') as string,
        is_active: formData.get('is_active') === 'true'
      }

      const newBanner = await AdminService.createBanner(bannerData)
      setBanners([...banners, newBanner])
      setShowAddModal(false)
      e.currentTarget.reset()
    } catch (err) {
      console.error('Error creating banner:', err)
      alert('Failed to create banner. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleEditBanner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingBanner) return

    try {
      setSaving(true)
      const formData = new FormData(e.currentTarget)
      
      const bannerData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        image_url: formData.get('image_url') as string,
        link_url: formData.get('link_url') as string,
        position: formData.get('position') as string,
        is_active: formData.get('is_active') === 'true'
      }

      const updatedBanner = await AdminService.updateBanner(editingBanner.id, bannerData)
      setBanners(banners.map(b => b.id === editingBanner.id ? updatedBanner : b))
      setShowEditModal(false)
      setEditingBanner(null)
    } catch (err) {
      console.error('Error updating banner:', err)
      alert('Failed to update banner. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const openEditModal = (banner: Banner) => {
    setEditingBanner(banner)
    setShowEditModal(true)
  }

  const closeEditModal = () => {
    setShowEditModal(false)
    setEditingBanner(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading banners...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchBanners} 
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banners Management</h1>
          <p className="text-gray-600 mt-1">Manage homepage carousel banners</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={fetchBanners}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Banner
          </button>
        </div>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Banner Image */}
            <div className="relative h-48">
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold text-center px-4">
                  {banner.title}
                </h3>
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  banner.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {banner.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Position Badge */}
              <div className="absolute top-3 right-3">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {banner.position}
                </span>
              </div>
            </div>

            {/* Banner Info */}
            <div className="p-4">
              <div className="mb-3">
                <h4 className="font-semibold text-gray-900 mb-1">{banner.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{banner.description}</p>
                {banner.link_url && (
                  <p className="text-sm text-gray-500">Link: {banner.link_url}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-2">
                {/* Toggle Active */}
                <button
                  onClick={() => toggleActive(banner.id)}
                  className={`p-2 rounded-lg ${
                    banner.is_active ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'
                  }`}
                  title={banner.is_active ? 'Deactivate' : 'Activate'}
                >
                  {banner.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                {/* Edit */}
                <button 
                  onClick={() => openEditModal(banner)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Edit Banner"
                >
                  <Edit className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button 
                  onClick={() => handleDelete(banner.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Delete Banner"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <p className="text-gray-500 mb-4">No banners found.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Add Your First Banner
            </button>
          </div>
        </div>
      )}

      {/* Add Banner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowAddModal(false)}></div>
            
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Add New Banner</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddBanner}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      name="image_url"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                    <input
                      type="url"
                      name="link_url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <select
                      name="position"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    >
                      <option value="hero">Hero</option>
                      <option value="featured">Featured</option>
                      <option value="promotional">Promotional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="is_active"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Adding...' : 'Add Banner'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {showEditModal && editingBanner && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={closeEditModal}></div>
            
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Edit Banner</h3>
                <button
                  onClick={closeEditModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleEditBanner}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingBanner.title}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingBanner.description}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      name="image_url"
                      defaultValue={editingBanner.image_url}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                    <input
                      type="url"
                      name="link_url"
                      defaultValue={editingBanner.link_url}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <select
                      name="position"
                      defaultValue={editingBanner.position}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    >
                      <option value="hero">Hero</option>
                      <option value="featured">Featured</option>
                      <option value="promotional">Promotional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="is_active"
                      defaultValue={editingBanner.is_active.toString()}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 