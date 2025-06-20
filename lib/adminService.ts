import { supabase } from './supabase'

// Types
export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalUsers: number
  totalProducts: number
  pendingOrders: number
  completedOrders: number
  cancelledOrders: number
}

export interface RecentOrder {
  id: string
  user_id: string
  user_name: string
  user_email: string
  total_amount: number
  status: string
  created_at: string
  items_count: number
}

export interface TopProduct {
  id: string
  name: string
  brand: string
  total_sales: number
  revenue: number
  image_url: string
}

export interface OrderStatusCount {
  pending: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
}

export interface Banner {
  id: string
  title: string
  description: string
  image_url: string
  link_url: string
  position: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string
  phone: string
  address: string
  role: string
  is_active: boolean
  created_at: string
  last_login: string
  total_orders: number
  total_spent: number
}

export interface Order {
  id: string
  user_id: string
  user_name: string
  user_email: string
  total_amount: number
  status: string
  payment_status: string
  shipping_address: string
  billing_address: string
  created_at: string
  updated_at: string
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  perfume_id: string
  perfume_name: string
  perfume_brand: string
  quantity: number
  unit_price: number
  total_price: number
  image_url: string
}

export interface AdminSettings {
  site_name: string
  site_description: string
  contact_email: string
  contact_phone: string
  address: string
  social_facebook: string
  social_instagram: string
  social_twitter: string
  maintenance_mode: boolean
  currency: string
  tax_rate: number
  shipping_cost: number
  free_shipping_threshold: number
}

export interface AdminNotification {
  id: string
  type: 'order' | 'product' | 'user' | 'system' | 'stock' | 'revenue'
  title: string
  message: string
  is_read: boolean
  created_at: string
  data?: any // Additional data for the notification
}

export interface NotificationStats {
  total: number
  unread: number
  by_type: {
    order: number
    product: number
    user: number
    system: number
    stock: number
    revenue: number
  }
}

export class AdminService {
  // Dashboard
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Get orders stats
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')

      if (ordersError) throw ordersError

      const totalOrders = orders?.length || 0
      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0
      const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0
      const completedOrders = orders?.filter(order => order.status === 'delivered').length || 0
      const cancelledOrders = orders?.filter(order => order.status === 'cancelled').length || 0

      // Get users count
      const { count: usersCount, error: usersError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      if (usersError) throw usersError

      // Get products count
      const { count: productsCount, error: productsError } = await supabase
        .from('perfumes')
        .select('*', { count: 'exact', head: true })

      if (productsError) throw productsError

      return {
        totalOrders,
        totalRevenue,
        totalUsers: usersCount || 0,
        totalProducts: productsCount || 0,
        pendingOrders,
        completedOrders,
        cancelledOrders
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw error
    }
  }

