import { Review } from '@/types'

export class ReviewService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

  static async getReviewsByPerfumeId(perfumeId: string): Promise<Review[]> {
    try {
      const response = await fetch(`${this.baseUrl}/reviews/perfume/${perfumeId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching reviews:', error)
      // Return mock data for development
      return this.getMockReviews(perfumeId)
    }
  }

  static async addReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<Review> {
    try {
      const response = await fetch(`${this.baseUrl}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      })
      
      if (!response.ok) {
        throw new Error('Failed to add review')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error adding review:', error)
      throw error
    }
  }

  static async getAverageRating(perfumeId: string): Promise<number> {
    try {
      const reviews = await this.getReviewsByPerfumeId(perfumeId)
      if (reviews.length === 0) return 0
      
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
      return Math.round((totalRating / reviews.length) * 10) / 10
    } catch (error) {
      console.error('Error calculating average rating:', error)
      return 0
    }
  }

  private static getMockReviews(perfumeId: string): Review[] {
    return [
      {
        id: '1',
        user_id: 'user1',
        perfume_id: perfumeId,
        rating: 5,
        comment: 'Amazing fragrance! The scent is long-lasting and perfect for any occasion. Highly recommend!',
        user_name: 'Sarah Johnson',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        user_id: 'user2',
        perfume_id: perfumeId,
        rating: 4,
        comment: 'Great perfume with a sophisticated scent. The packaging is beautiful and the bottle is elegant.',
        user_name: 'Michael Chen',
        created_at: '2024-01-10T14:20:00Z',
        updated_at: '2024-01-10T14:20:00Z'
      },
      {
        id: '3',
        user_id: 'user3',
        perfume_id: perfumeId,
        rating: 5,
        comment: 'This is my favorite perfume! The fragrance is unique and gets me so many compliments.',
        user_name: 'Emily Rodriguez',
        created_at: '2024-01-05T09:15:00Z',
        updated_at: '2024-01-05T09:15:00Z'
      },
      {
        id: '4',
        user_id: 'user4',
        perfume_id: perfumeId,
        rating: 3,
        comment: 'Good perfume but the scent doesn\'t last as long as I expected. Still worth the price.',
        user_name: 'David Wilson',
        created_at: '2024-01-01T16:45:00Z',
        updated_at: '2024-01-01T16:45:00Z'
      },
      {
        id: '5',
        user_id: 'user5',
        perfume_id: perfumeId,
        rating: 4,
        comment: 'Lovely fragrance with a perfect balance of notes. The bottle design is also very attractive.',
        user_name: 'Lisa Thompson',
        created_at: '2023-12-28T11:30:00Z',
        updated_at: '2023-12-28T11:30:00Z'
      }
    ]
  }
} 