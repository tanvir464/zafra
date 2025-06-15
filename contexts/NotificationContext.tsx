'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { AdminService, AdminNotification, NotificationStats } from '@/lib/adminService'

interface NotificationContextType {
  notifications: AdminNotification[]
  notificationStats: NotificationStats | null
  loading: boolean
  error: string | null
  fetchNotifications: () => Promise<void>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  deleteNotification: (id: string) => Promise<void>
  refreshStats: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AdminNotification[]>([])
  const [notificationStats, setNotificationStats] = useState<NotificationStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const [notificationsData, statsData] = await Promise.all([
        AdminService.getNotifications(50),
        AdminService.getNotificationStats()
      ])
      setNotifications(notificationsData)
      setNotificationStats(statsData)
    } catch (err) {
      console.error('Error fetching notifications:', err)
      setError('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshStats = useCallback(async () => {
    try {
      const stats = await AdminService.getNotificationStats()
      setNotificationStats(stats)
    } catch (err) {
      console.error('Error refreshing notification stats:', err)
    }
  }, [])

  const markAsRead = useCallback(async (id: string) => {
    try {
      await AdminService.markNotificationAsRead(id)
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, is_read: true }
            : notification
        )
      )
      await refreshStats()
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }, [refreshStats])

  const markAllAsRead = useCallback(async () => {
    try {
      await AdminService.markAllNotificationsAsRead()
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, is_read: true }))
      )
      await refreshStats()
    } catch (err) {
      console.error('Error marking all notifications as read:', err)
    }
  }, [refreshStats])

  const deleteNotification = useCallback(async (id: string) => {
    try {
      await AdminService.deleteNotification(id)
      setNotifications(prev => prev.filter(notification => notification.id !== id))
      await refreshStats()
    } catch (err) {
      console.error('Error deleting notification:', err)
    }
  }, [refreshStats])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // Set up polling for new notifications (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      refreshStats()
    }, 30000)

    return () => clearInterval(interval)
  }, [refreshStats])

  const value: NotificationContextType = {
    notifications,
    notificationStats,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refreshStats
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}