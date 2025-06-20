import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Shipping Overview</h2>
              <p className="text-gray-700 mb-4">
                At Scentare Perfume Store, we take great care in packaging and shipping your fragrances to ensure they arrive safely and in perfect condition. We offer multiple shipping options to meet your needs.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <p className="text-blue-800">
                  <strong>Important:</strong> All orders are processed and shipped within 1-2 business days of payment confirmation.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Shipping Options</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Standard Shipping</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">$5.99</p>
                  <p className="text-gray-600 mb-3">5-7 business days</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Free on orders over $50</li>
                    <li>• Tracking included</li>
                    <li>• Signature not required</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Express Shipping</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">$12.99</p>
                  <p className="text-gray-600 mb-3">2-3 business days</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Free on orders over $100</li>
                    <li>• Priority tracking</li>
                    <li>• Signature confirmation</li>
                  </ul>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Overnight Shipping</h3>
                <p className="text-2xl font-bold text-purple-600 mb-2">$24.99</p>
                <p className="text-gray-600 mb-3">Next business day</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Available for orders placed before 2 PM EST</li>
                  <li>• Express tracking</li>
                  <li>• Signature required</li>
                  <li>• Not available on weekends or holidays</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Processing Time</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Order Processing Timeline:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <p className="font-medium text-gray-900">Order Placed</p>
                    <p className="text-gray-600">Immediate confirmation</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <p className="font-medium text-gray-900">Processing</p>
                    <p className="text-gray-600">1-2 business days</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <p className="font-medium text-gray-900">Shipped</p>
                    <p className="text-gray-600">Tracking provided</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Packaging & Handling</h2>
              <p className="text-gray-700 mb-4">
                We take special care in packaging your fragrances to ensure they arrive safely:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Bubble wrap protection for all bottles</li>
                <li>Secure packaging to prevent leaks</li>
                <li>Temperature-controlled packaging when needed</li>
                <li>Fragile item labeling</li>
                <li>Eco-friendly packaging materials</li>
              </ul>
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <p className="text-green-800">
                  <strong>Eco-Friendly:</strong> We use recyclable and biodegradable packaging materials whenever possible.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Tracking & Delivery</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tracking Information</h3>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Tracking number provided via email</li>
                    <li>Real-time updates on delivery status</li>
                    <li>Estimated delivery date provided</li>
                    <li>Delivery notifications sent</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Delivery Options</h3>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Home delivery (default)</li>
                    <li>Office delivery available</li>
                    <li>Signature required for high-value orders</li>
                    <li>Hold at location option</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. International Shipping</h2>
              <p className="text-gray-700 mb-4">
                We ship to most countries worldwide. International shipping rates and delivery times vary by location.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-800">
                  <strong>Important:</strong> International customers are responsible for any customs duties, taxes, or import fees.
                </p>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">International Shipping Rates:</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Canada:</strong> $15.99 (7-10 business days)</li>
                <li><strong>Mexico:</strong> $18.99 (8-12 business days)</li>
                <li><strong>Europe:</strong> $22.99 (10-15 business days)</li>
                <li><strong>Asia:</strong> $25.99 (12-18 business days)</li>
                <li><strong>Australia:</strong> $28.99 (14-20 business days)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Delivery Issues</h2>
              <p className="text-gray-700 mb-4">
                If you experience any delivery issues, please contact us immediately:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-red-900 mb-2">Common Issues</h3>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Package not delivered</li>
                    <li>• Damaged packaging</li>
                    <li>• Wrong address</li>
                    <li>• Delayed delivery</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">What We Do</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Investigate the issue</li>
                    <li>• Provide replacement if needed</li>
                    <li>• Refund shipping costs</li>
                    <li>• Expedite replacement shipping</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Shipping Restrictions</h2>
              <p className="text-gray-700 mb-4">
                Due to safety and regulatory requirements, we cannot ship to certain locations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>PO Boxes (for certain shipping methods)</li>
                <li>Military bases (APO/FPO addresses)</li>
                <li>Countries with fragrance import restrictions</li>
                <li>Remote or inaccessible locations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Holiday Shipping</h2>
              <p className="text-gray-700 mb-4">
                During peak holiday seasons, processing times may be extended. We recommend placing orders early to ensure timely delivery.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                <p className="text-orange-800">
                  <strong>Holiday Deadlines:</strong> Check our website for specific holiday shipping deadlines and cut-off dates.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For shipping-related questions or concerns, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">Email: shipping@Scentareperfume.com</p>
                <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-700">Hours: Monday-Friday, 9 AM - 6 PM EST</p>
                <p className="text-gray-700">Warehouse Address: 123 Perfume Street, Fragrance City, FC 12345</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 