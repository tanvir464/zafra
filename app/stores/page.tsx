import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function StoresPage() {
  const stores = [
    {
      id: 1,
      name: "Scentare Perfume Store - Downtown",
      address: "123 Perfume Street",
      city: "Fragrance City",
      state: "FC",
      zip: "12345",
      phone: "+1 (555) 123-4567",
      hours: {
        mon: "9:00 AM - 8:00 PM",
        tue: "9:00 AM - 8:00 PM",
        wed: "9:00 AM - 8:00 PM",
        thu: "9:00 AM - 8:00 PM",
        fri: "9:00 AM - 9:00 PM",
        sat: "10:00 AM - 6:00 PM",
        sun: "11:00 AM - 5:00 PM"
      },
      features: ["Fragrance Testing", "Gift Wrapping", "Personal Shopping", "VIP Lounge"],
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      name: "Scentare Perfume Store - Mall Location",
      address: "456 Luxury Avenue",
      city: "Fragrance City",
      state: "FC",
      zip: "12346",
      phone: "+1 (555) 123-4568",
      hours: {
        mon: "10:00 AM - 9:00 PM",
        tue: "10:00 AM - 9:00 PM",
        wed: "10:00 AM - 9:00 PM",
        thu: "10:00 AM - 9:00 PM",
        fri: "10:00 AM - 10:00 PM",
        sat: "10:00 AM - 10:00 PM",
        sun: "11:00 AM - 7:00 PM"
      },
      features: ["Fragrance Testing", "Gift Wrapping", "Mall Parking", "Food Court Nearby"],
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 3,
      name: "Scentare Perfume Store - Airport",
      address: "789 Travel Plaza",
      city: "Fragrance City",
      state: "FC",
      zip: "12347",
      phone: "+1 (555) 123-4569",
      hours: {
        mon: "6:00 AM - 10:00 PM",
        tue: "6:00 AM - 10:00 PM",
        wed: "6:00 AM - 10:00 PM",
        thu: "6:00 AM - 10:00 PM",
        fri: "6:00 AM - 10:00 PM",
        sat: "6:00 AM - 10:00 PM",
        sun: "6:00 AM - 10:00 PM"
      },
      features: ["Travel Sizes", "Gift Wrapping", "TSA Compliant", "24/7 Security"],
      coordinates: { lat: 40.6413, lng: -73.7781 }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Store Locations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit one of our beautiful stores to experience our fragrances in person. Our expert staff is ready to help you find your perfect scent.
          </p>
        </section>

        {/* Store List */}
        <section className="mb-16">
          <div className="space-y-8">
            {stores.map((store) => (
              <div key={store.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="md:flex">
                  {/* Store Image Placeholder */}
                  <div className="md:w-1/3 bg-gradient-to-br from-purple-100 to-pink-100 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-purple-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p className="text-purple-600 font-semibold">Store Photo</p>
                    </div>
                  </div>
                  
                  {/* Store Information */}
                  <div className="md:w-2/3 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{store.name}</h2>
                    
                    {/* Address and Contact */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
                        <div className="space-y-2 text-gray-700">
                          <p>{store.address}</p>
                          <p>{store.city}, {store.state} {store.zip}</p>
                          <p className="text-purple-600 font-medium">{store.phone}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Store Features</h3>
                        <ul className="space-y-1">
                          {store.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Store Hours</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">Monday:</span>
                          <span>{store.hours.mon}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Tuesday:</span>
                          <span>{store.hours.tue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Wednesday:</span>
                          <span>{store.hours.wed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Thursday:</span>
                          <span>{store.hours.thu}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Friday:</span>
                          <span>{store.hours.fri}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Saturday:</span>
                          <span>{store.hours.sat}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Sunday:</span>
                          <span>{store.hours.sun}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={`https://maps.google.com/?q=${store.address}, ${store.city}, ${store.state} ${store.zip}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Get Directions
                      </a>
                      <a
                        href={`tel:${store.phone}`}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Store
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Us on the Map</h2>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                </svg>
                <p className="text-gray-600">Interactive map coming soon</p>
                <p className="text-sm text-gray-500 mt-2">View all our store locations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Store Services */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">In-Store Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fragrance Testing</h3>
                <p className="text-gray-700">
                  Try before you buy with our extensive collection of testers and expert guidance.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Shopping</h3>
                <p className="text-gray-700">
                  Book a personal shopping session with our fragrance experts for a tailored experience.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Gift Wrapping</h3>
                <p className="text-gray-700">
                  Beautiful gift wrapping service available for all purchases, perfect for special occasions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Can't Visit a Store?</h2>
            <p className="text-purple-100 mb-6">
              Shop online and enjoy the same great service with fast shipping and easy returns.
            </p>
            <a
              href="/perfumes"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Shop Online
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 