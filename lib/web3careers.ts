import { 
  Job, 
  JobType, 
  JobLocation, 
  Company, 
  JobCategory,
  ExperienceLevel,
  Skill,
  SalaryRange,
  JobSearchFilters,
  JobSearchResponse 
} from '@/types/job'

// Web3Careers API specific interfaces
interface Web3CareersJob {
  id: string
  title: string
  company: {
    name: string
    logo?: string
    description?: string
    website?: string
    size?: string
  }
  description: string
  requirements: string[]
  nice_to_have?: string[]
  location: {
    type: 'remote' | 'onsite' | 'hybrid'
    city?: string
    country?: string
    timezone?: string
  }
  employment_type: 'full_time' | 'part_time' | 'contract' | 'internship'
  salary?: {
    min?: number
    max?: number
    currency: string
    period: 'yearly' | 'monthly' | 'hourly'
  }
  skills: string[]
  categories: string[]
  experience_level: 'entry' | 'mid' | 'senior' | 'lead'
  posted_at: string
  updated_at: string
  expires_at?: string
  application_url: string
  is_featured: boolean
  benefits?: string[]
  blockchain_networks?: string[]
}

interface Web3CareersApiResponse<T> {
  data: T
  meta: {
    total: number
    page: number
    per_page: number
    total_pages: number
  }
  success: boolean
  message?: string
}

interface JobSearchParams {
  query?: string
  location?: string
  job_type?: string
  experience_level?: string
  blockchain_network?: string
  salary_min?: number
  salary_max?: number
  company?: string
  skills?: string[]
  page?: number
  per_page?: number
}

// Cache interface for storing API responses
interface CacheEntry<T> {
  data: T
  timestamp: number
  expiry: number
}

class Web3CareersApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'Web3CareersApiError'
  }
}

