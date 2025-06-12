# Zafra - Premium Perfume E-commerce Website

A modern, fully-functional perfume e-commerce website built with Next.js, Tailwind CSS, and Supabase. Features a beautiful, minimalistic design with bilingual support (English/Bangla) and comprehensive admin panel.

## 🌟 Features

### Customer Features
- **Bilingual Support**: Switch between English and Bangla
- **Product Browsing**: Browse perfumes by categories (Featured, New Arrivals, Best Sellers, Exclusive)
- **Search & Filter**: Advanced search and filtering capabilities
- **Wishlist**: Save favorite products for later
- **Shopping Cart**: Add products to cart with quantity management
- **User Authentication**: Login/Register with email, phone, or Google
- **Responsive Design**: Optimized for all devices
- **Payment Options**: Cash on Delivery, bKash, SSLCommerz integration ready

### Admin Features
- **Dashboard**: Overview of sales, orders, and analytics
- **Product Management**: Add, edit, delete, and manage perfume inventory
- **Banner Management**: Control homepage carousel banners
- **Order Management**: Process and track customer orders
- **User Management**: View and manage customer accounts

### Technical Features
- **Next.js 15**: Latest React framework with App Router
- **Tailwind CSS**: Modern utility-first CSS framework
- **Supabase**: Backend-as-a-Service with PostgreSQL database
- **TypeScript**: Type-safe development
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags and structured data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zafra-perfume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
zafra-perfume/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── AuthModal.tsx      # Authentication modal
│   ├── BannerCarousel.tsx # Homepage banner carousel
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Site header
│   ├── PerfumeCard.tsx    # Product card component
│   └── PerfumeSection.tsx # Product section wrapper
├── contexts/              # React contexts
│   └── LanguageContext.tsx # Internationalization
├── lib/                   # Utility libraries
│   └── supabase.ts        # Supabase client configuration
├── types/                 # TypeScript type definitions
│   └── index.ts           # Main type definitions
├── public/                # Static assets
├── supabase-schema.sql    # Database schema
└── README.md              # This file
```

## 🎨 Design Features

### Header
- **Info Bar**: Rotating promotional messages (Click & Collect, COD, etc.)
- **Language Selector**: Switch between English and Bangla
- **Navigation**: Home, Popular, Exclusive, Brands
- **Search Bar**: Product search functionality
- **User Actions**: Wishlist, Cart, Login/Register

### Homepage
- **Banner Carousel**: Promotional banners with auto-rotation
- **Product Sections**: Featured, New Arrivals, Best Sellers, Exclusive
- **Responsive Grid**: Adaptive product grid layout

### Product Cards
- **Square Images**: Consistent aspect ratio
- **Wishlist Button**: Heart icon for saving favorites
- **Pricing**: Original and discounted prices
- **Add to Cart**: Quick add to cart functionality
- **Stock Status**: Visual stock indicators

### Footer
- **Company Info**: About Zafra and social links
- **Policies**: Terms, Privacy, Refund policies
- **Contact**: Support information and payment methods
- **Features**: 24/7 support, money-back guarantee

## 🔧 Configuration

### Supabase Setup
1. Create tables using the provided SQL schema
2. Configure Row Level Security (RLS) policies
3. Set up authentication providers (Google, etc.)
4. Upload sample data

### Payment Integration
The application is prepared for:
- **Cash on Delivery**: Built-in support
- **bKash**: Ready for API integration
- **SSLCommerz**: Ready for gateway integration

### Internationalization
- English and Bangla translations included
- Easy to extend with additional languages
- Context-based language switching

## 🛡️ Security

- **Row Level Security**: Database-level access control
- **Authentication**: Supabase Auth with multiple providers
- **Input Validation**: Form validation and sanitization
- **HTTPS**: Secure data transmission

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced tablet experience
- **Desktop**: Full-featured desktop interface
- **Touch Friendly**: Optimized for touch interactions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Compatible with static export
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform deployment

## 🔄 Development Workflow

### Adding New Features
1. Create feature branch
2. Implement changes
3. Test thoroughly
4. Update documentation
5. Submit pull request

### Database Changes
1. Update types in `types/index.ts`
2. Modify SQL schema
3. Update API calls
4. Test data flow

## 📊 Analytics & Monitoring

Ready for integration with:
- **Google Analytics**: Track user behavior
- **Hotjar**: User session recordings
- **Sentry**: Error monitoring
- **Supabase Analytics**: Database insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@zafra.com
- Documentation: [Project Wiki]

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic e-commerce functionality
- ✅ Admin panel
- ✅ Responsive design
- ✅ Bilingual support

### Phase 2 (Upcoming)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Inventory management
- [ ] Customer reviews
- [ ] Loyalty program

### Phase 3 (Future)
- [ ] AI-powered recommendations
- [ ] Advanced search filters
- [ ] Multi-vendor support
- [ ] Subscription service
- [ ] AR try-on feature

---

**Built with ❤️ for Zafra Perfumes**