  static async getRecentOrders(limit: number = 10): Promise<RecentOrder[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          user_id,
          total_amount,
          status,
          created_at,
          users(name, email),
          order_items(id)
        `)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error

      return data?.map((order: any) => ({
        id: order.id,
        user_id: order.user_id,
        user_name: order.users?.name || 'Unknown User',
        user_email: order.users?.email || 'unknown@email.com',
        total_amount: order.total_amount,
        status: order.status,
        created_at: order.created_at,
        items_count: order.order_items?.length || 0
      })) || []
    } catch (error) {
      console.error('Error fetching recent orders:', error)
      throw error
    }
  }

  static async getTopProducts(limit: number = 5): Promise<TopProduct[]> {
    try {
      // Get products with their sales data from order_items
      const { data, error } = await supabase
        .from('perfumes')
        .select(`
          id,
          name,
          brand,
          image_url,
          order_items(
            quantity,
            price
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Calculate sales and revenue for each product
      const productsWithStats = data?.map(product => {
        const total_sales = product.order_items?.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0) || 0
        const revenue = product.order_items?.reduce((sum: number, item: any) => sum + ((item.quantity || 0) * (item.price || 0)), 0) || 0
        
        return {
          id: product.id,
          name: product.name,
          brand: product.brand,
          total_sales,
          revenue,
          image_url: product.image_url
        }
      }) || []

      // Sort by revenue and take top products
      return productsWithStats
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, limit)
    } catch (error) {
      console.error('Error fetching top products:', error)
      throw error
    }
  }

  // Banners
  static async getAllBanners(): Promise<Banner[]> {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching banners:', error)
      throw error
    }
  }

  static async createBanner(bannerData: Omit<Banner, 'id' | 'created_at' | 'updated_at'>): Promise<Banner> {
    try {
      const { data, error } = await supabase
        .from('banners')
        .insert([bannerData])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating banner:', error)
      throw error
    }
  }

  static async updateBanner(id: string, bannerData: Partial<Banner>): Promise<Banner> {
    try {
      const { data, error } = await supabase
        .from('banners')
        .update({ ...bannerData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating banner:', error)
      throw error
    }
  }

  static async deleteBanner(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting banner:', error)
      throw error
    }
  }

  // Orders
  static async getAllOrders(): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          users(name, email),
          order_items(
            id,
            order_id,
            perfume_id,
            quantity,
            price,
            total_price,
            perfumes(name, brand, image_url)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Ensure data is an array before mapping
      if (!Array.isArray(data)) return [];

      return data.map((order: any) => ({
        id: order.id ?? '',
        user_id: order.user_id ?? '',
        user_name: order.users?.name ?? 'Unknown User',
        user_email: order.users?.email ?? 'unknown@email.com',
        total_amount: order.total_amount ?? 0,
        status: order.status ?? 'pending',
        payment_status: order.payment_status ?? 'unpaid',
        shipping_address: order.shipping_address ?? 'No shipping address',
        billing_address: order.billing_address ?? 'No billing address',
        created_at: order.created_at ?? '',
        updated_at: order.updated_at ?? '',
        items: Array.isArray(order.order_items)
          ? order.order_items.map((item: any) => ({
              id: item.id ?? '',
              order_id: item.order_id ?? '',
              perfume_id: item.perfume_id ?? '',
              perfume_name: item.perfumes?.name ?? 'Unknown Product',
              perfume_brand: item.perfumes?.brand ?? 'Unknown Brand',
              quantity: item.quantity ?? 0,
              price: item.price ?? 0,
              total_price: item.total_price ?? 0,
              image_url: item.perfumes?.image_url ?? '',
            }))
          : [],
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  static async updateOrderStatus(id: string, status: string): Promise<void> {
    try {
      console.log('AdminService: Updating order status', id, status);

      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select().single();
      if (error) 
      {
        console.error('Error updating order status:', error)
      }
      if (!data) 
      {
        console.error('No data returned from update query')
      }
      return;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  static async getOrderById(id: string): Promise<Order | null> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          users(name, email),
          order_items(
            id,
            perfume_id,
            quantity,
            price,
            total_price,
            perfumes(name, brand, image_url)
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      if (!data) return null

      return {
        id: data.id,
        user_id: data.user_id,
        user_name: data.users?.name || 'Unknown User',
        user_email: data.users?.email || 'unknown@email.com',
        total_amount: data.total_amount,
        status: data.status,
        payment_status: data.payment_status,
        shipping_address: data.shipping_address,
        billing_address: data.billing_address,
        created_at: data.created_at,
        updated_at: data.updated_at,
        items: data.order_items?.map((item: any) => ({
          id: item.id,
          order_id: item.order_id,
          perfume_id: item.perfume_id,
          perfume_name: item.perfumes?.name || 'Unknown Product',
          perfume_brand: item.perfumes?.brand || 'Unknown Brand',
          quantity: item.quantity,
          price: item.price,
          total_price: item.total_price,
          image_url: item.perfumes?.image_url || ''
        })) || []
      }
    } catch (error) {
      console.error('Error fetching order:', error)
      throw error
    }
  }

  // Users
  static async getAllUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Calculate additional stats for each user
      const usersWithStats = await Promise.all(
        (data || []).map(async (user) => {
          // Get user's orders count
          const { count: ordersCount } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)

          // Get user's total spent
          const { data: orders } = await supabase
            .from('orders')
            .select('total_amount')
            .eq('user_id', user.id)

          const totalSpent = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0

          return {
            ...user,
            total_orders: ordersCount || 0,
            total_spent: totalSpent
          }
        })
      )

      return usersWithStats
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  static async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  static async deleteUser(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  // Settings
  static async getSettings(): Promise<AdminSettings> {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single()

      if (error) throw error
      return data || this.getDefaultSettings()
    } catch (error) {
      console.error('Error fetching settings:', error)
      return this.getDefaultSettings()
    }
  }

  static async updateSettings(settings: Partial<AdminSettings>): Promise<AdminSettings> {
    try {
      const { data, error } = await supabase
        .from('settings')
        .upsert(settings)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating settings:', error)
      throw error
    }
  }

  private static getDefaultSettings(): AdminSettings {
    return {
      site_name: 'Scentare Perfumes',
      site_description: 'Premium fragrances for every occasion',
      contact_email: 'contact@Scentare.com',
      contact_phone: '+880 1234567890',
      address: 'Dhaka, Bangladesh',
      social_facebook: '',
      social_instagram: '',
      social_twitter: '',
      maintenance_mode: false,
      currency: 'BDT',
      tax_rate: 5,
      shipping_cost: 100,
      free_shipping_threshold: 2000
    }
  }

  // Products
  static async getAllProducts(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  static async createProduct(productData: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .insert([productData])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  static async updateProduct(id: string, productData: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .update({ ...productData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  static async deleteProduct(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('perfumes')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

  // Notifications
  static async getNotifications(limit: number = 50): Promise<AdminNotification[]> {
    try {
      const { data, error } = await supabase
        .from('admin_notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching notifications:', error)
      throw error
    }
  }

  static async getNotificationStats(): Promise<NotificationStats> {
    try {
      const { data: notifications, error } = await supabase
        .from('admin_notifications')
        .select('type, is_read')

      if (error) throw error

      const total = notifications?.length || 0
      const unread = notifications?.filter(n => !n.is_read).length || 0
      
      const by_type = {
        order: notifications?.filter(n => n.type === 'order').length || 0,
        product: notifications?.filter(n => n.type === 'product').length || 0,
        user: notifications?.filter(n => n.type === 'user').length || 0,
        system: notifications?.filter(n => n.type === 'system').length || 0,
        stock: notifications?.filter(n => n.type === 'stock').length || 0,
        revenue: notifications?.filter(n => n.type === 'revenue').length || 0
      }

      return { total, unread, by_type }
    } catch (error) {
      console.error('Error fetching notification stats:', error)
      throw error
    }
  }

  static async markNotificationAsRead(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('admin_notifications')
        .update({ is_read: true })
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error marking notification as read:', error)
      throw error
    }
  }

  static async markAllNotificationsAsRead(): Promise<void> {
    try {
      const { error } = await supabase
        .from('admin_notifications')
        .update({ is_read: true })
        .eq('is_read', false)

      if (error) throw error
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      throw error
    }
  }

  static async createNotification(notification: Omit<AdminNotification, 'id' | 'created_at'>): Promise<AdminNotification> {
    try {
      const { data, error } = await supabase
        .from('admin_notifications')
        .insert([notification])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating notification:', error)
      throw error
    }
  }

  static async deleteNotification(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('admin_notifications')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting notification:', error)
      throw error
    }
  }

  // Auto-generate notifications based on system events
  static async generateOrderNotification(order: any): Promise<void> {
    try {
      await this.createNotification({
        type: 'order',
        title: 'New Order Received',
        message: `Order #${order.id.slice(0, 8)} received from ${order.name} for ${new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(order.total_amount)}`,
        is_read: false,
        data: { order_id: order.id }
      })
    } catch (error) {
      console.error('Error generating order notification:', error)
    }
  }

  static async generateStockNotification(product: any): Promise<void> {
    try {
      if (product.stock <= 5) {
        await this.createNotification({
          type: 'stock',
          title: 'Low Stock Alert',
          message: `${product.name} is running low on stock (${product.stock} units remaining)`,
          is_read: false,
          data: { product_id: product.id, current_stock: product.stock }
        })
      }
    } catch (error) {
      console.error('Error generating stock notification:', error)
    }
  }

  static async generateRevenueNotification(amount: number): Promise<void> {
    try {
      if (amount >= 10000) {
        await this.createNotification({
          type: 'revenue',
          title: 'High Revenue Alert',
          message: `High revenue milestone reached: ${new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(amount)}`,
          is_read: false,
          data: { amount }
        })
      }
    } catch (error) {
      console.error('Error generating revenue notification:', error)
    }
  }
} 