class Web3CareersAPI {
  private baseUrl = 'https://api.web3careers.com/v1'
  private apiKey: string | null = null
  private cache = new Map<string, CacheEntry<any>>()
  private rateLimitTracker = new Map<string, number[]>()
  private readonly RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
  private readonly RATE_LIMIT_MAX_REQUESTS = 60 // 60 requests per minute
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.WEB3_CAREERS_API_KEY || null
  }

  // Rate limiting check
  private checkRateLimit(endpoint: string): boolean {
    const now = Date.now()
    const windowStart = now - this.RATE_LIMIT_WINDOW
    
    if (!this.rateLimitTracker.has(endpoint)) {
      this.rateLimitTracker.set(endpoint, [])
    }
    
    const requests = this.rateLimitTracker.get(endpoint)!
    const validRequests = requests.filter(time => time > windowStart)
    
    if (validRequests.length >= this.RATE_LIMIT_MAX_REQUESTS) {
      return false
    }
    
    validRequests.push(now)
    this.rateLimitTracker.set(endpoint, validRequests)
    return true
  }

  // Cache management
  private getCacheKey(endpoint: string, params?: Record<string, any>): string {
    const paramString = params ? JSON.stringify(params) : ''
    return `${endpoint}:${paramString}`
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry || Date.now() > entry.expiry) {
      this.cache.delete(key)
      return null
    }
    return entry.data
  }

  private setCache<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + this.CACHE_TTL
    })
  }

  // HTTP client with error handling
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    params?: Record<string, any>
  ): Promise<T> {
    if (!this.checkRateLimit(endpoint)) {
      throw new Web3CareersApiError(
        'Rate limit exceeded. Please try again later.',
        429,
        'RATE_LIMIT_EXCEEDED'
      )
    }

    const cacheKey = this.getCacheKey(endpoint, params)
    const cachedData = this.getFromCache<T>(cacheKey)
    if (cachedData && options.method !== 'POST') {
      return cachedData
    }

    const url = new URL(`${this.baseUrl}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, v.toString()))
          } else {
            url.searchParams.set(key, value.toString())
          }
        }
      })
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'VCR-Platform/1.0',
      ...options.headers as Record<string, string>
    }

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`
    }

    try {
      // Mock response for demonstration
      const mockResponse = this.generateMockResponse(endpoint, params)
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200))
      
      this.setCache(cacheKey, mockResponse)
      return mockResponse

    } catch (error) {
      if (error instanceof Web3CareersApiError) {
        throw error
      }
      
      throw new Web3CareersApiError(
        `API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500,
        'REQUEST_FAILED'
      )
    }
  }

  // Mock response generator (simulates actual API)
  private generateMockResponse(endpoint: string, params?: Record<string, any>): any {
    const mockJobs: Web3CareersJob[] = [
      {
        id: 'job-001',
        title: 'Senior Blockchain Developer',
        company: {
          name: 'ConsensNet Labs',
          logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200',
          description: 'Leading Web3 infrastructure company',
          website: 'https://consensnet.com',
          size: '50-200'
        },
        description: 'Build next-generation DeFi protocols and smart contracts on Ethereum and Layer 2 solutions.',
        requirements: [
          '5+ years of Solidity development',
          'Experience with DeFi protocols',
          'Strong understanding of blockchain architecture',
          'Experience with testing frameworks (Hardhat, Foundry)'
        ],
        nice_to_have: [
          'Experience with Layer 2 solutions',
          'Security audit experience',
          'Open source contributions'
        ],
        location: {
          type: 'remote',
          timezone: 'UTC-8 to UTC+2'
        },
        employment_type: 'full_time',
        salary: {
          min: 120000,
          max: 180000,
          currency: 'USD',
          period: 'yearly'
        },
        skills: ['Solidity', 'JavaScript', 'TypeScript', 'React', 'Node.js'],
        categories: ['Engineering', 'Blockchain', 'DeFi'],
        experience_level: 'senior',
        posted_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z',
        application_url: 'https://web3careers.com/jobs/job-001/apply',
        is_featured: true,
        benefits: ['Health insurance', 'Token equity', 'Remote work', 'Learning budget'],
        blockchain_networks: ['Ethereum', 'Polygon', 'Arbitrum']
      },
      {
        id: 'job-002',
        title: 'Web3 Product Manager',
        company: {
          name: 'DeFi Protocol',
          logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200',
          description: 'Innovative DeFi lending platform',
          website: 'https://defiprotocol.com',
          size: '20-50'
        },
        description: 'Lead product strategy for our DeFi lending platform, working closely with engineering and design teams.',
        requirements: [
          '3+ years of product management experience',
          'Understanding of DeFi mechanisms',
          'Experience with blockchain products',
          'Strong analytical skills'
        ],
        location: {
          type: 'hybrid',
          city: 'San Francisco',
          country: 'USA'
        },
        employment_type: 'full_time',
        salary: {
          min: 140000,
          max: 200000,
          currency: 'USD',
          period: 'yearly'
        },
        skills: ['Product Management', 'DeFi', 'Analytics', 'Strategy'],
        categories: ['Product', 'DeFi', 'Strategy'],
        experience_level: 'mid',
        posted_at: '2024-01-16T14:20:00Z',
        updated_at: '2024-01-16T14:20:00Z',
        application_url: 'https://web3careers.com/jobs/job-002/apply',
        is_featured: false,
        benefits: ['Equity', 'Health insurance', 'Flexible hours'],
        blockchain_networks: ['Ethereum', 'Base']
      },
      {
        id: 'job-003',
        title: 'Smart Contract Security Auditor',
        company: {
          name: 'ChainSafe Security',
          logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200',
          description: 'Premier blockchain security firm',
          website: 'https://chainsafe.io',
          size: '10-50'
        },
        description: 'Conduct security audits for smart contracts and DeFi protocols across multiple blockchain networks.',
        requirements: [
          'Strong background in cybersecurity',
          'Experience with smart contract auditing',
          'Knowledge of common vulnerabilities',
          'Proficiency in Solidity and Rust'
        ],
        location: {
          type: 'remote'
        },
        employment_type: 'full_time',
        salary: {
          min: 100000,
          max: 160000,
          currency: 'USD',
          period: 'yearly'
        },
        skills: ['Security Auditing', 'Solidity', 'Rust', 'DeFi', 'Smart Contracts'],
        categories: ['Security', 'Engineering', 'Auditing'],
        experience_level: 'mid',
        posted_at: '2024-01-17T09:15:00Z',
        updated_at: '2024-01-17T09:15:00Z',
        application_url: 'https://web3careers.com/jobs/job-003/apply',
        is_featured: true,
        benefits: ['Remote work', 'Professional development', 'Conference budget'],
        blockchain_networks: ['Ethereum', 'Solana', 'Cosmos']
      }
    ]

    if (endpoint === '/jobs') {
      const page = params?.page || 1
      const perPage = params?.per_page || 20
      let filteredJobs = [...mockJobs]

      // Apply filters
      if (params?.query) {
        const query = params.query.toLowerCase()
        filteredJobs = filteredJobs.filter(job =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.company.name.toLowerCase().includes(query)
        )
      }

      if (params?.job_type) {
        filteredJobs = filteredJobs.filter(job => job.employment_type === params.job_type)
      }

      if (params?.experience_level) {
        filteredJobs = filteredJobs.filter(job => job.experience_level === params.experience_level)
      }

      if (params?.blockchain_network) {
        filteredJobs = filteredJobs.filter(job =>
          job.blockchain_networks?.includes(params.blockchain_network)
        )
      }

      const total = filteredJobs.length
      const startIndex = (page - 1) * perPage
      const endIndex = startIndex + perPage
      const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

      return {
        data: paginatedJobs,
        meta: {
          total,
          page,
          per_page: perPage,
          total_pages: Math.ceil(total / perPage)
        },
        success: true
      }
    }

    if (endpoint.startsWith('/jobs/')) {
      const jobId = endpoint.split('/')[2]
      const job = mockJobs.find(j => j.id === jobId)
      
      if (!job) {
        throw new Web3CareersApiError('Job not found', 404, 'JOB_NOT_FOUND')
      }

      return {
        data: job,
        success: true
      }
    }

    throw new Web3CareersApiError('Endpoint not found', 404, 'ENDPOINT_NOT_FOUND')
  }

  // Convert Web3Careers job to our internal Job interface
  private transformJob(web3Job: Web3CareersJob): Job {
    return {
      id: web3Job.id,
      title: web3Job.title,
      company: this.transformCompany(web3Job.company),
      location: this.transformLocation(web3Job.location),
      jobType: this.transformJobType(web3Job.employment_type),
      experienceLevel: this.transformExperienceLevel(web3Job.experience_level),
      category: this.transformCategory(web3Job.categories[0] || 'Web3'),
      description: web3Job.description,
      requirements: web3Job.requirements,
      niceToHave: web3Job.nice_to_have,
      skills: web3Job.skills.map(skill => this.transformSkill(skill)),
      salary: web3Job.salary ? this.transformSalary(web3Job.salary) : undefined,
      postedAt: web3Job.posted_at,
      status: 'active' as const,
      featured: web3Job.is_featured,
      applicationMethod: {
        type: 'external' as const,
        url: web3Job.application_url
      },
      tags: web3Job.blockchain_networks,
      expiresAt: web3Job.expires_at
    }
  }

  private transformCompany(companyData: Web3CareersJob['company']): Company {
    return {
      id: companyData.name.toLowerCase().replace(/\s+/g, '-'),
      name: companyData.name,
      description: companyData.description,
      website: companyData.website,
      logo: companyData.logo,
      size: this.transformCompanySize(companyData.size)
    }
  }

  private transformLocation(location: Web3CareersJob['location']): JobLocation {
    return {
      type: location.type === 'onsite' ? 'on-site' : location.type,
      city: location.city,
      country: location.country,
      timezone: location.timezone
    }
  }

  private transformJobType(type: Web3CareersJob['employment_type']): JobType {
    const typeMap: Record<string, JobType> = {
      full_time: 'full-time',
      part_time: 'part-time',
      contract: 'contract',
      internship: 'internship'
    }
    return typeMap[type] || 'full-time'
  }

  private transformExperienceLevel(level: Web3CareersJob['experience_level']): ExperienceLevel {
    const levelMap: Record<string, ExperienceLevel> = {
      entry: 'entry-level',
      mid: 'mid-level',
      senior: 'senior',
      lead: 'lead'
    }
    return levelMap[level] || 'mid-level'
  }

  private transformCategory(categoryName: string): JobCategory {
    return {
      id: categoryName.toLowerCase().replace(/\s+/g, '-'),
      name: categoryName,
      slug: categoryName.toLowerCase().replace(/\s+/g, '-')
    }
  }

  private transformSkill(skillName: string): Skill {
    return {
      id: skillName.toLowerCase().replace(/\s+/g, '-'),
      name: skillName,
      category: 'programming' // Default category
    }
  }

  private transformSalary(salary: NonNullable<Web3CareersJob['salary']>): SalaryRange {
    return {
      min: salary.min,
      max: salary.max,
      currency: salary.currency,
      period: salary.period === 'yearly' ? 'yearly' : salary.period as SalaryRange['period']
    }
  }

  private transformCompanySize(size?: string): Company['size'] {
    if (!size) return undefined
    
    if (size.includes('1-10') || size.includes('startup')) return 'startup'
    if (size.includes('11-50') || size.includes('10-50')) return 'small'
    if (size.includes('51-200') || size.includes('50-200')) return 'medium'
    if (size.includes('201-1000') || size.includes('200-1000')) return 'large'
    if (size.includes('1000+') || size.includes('enterprise')) return 'enterprise'
    
    return 'small' // default
  }

  // Public API methods

  /**
   * Fetch job listings with optional filters
   */
  async getJobs(params: JobSearchParams = {}): Promise<{
    jobs: Job[]
    totalCount: number
    currentPage: number
    totalPages: number
  }> {
    try {
      const response = await this.request<Web3CareersApiResponse<Web3CareersJob[]>>('/jobs', {}, params)
      
      if (!response.success) {
        throw new Web3CareersApiError(
          response.message || 'Failed to fetch jobs',
          400,
          'API_ERROR'
        )
      }

      return {
        jobs: response.data.map(job => this.transformJob(job)),
        totalCount: response.meta.total,
        currentPage: response.meta.page,
        totalPages: response.meta.total_pages
      }
    } catch (error) {
      if (error instanceof Web3CareersApiError) {
        throw error
      }
      throw new Web3CareersApiError(
        'Failed to fetch job listings',
        500,
        'FETCH_JOBS_ERROR'
      )
    }
  }

  /**
   * Get a specific job by ID
   */
  async getJobById(jobId: string): Promise<Job> {
    try {
      const response = await this.request<Web3CareersApiResponse<Web3CareersJob>>(`/jobs/${jobId}`)
      
      if (!response.success) {
        throw new Web3CareersApiError(
          response.message || 'Job not found',
          404,
          'JOB_NOT_FOUND'
        )
      }

      return this.transformJob(response.data)
    } catch (error) {
      if (error instanceof Web3CareersApiError) {
        throw error
      }
      throw new Web3CareersApiError(
        'Failed to fetch job details',
        500,
        'FETCH_JOB_ERROR'
      )
    }
  }

  /**
   * Search jobs by keywords
   */
  async searchJobs(
    query: string,
    filters: Omit<JobSearchParams, 'query'> = {}
  ): Promise<{
    jobs: Job[]
    totalCount: number
    currentPage: number
    totalPages: number
  }> {
    return this.getJobs({ query, ...filters })
  }

  /**
   * Get featured/trending jobs
   */
  async getFeaturedJobs(limit: number = 10): Promise<Job[]> {
    try {
      const response = await this.getJobs({ per_page: limit })
      return response.jobs.filter(job => job.featured).slice(0, limit)
    } catch (error) {
      console.error('Failed to fetch featured jobs:', error)
      return []
    }
  }

  /**
   * Clear cache (useful for testing or force refresh)
   */
  clearCache(): void {
    this.cache.clear()
  }

  /**
   * Get cache stats
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }
}

// Export singleton instance
export const web3CareersAPI = new Web3CareersAPI()

// Export types and classes for external use
export type { Web3CareersJob, JobSearchParams }
export { Web3CareersAPI, Web3CareersApiError }