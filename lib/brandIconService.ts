interface BrandIconResult {
  url: string
  alt: string
  source: string
}

class BrandIconService {
  private static readonly BRAND_ICON_CACHE = new Map<string, BrandIconResult>()

  private static readonly BRAND_COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
    '#F9E79F', '#ABEBC6', '#FAD7A0', '#AED6F1', '#F5B7B1'
  ]

  /**
   * Main method to get brand icon/logo
   */
  static async getBrandIcon(brandName: string): Promise<BrandIconResult> {
    const normalizedBrandName = brandName.toLowerCase().trim()
    if (this.BRAND_ICON_CACHE.has(normalizedBrandName)) {
      return this.BRAND_ICON_CACHE.get(normalizedBrandName)!
    }

    try {
      const domain = this.extractDomain(brandName)
      const realLogoUrl = `https://logo.clearbit.com/${domain}`

      // Try loading the real logo to validate it exists
      const logoValid = await this.validateImage(realLogoUrl)

      const result: BrandIconResult = logoValid
        ? {
            url: realLogoUrl,
            alt: `${brandName} logo`,
            source: 'clearbit'
          }
        : this.generateFallbackAvatar(brandName)

      this.BRAND_ICON_CACHE.set(normalizedBrandName, result)
      return result
    } catch (error) {
      console.error(`Error fetching logo for ${brandName}:`, error)
      const fallback = this.generateFallbackAvatar(brandName)
      this.BRAND_ICON_CACHE.set(normalizedBrandName, fallback)
      return fallback
    }
  }

  /**
   * Validate if image exists (logo is real)
   */
  private static async validateImage(url: string): Promise<boolean> {
    try {
      const res = await fetch(url, { method: 'HEAD' })
      return res.ok
    } catch {
      return false
    }
  }

  /**
   * Generate fallback avatar using UI Avatars
   */
  private static generateFallbackAvatar(brandName: string): BrandIconResult {
    const color = this.getBrandColor(brandName)
    const initials = this.getBrandInitial(brandName)
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      initials
    )}&background=${color.replace('#', '')}&color=ffffff&size=128&bold=true&length=2`

    return {
      url: avatarUrl,
      alt: `${brandName} icon`,
      source: 'ui-avatars'
    }
  }

  /**
   * Extract domain from brand name (simple logic)
   */
  private static extractDomain(brandName: string): string {
    return brandName.toLowerCase().replace(/\s+/g, '') + '.com'
  }

  private static getBrandInitial(brandName: string): string {
    const words = brandName.trim().split(' ')
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
    return brandName.charAt(0).toUpperCase()
  }

  private static getBrandColor(brandName: string): string {
    const hash = brandName.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)
    const index = Math.abs(hash) % this.BRAND_COLORS.length
    return this.BRAND_COLORS[index]
  }

  static clearCache(): void {
    this.BRAND_ICON_CACHE.clear()
  }

  static getCacheStats(): { size: number; entries: string[] } {
    return {
      size: this.BRAND_ICON_CACHE.size,
      entries: Array.from(this.BRAND_ICON_CACHE.keys())
    }
  }
}

export default BrandIconService
