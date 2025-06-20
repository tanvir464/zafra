import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Scentare Perfume Store
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are passionate about bringing the world's finest fragrances to discerning customers who appreciate the art of perfumery and the stories behind each scent.
          </p>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  Founded in 2020, Scentare Perfume Store began as a small family business with a simple mission: to make luxury fragrances accessible to everyone who appreciates the art of perfumery.
                </p>
                <p className="text-gray-700 mb-4">
                  What started as a passion project has grown into a trusted destination for fragrance enthusiasts worldwide. Our founder, a lifelong perfume collector, recognized the need for a curated selection of authentic, high-quality fragrances with exceptional customer service.
                </p>
                <p className="text-gray-700">
                  Today, we're proud to offer an extensive collection of over 1,000 fragrances from the world's most prestigious brands, serving customers in over 50 countries.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-8 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
                <p className="text-gray-700">Fragrances Available</p>
                <div className="text-4xl font-bold text-purple-600 mb-2 mt-6">50+</div>
                <p className="text-gray-700">Countries Served</p>
                <div className="text-4xl font-bold text-purple-600 mb-2 mt-6">10,000+</div>
                <p className="text-gray-700">Happy Customers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                To provide an unparalleled fragrance shopping experience by offering authentic, high-quality perfumes with exceptional customer service and expert guidance.
              </p>
              <p className="text-gray-700">
                We believe that every person deserves to find their perfect scent - one that tells their story and enhances their confidence.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-700 mb-4">
                To become the world's most trusted destination for luxury fragrances, known for our authenticity, expertise, and commitment to customer satisfaction.
              </p>
              <p className="text-gray-700">
                We envision a world where everyone can discover and enjoy the transformative power of fine perfumery.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h3>
                <p className="text-gray-700">
                  We guarantee that every fragrance we sell is 100% authentic and sourced directly from authorized distributors.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                <p className="text-gray-700">
                  We strive for excellence in everything we do, from product selection to customer service and packaging.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Passion</h3>
                <p className="text-gray-700">
                  Our love for fragrances drives us to continuously discover and share the world's most beautiful scents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">SM</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Mitchell</h3>
                <p className="text-purple-600 font-medium mb-2">Founder & CEO</p>
                <p className="text-gray-700 text-sm">
                  Perfume enthusiast with 15+ years of experience in luxury retail and fragrance curation.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">MJ</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Michael Johnson</h3>
                <p className="text-purple-600 font-medium mb-2">Head of Operations</p>
                <p className="text-gray-700 text-sm">
                  Expert in supply chain management and ensuring the highest quality standards.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">ED</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Emma Davis</h3>
                <p className="text-purple-600 font-medium mb-2">Customer Experience Manager</p>
                <p className="text-gray-700 text-sm">
                  Dedicated to providing exceptional service and personalized fragrance recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Scentare?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Authentic Products</h3>
                    <p className="text-gray-700 text-sm">All fragrances are 100% authentic and sourced directly from manufacturers.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Expert Guidance</h3>
                    <p className="text-gray-700 text-sm">Our fragrance experts help you find the perfect scent for any occasion.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Secure Packaging</h3>
                    <p className="text-gray-700 text-sm">Carefully packaged to ensure your fragrances arrive in perfect condition.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Global Shipping</h3>
                    <p className="text-gray-700 text-sm">Fast and reliable shipping to over 50 countries worldwide.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Customer Support</h3>
                    <p className="text-gray-700 text-sm">24/7 customer support to assist you with any questions or concerns.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Loyalty Program</h3>
                    <p className="text-gray-700 text-sm">Earn points with every purchase and enjoy exclusive member benefits.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Discover Your Perfect Scent?</h2>
            <p className="text-purple-100 mb-6">
              Join thousands of satisfied customers who trust Scentare for their fragrance needs.
            </p>
            <a
              href="/perfumes"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Shop Now
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 