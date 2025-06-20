import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Return Policy Overview</h2>
              <p className="text-gray-700 mb-4">
                At Scentare Perfume Store, we want you to be completely satisfied with your purchase. We understand that fragrances are personal, and sometimes a scent may not be exactly what you expected.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <p className="text-blue-800">
                  <strong>Important:</strong> Due to the nature of perfume products, we can only accept returns for unopened, unused items in their original packaging.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Return Eligibility</h2>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Items Eligible for Return:</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Unopened and unused perfumes</li>
                <li>Items in original packaging with all seals intact</li>
                <li>Items returned within 30 days of purchase</li>
                <li>Items purchased directly from our website</li>
              </ul>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Items NOT Eligible for Return:</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Opened or used perfumes</li>
                <li>Items without original packaging</li>
                <li>Damaged or tampered items</li>
                <li>Items purchased from third-party retailers</li>
                <li>Sale or clearance items (unless defective)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Return Process</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Step-by-Step Return Process:</h3>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                  <li><strong>Contact Customer Service:</strong> Email us at returns@Scentareperfume.com within 30 days of purchase</li>
                  <li><strong>Provide Order Details:</strong> Include your order number and reason for return</li>
                  <li><strong>Receive Return Authorization:</strong> We'll provide you with a return authorization number</li>
                  <li><strong>Package Your Return:</strong> Securely package the item in its original packaging</li>
                  <li><strong>Ship Your Return:</strong> Use the provided shipping label or ship to our return address</li>
                  <li><strong>Refund Processing:</strong> Once received and inspected, we'll process your refund</li>
                </ol>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Refund Timeline</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-900 mb-2">Standard Refund Process</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Return received: 1-3 business days</li>
                    <li>• Inspection period: 1-2 business days</li>
                    <li>• Refund processing: 3-5 business days</li>
                    <li>• Bank processing: 5-10 business days</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Total Timeline</h3>
                  <p className="text-blue-800 text-sm">
                    <strong>10-20 business days</strong> from when we receive your return until the refund appears in your account.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Refund Methods</h2>
              <p className="text-gray-700 mb-4">Refunds will be issued to the original payment method used for the purchase:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Credit/Debit Cards:</strong> Refunded to the original card</li>
                <li><strong>PayPal:</strong> Refunded to your PayPal account</li>
                <li><strong>Gift Cards:</strong> Refunded as store credit</li>
                <li><strong>Bank Transfers:</strong> Refunded to the original account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Shipping Costs</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-800">
                  <strong>Note:</strong> Return shipping costs are the responsibility of the customer unless the item is defective or we made an error.
                </p>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">When We Cover Shipping:</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Defective or damaged items</li>
                <li>Wrong item shipped</li>
                <li>Our processing errors</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Exchanges</h2>
              <p className="text-gray-700 mb-4">
                We offer exchanges for different fragrances or sizes within the same product line. Exchange requests must be made within 30 days of purchase and follow the same return eligibility criteria.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800">
                  <strong>Exchange Benefits:</strong> No additional shipping charges for exchanges to items of equal or greater value.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Damaged or Defective Items</h2>
              <p className="text-gray-700 mb-4">
                If you receive a damaged or defective item, please contact us immediately. We will provide a prepaid return label and expedite your replacement or refund.
              </p>
              <h3 className="text-lg font-medium text-gray-900 mb-2">What to Do:</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Take photos of the damage</li>
                <li>Contact us within 48 hours of delivery</li>
                <li>Do not use or open the damaged item</li>
                <li>We'll provide a prepaid return label</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. International Returns</h2>
              <p className="text-gray-700 mb-4">
                International customers are responsible for return shipping costs and any applicable customs duties or taxes. Returns must comply with local regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about returns or refunds, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">Email: returns@Scentareperfume.com</p>
                <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-700">Hours: Monday-Friday, 9 AM - 6 PM EST</p>
                <p className="text-gray-700">Return Address: 123 Perfume Street, Fragrance City, FC 12345</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Policy Updates</h2>
              <p className="text-gray-700 mb-4">
                This refund policy may be updated from time to time. The most current version will always be available on this page.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 