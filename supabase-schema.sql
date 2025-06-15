-- Zafra Perfume Store Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  phone TEXT,
  name TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Perfumes table
CREATE TABLE public.perfumes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  discount_price DECIMAL(10,2),
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('men', 'women', 'unisex')),
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Banners table
CREATE TABLE public.banners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link TEXT,
  active BOOLEAN DEFAULT TRUE,
  order_position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table
CREATE TABLE public.cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  perfume_id UUID REFERENCES public.perfumes(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, perfume_id)
);

-- Wishlist items table
CREATE TABLE public.wishlist_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  perfume_id UUID REFERENCES public.perfumes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, perfume_id)
);

-- Orders table
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cod', 'bkash', 'sslcommerz')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  shipping_address TEXT NOT NULL,
  phone TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  perfume_id UUID REFERENCES public.perfumes(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin notifications table
CREATE TABLE public.admin_notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('order', 'product', 'user', 'system', 'stock', 'revenue')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO public.perfumes (name, brand, description, price, discount_price, image_url, category, stock, featured) VALUES
('Chanel No. 5 Eau de Parfum', 'Chanel', 'The iconic fragrance', 8500.00, 7500.00, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop', 'women', 10, true),
('Dior Sauvage Eau de Toilette', 'Dior', 'Fresh and masculine', 6500.00, NULL, 'https://images.unsplash.com/photo-1747916148827-d5fb453bb978?w=400&h=400&fit=crop', 'men', 15, true),
('Tom Ford Black Orchid', 'Tom Ford', 'Luxurious and mysterious', 12000.00, 10500.00, 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=400&fit=crop', 'unisex', 8, false),
('Versace Bright Crystal', 'Versace', 'Fresh and floral', 4500.00, NULL, 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop', 'women', 12, false),
('Armani Code Men', 'Giorgio Armani', 'Sophisticated and seductive', 5500.00, 4800.00, 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop', 'men', 20, true),
('Marc Jacobs Daisy', 'Marc Jacobs', 'Youthful and feminine', 3800.00, NULL, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop', 'women', 18, false);

-- Insert sample users (you'll need to create these users in auth.users first)
-- Note: Replace the UUIDs with actual auth.users IDs from your Supabase project
INSERT INTO public.users (id, email, phone, name, address) VALUES
('11111111-1111-1111-1111-111111111111', 'john.doe@example.com', '+8801712345678', 'John Doe', 'Dhaka, Bangladesh'),
('22222222-2222-2222-2222-222222222222', 'jane.smith@example.com', '+8801812345678', 'Jane Smith', 'Chittagong, Bangladesh'),
('33333333-3333-3333-3333-333333333333', 'mike.johnson@example.com', '+8801912345678', 'Mike Johnson', 'Sylhet, Bangladesh');

-- Insert sample orders
INSERT INTO public.orders (id, user_id, total_amount, payment_method, status, shipping_address, phone, name) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 7500.00, 'cod', 'delivered', 'House 123, Road 12, Dhaka', '+8801712345678', 'John Doe'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 6500.00, 'bkash', 'shipped', 'House 456, Road 15, Chittagong', '+8801812345678', 'Jane Smith'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 10500.00, 'sslcommerz', 'pending', 'House 789, Road 18, Sylhet', '+8801912345678', 'Mike Johnson'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 4800.00, 'cod', 'confirmed', 'House 123, Road 12, Dhaka', '+8801712345678', 'John Doe');

-- Insert sample order items
INSERT INTO public.order_items (order_id, perfume_id, quantity, price) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', (SELECT id FROM public.perfumes WHERE name = 'Chanel No. 5 Eau de Parfum' LIMIT 1), 1, 7500.00),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', (SELECT id FROM public.perfumes WHERE name = 'Dior Sauvage Eau de Toilette' LIMIT 1), 1, 6500.00),
('cccccccc-cccc-cccc-cccc-cccccccccccc', (SELECT id FROM public.perfumes WHERE name = 'Tom Ford Black Orchid' LIMIT 1), 1, 10500.00),
('dddddddd-dddd-dddd-dddd-dddddddddddd', (SELECT id FROM public.perfumes WHERE name = 'Armani Code Men' LIMIT 1), 1, 4800.00);

-- Insert sample notifications
INSERT INTO public.admin_notifications (type, title, message, is_read, data) VALUES
('order', 'New Order Received', 'Order #aaaaaaaa received from John Doe for ৳7,500', false, '{"order_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}'),
('order', 'New Order Received', 'Order #bbbbbbbb received from Jane Smith for ৳6,500', false, '{"order_id": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}'),
('stock', 'Low Stock Alert', 'Tom Ford Black Orchid is running low on stock (8 units remaining)', false, '{"product_id": "product-id", "current_stock": 8}'),
('revenue', 'High Revenue Alert', 'High revenue milestone reached: ৳29,300', false, '{"amount": 29300}'),
('system', 'System Update', 'Database backup completed successfully', true, '{"backup_id": "backup-123"}'),
('product', 'New Product Added', 'Marc Jacobs Daisy has been added to the catalog', true, '{"product_id": "product-id"}');

INSERT INTO public.banners (title, image_url, link, active, order_position) VALUES
('Luxury Perfumes Collection', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=400&fit=crop', '/collection/luxury', true, 1),
('New Arrivals - 50% Off', 'https://images.unsplash.com/photo-1594736797933-d0fa47032d9d?w=1200&h=400&fit=crop', '/new-arrivals', true, 2),
('Exclusive Designer Fragrances', 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=1200&h=400&fit=crop', '/exclusive', true, 3);

-- Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Users can only see and edit their own data
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Cart items policies
CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id);

-- Wishlist policies
CREATE POLICY "Users can view own wishlist" ON public.wishlist_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wishlist" ON public.wishlist_items FOR ALL USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Public read access for products and banners
CREATE POLICY "Anyone can view perfumes" ON public.perfumes FOR SELECT USING (true);
CREATE POLICY "Anyone can view active banners" ON public.banners FOR SELECT USING (active = true);

-- Admin policies (for admin dashboard access)
-- Note: You'll need to create an admin role and assign it to admin users
-- For now, we'll create policies that allow access to all data
-- In production, you should restrict these to admin users only

-- Admin can view all users
CREATE POLICY "Admin can view all users" ON public.users FOR SELECT USING (true);

-- Admin can view all orders
CREATE POLICY "Admin can view all orders" ON public.orders FOR SELECT USING (true);

-- Admin can view all order items
CREATE POLICY "Admin can view all order items" ON public.order_items FOR SELECT USING (true);

-- Admin can manage all banners
CREATE POLICY "Admin can manage banners" ON public.banners FOR ALL USING (true);

-- Admin can manage all perfumes
CREATE POLICY "Admin can manage perfumes" ON public.perfumes FOR ALL USING (true);

-- Admin can manage all notifications
CREATE POLICY "Admin can manage notifications" ON public.admin_notifications FOR ALL USING (true);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_perfumes_updated_at BEFORE UPDATE ON public.perfumes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 