// Database Setup Script for Zafra Admin Dashboard
// This script helps set up sample data for testing the admin dashboard

const { createClient } = require('@supabase/supabase-js')

// You'll need to replace these with your actual Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log('Setting up database with sample data...')

  try {
    // 1. Create sample users (you'll need to create these in auth.users first)
    console.log('Creating sample users...')
    const users = [
      {
        id: '11111111-1111-1111-1111-111111111111',
        email: 'john.doe@example.com',
        phone: '+8801712345678',
        name: 'John Doe',
        address: 'Dhaka, Bangladesh'
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        email: 'jane.smith@example.com',
        phone: '+8801812345678',
        name: 'Jane Smith',
        address: 'Chittagong, Bangladesh'
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        email: 'mike.johnson@example.com',
        phone: '+8801912345678',
        name: 'Mike Johnson',
        address: 'Sylhet, Bangladesh'
      }
    ]

    for (const user of users) {
      const { error } = await supabase
        .from('users')
        .upsert(user, { onConflict: 'id' })
      
      if (error) {
        console.error('Error creating user:', error)
      } else {
        console.log(`Created user: ${user.name}`)
      }
    }

    // 2. Create sample orders
    console.log('Creating sample orders...')
    const orders = [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        user_id: '11111111-1111-1111-1111-111111111111',
        total_amount: 7500.00,
        payment_method: 'cod',
        status: 'delivered',
        shipping_address: 'House 123, Road 12, Dhaka',
        phone: '+8801712345678',
        name: 'John Doe'
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        user_id: '22222222-2222-2222-2222-222222222222',
        total_amount: 6500.00,
        payment_method: 'bkash',
        status: 'shipped',
        shipping_address: 'House 456, Road 15, Chittagong',
        phone: '+8801812345678',
        name: 'Jane Smith'
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        user_id: '33333333-3333-3333-3333-333333333333',
        total_amount: 10500.00,
        payment_method: 'sslcommerz',
        status: 'pending',
        shipping_address: 'House 789, Road 18, Sylhet',
        phone: '+8801912345678',
        name: 'Mike Johnson'
      },
      {
        id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        user_id: '11111111-1111-1111-1111-111111111111',
        total_amount: 4800.00,
        payment_method: 'cod',
        status: 'confirmed',
        shipping_address: 'House 123, Road 12, Dhaka',
        phone: '+8801712345678',
        name: 'John Doe'
      }
    ]

    for (const order of orders) {
      const { error } = await supabase
        .from('orders')
        .upsert(order, { onConflict: 'id' })
      
      if (error) {
        console.error('Error creating order:', error)
      } else {
        console.log(`Created order: ${order.id}`)
      }
    }

    // 3. Create sample order items
    console.log('Creating sample order items...')
    
    // First, get the perfume IDs
    const { data: perfumes } = await supabase
      .from('perfumes')
      .select('id, name')

    if (perfumes && perfumes.length > 0) {
      const orderItems = [
        {
          order_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          perfume_id: perfumes.find(p => p.name.includes('Chanel'))?.id,
          quantity: 1,
          price: 7500.00
        },
        {
          order_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
          perfume_id: perfumes.find(p => p.name.includes('Dior'))?.id,
          quantity: 1,
          price: 6500.00
        },
        {
          order_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
          perfume_id: perfumes.find(p => p.name.includes('Tom Ford'))?.id,
          quantity: 1,
          price: 10500.00
        },
        {
          order_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
          perfume_id: perfumes.find(p => p.name.includes('Armani'))?.id,
          quantity: 1,
          price: 4800.00
        }
      ]

      for (const item of orderItems) {
        if (item.perfume_id) {
          const { error } = await supabase
            .from('order_items')
            .upsert(item, { onConflict: 'id' })
          
          if (error) {
            console.error('Error creating order item:', error)
          } else {
            console.log(`Created order item for order: ${item.order_id}`)
          }
        }
      }
    }

    // 4. Create sample notifications
    console.log('Creating sample notifications...')
    const notifications = [
      {
        type: 'order',
        title: 'New Order Received',
        message: 'Order #aaaaaaaa received from John Doe for ৳7,500',
        is_read: false,
        data: { order_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' }
      },
      {
        type: 'order',
        title: 'New Order Received',
        message: 'Order #bbbbbbbb received from Jane Smith for ৳6,500',
        is_read: false,
        data: { order_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' }
      },
      {
        type: 'stock',
        title: 'Low Stock Alert',
        message: 'Tom Ford Black Orchid is running low on stock (8 units remaining)',
        is_read: false,
        data: { product_id: 'product-id', current_stock: 8 }
      },
      {
        type: 'revenue',
        title: 'High Revenue Alert',
        message: 'High revenue milestone reached: ৳29,300',
        is_read: false,
        data: { amount: 29300 }
      },
      {
        type: 'system',
        title: 'System Update',
        message: 'Database backup completed successfully',
        is_read: true,
        data: { backup_id: 'backup-123' }
      },
      {
        type: 'product',
        title: 'New Product Added',
        message: 'Marc Jacobs Daisy has been added to the catalog',
        is_read: true,
        data: { product_id: 'product-id' }
      }
    ]

    for (const notification of notifications) {
      const { error } = await supabase
        .from('admin_notifications')
        .upsert(notification, { onConflict: 'id' })
      
      if (error) {
        console.error('Error creating notification:', error)
      } else {
        console.log(`Created notification: ${notification.title}`)
      }
    }

    console.log('Database setup completed successfully!')
    console.log('You can now test the admin dashboard with real data.')
    
  } catch (error) {
    console.error('Error setting up database:', error)
  }
}

// Run the setup
setupDatabase() 