# Admin Dashboard Setup Guide

This guide will help you set up the Zafra admin dashboard to use real data from the database instead of mock data.

## Prerequisites

1. **Supabase Project**: Make sure you have a Supabase project set up
2. **Environment Variables**: Ensure your `.env.local` file has the correct Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Database Setup

### 1. Run the Database Schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Run the script to create all tables and sample data

### 2. Set Up Sample Data (Optional)

If you want to test the admin dashboard with sample data, you can run the setup script:

```bash
# Install dependencies if not already installed
npm install

# Run the database setup script
node scripts/setup-database.js
```

**Note**: Before running the setup script, you'll need to:
1. Create users in Supabase Auth (Authentication > Users)
2. Update the user IDs in the script to match your actual user IDs

## Features Implemented

### Dashboard Overview
- **Real-time Statistics**: Total revenue, orders, products, and users from database
- **Recent Orders**: Latest orders with customer information
- **Top Products**: Products ranked by sales and revenue
- **Quick Actions**: Links to manage products, banners, orders, and users

### Products Management
- **View All Products**: Real product data from the database
- **Search & Filter**: Search by name/brand, filter by category
- **Product Actions**: Toggle featured status, delete products
- **Real-time Updates**: Changes reflect immediately in the database

### Orders Management
- **Order List**: All orders with customer details
- **Status Management**: Update order status (pending, confirmed, shipped, delivered, cancelled)
- **Order Details**: View complete order information with items

### Users Management
- **User List**: All registered users with statistics
- **User Details**: View user information and order history
- **User Actions**: Edit user information and manage accounts

### Banners Management
- **Banner List**: All homepage banners
- **Banner Actions**: Create, edit, delete, and reorder banners
- **Status Control**: Activate/deactivate banners

### Notifications Management
- **Real-time Notifications**: Live notifications for orders, stock alerts, and system events
- **Notification Types**: Orders, products, users, stock, revenue, and system notifications
- **Notification Actions**: Mark as read, delete, and filter notifications
- **Auto-generation**: Automatic notifications for new orders, low stock, and revenue milestones

## Database Tables Used

### Core Tables
- `users` - User profiles and information
- `perfumes` - Product catalog
- `orders` - Customer orders
- `order_items` - Individual items in orders
- `banners` - Homepage banner management
- `admin_notifications` - Admin notifications and alerts

### Sample Data Included
- 6 sample perfumes with different categories and prices
- 3 sample users with contact information
- 4 sample orders with different statuses
- 3 sample banners for homepage
- 6 sample notifications for testing the notification system

## Admin Service Functions

The `lib/adminService.ts` file provides the following functions:

### Dashboard
- `getDashboardStats()` - Get overall statistics
- `getRecentOrders(limit)` - Get recent orders with user info
- `getTopProducts(limit)` - Get top-selling products

### Products
- `getAllProducts()` - Get all products
- `createProduct(data)` - Create new product
- `updateProduct(id, data)` - Update product
- `deleteProduct(id)` - Delete product

### Orders
- `getAllOrders()` - Get all orders with details
- `updateOrderStatus(id, status)` - Update order status
- `getOrderById(id)` - Get specific order details

### Users
- `getAllUsers()` - Get all users with statistics
- `updateUser(id, data)` - Update user information
- `deleteUser(id)` - Delete user

### Banners
- `getAllBanners()` - Get all banners
- `createBanner(data)` - Create new banner
- `updateBanner(id, data)` - Update banner
- `deleteBanner(id)` - Delete banner

### Notifications
- `getNotifications(limit)` - Get notifications with pagination
- `getNotificationStats()` - Get notification statistics
- `markNotificationAsRead(id)` - Mark notification as read
- `markAllNotificationsAsRead()` - Mark all notifications as read
- `createNotification(data)` - Create new notification
- `deleteNotification(id)` - Delete notification
- `generateOrderNotification(order)` - Auto-generate order notification
- `generateStockNotification(product)` - Auto-generate stock alert
- `generateRevenueNotification(amount)` - Auto-generate revenue milestone

## Security Considerations

### Row Level Security (RLS)
The database includes RLS policies for security:
- Users can only access their own data
- Admin policies allow full access for dashboard functionality
- Public read access for products and active banners

### Admin Access
For production use, you should:
1. Create an admin role in Supabase
2. Restrict admin policies to admin users only
3. Implement proper authentication for admin routes

## Troubleshooting

### Common Issues

1. **No Data Showing**: 
   - Check if sample data was inserted correctly
   - Verify RLS policies are not blocking access
   - Check browser console for errors

2. **Permission Errors**:
   - Ensure admin policies are in place
   - Check Supabase API key permissions
   - Verify user authentication

3. **Missing User Data**:
   - Create users in Supabase Auth first
   - Update user IDs in sample data to match auth users
   - Check user table foreign key constraints

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify Supabase connection in Network tab
3. Test database queries directly in Supabase SQL editor
4. Check environment variables are loaded correctly

## Next Steps

1. **Customize Data**: Replace sample data with your actual product catalog
2. **Add Authentication**: Implement proper admin authentication
3. **Enhance Features**: Add more dashboard widgets and analytics
4. **Production Setup**: Configure proper security policies for production use

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Supabase documentation
3. Check browser console for detailed error messages
4. Verify all environment variables are set correctly 