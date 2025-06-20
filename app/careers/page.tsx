import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CareersPage() {
  const jobOpenings = [
    {
      id: 1,
      title: "Fragrance Specialist",
      department: "Sales",
      location: "Fragrance City, FC",
      type: "Full-time",
      experience: "2+ years",
      description: "Join our team as a Fragrance Specialist and help customers discover their perfect scent. You'll provide expert guidance, conduct fragrance consultations, and maintain our high standards of customer service.",
      responsibilities: [
        "Provide personalized fragrance consultations",
        "Maintain product knowledge and stay updated on new releases",
        "Achieve sales targets and provide exceptional customer service",
        "Assist with inventory management and visual merchandising"
      ],
      requirements: [
        "Passion for fragrances and luxury retail",
        "Excellent communication and interpersonal skills",
        "Previous retail experience preferred",
        "Flexible schedule including weekends"
      ]
    },
    {
      id: 2,
      title: "E-commerce Manager",
      department: "Digital",
      location: "Remote / Fragrance City, FC",
      type: "Full-time",
      experience: "3+ years",
      description: "Lead our online presence and drive digital growth. You'll manage our e-commerce platform, optimize user experience, and develop digital marketing strategies.",
      responsibilities: [
        "Manage and optimize our e-commerce website",
        "Develop and execute digital marketing campaigns",
        "Analyze website performance and user behavior",
        "Collaborate with marketing and IT teams"
      ],
      requirements: [
        "Experience with e-commerce platforms (Shopify preferred)",
        "Strong analytical and project management skills",
        "Knowledge of digital marketing and SEO",
        "Experience in luxury retail or beauty industry"
      ]
    },
    {
      id: 3,
      title: "Customer Service Representative",
      department: "Support",
      location: "Fragrance City, FC",
      type: "Full-time",
      experience: "1+ years",
      description: "Be the voice of Scentare and help our customers with their inquiries, orders, and support needs. You'll work in a fast-paced environment providing excellent service.",
      responsibilities: [
        "Handle customer inquiries via phone, email, and chat",
        "Process orders and assist with returns",
        "Resolve customer issues and complaints",
        "Maintain customer records and update information"
      ],
      requirements: [
        "Excellent communication and problem-solving skills",
        "Customer service experience preferred",
        "Proficiency with CRM systems",
        "Ability to work in shifts including evenings"
      ]
    },
    {
      id: 4,
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "Fragrance City, FC",
      type: "Full-time",
      experience: "2+ years",
      description: "Support our marketing team in creating compelling campaigns, managing social media, and building brand awareness in the luxury fragrance market.",
      responsibilities: [
        "Assist with social media content creation and management",
        "Coordinate marketing campaigns and events",
        "Support email marketing and newsletter creation",
        "Track and report on marketing performance"
      ],
      requirements: [
        "Experience with social media platforms and marketing tools",
        "Strong writing and creative skills",
        "Knowledge of luxury brand marketing",
        "Bachelor's degree in Marketing or related field"
      ]
    }
  ]

  const benefits = [
    {
      icon: "🏥",
      title: "Health Benefits",
      description: "Comprehensive health, dental, and vision insurance for you and your family"
    },
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "Attractive compensation packages with performance-based bonuses"
    },
    {
      icon: "🏖️",
      title: "Paid Time Off",
      description: "Generous vacation days, sick leave, and paid holidays"
    },
    {
      icon: "🎓",
      title: "Professional Development",
      description: "Training programs, workshops, and opportunities for career growth"
    },
    {
      icon: "🛍️",
      title: "Employee Discount",
      description: "Special discounts on all our fragrances and exclusive products"
    },
    {
      icon: "🏠",
      title: "Flexible Work",
      description: "Remote work options and flexible scheduling where applicable"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of a passionate team dedicated to bringing the world's finest fragrances to discerning customers. We're looking for talented individuals who share our love for luxury and exceptional service.
          </p>
        </section>

        {/* Company Culture */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Culture</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Passion for Fragrances</h3>
                <p className="text-gray-700">
                  We're united by our love for the art of perfumery and the stories behind each scent.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaborative Environment</h3>
                <p className="text-gray-700">
                  We believe in teamwork, open communication, and supporting each other's growth.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation & Growth</h3>
                <p className="text-gray-700">
                  We encourage creativity, continuous learning, and pushing boundaries in everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Benefits & Perks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-700 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Open Positions</h2>
            <div className="space-y-8">
              {jobOpenings.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.type}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                          </svg>
                          {job.experience}
                        </span>
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Application Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Apply</h3>
                <p className="text-sm text-gray-700">Submit your resume and cover letter through our online portal</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Review</h3>
                <p className="text-sm text-gray-700">Our team will review your application within 1-2 weeks</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Interview</h3>
                <p className="text-sm text-gray-700">Meet with our team for a conversation about the role</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-lg">4</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Join Us</h3>
                <p className="text-sm text-gray-700">Welcome to the Scentare family! Start your journey with us</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Don't See the Right Fit?</h2>
            <p className="text-purple-100 mb-6">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <a
              href="/contact"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 