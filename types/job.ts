export interface Skill {
  id: string;
  name: string;
  category: 'programming' | 'framework' | 'tool' | 'soft-skill' | 'other';
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  verified?: boolean;
  yearsOfExperience?: number;
}

export interface SalaryRange {
  min?: number;
  max?: number;
  currency: string;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  negotiable?: boolean;
  equity?: boolean;
  equityRange?: {
    min: number;
    max: number;
  };
  benefits?: string[];
}

export interface JobLocation {
  type: 'remote' | 'on-site' | 'hybrid';
  city?: string;
  state?: string;
  country?: string;
  timezone?: string;
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  remotePolicy?: {
    allowedCountries?: string[];
    allowedTimezones?: string[];
    occasionalTravel?: boolean;
  };
}

export interface Company {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  website?: string;
  industry?: string;
  size?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  employeeCount?: string;
  foundedYear?: number;
  logo?: string;
  coverImage?: string;
  headquarters?: JobLocation;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    facebook?: string;
  };
  techStack?: string[];
  benefits?: string[];
  culture?: string[];
  funding?: {
    stage?: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'ipo' | 'acquired';
    totalRaised?: number;
    lastRoundAmount?: number;
    lastRoundDate?: string;
  };
  rating?: {
    overall?: number;
    workLifeBalance?: number;
    compensation?: number;
    culture?: number;
    careerGrowth?: number;
    management?: number;
    reviewCount?: number;
  };
}

export interface JobCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategory?: string;
  subcategories?: string[];
  jobCount?: number;
  trending?: boolean;
  skills?: string[];
  averageSalary?: SalaryRange;
}

export type JobType = 
  | 'full-time'
  | 'part-time'
  | 'contract'
  | 'freelance'
  | 'internship'
  | 'temporary'
  | 'volunteer'
  | 'apprenticeship';

export type ExperienceLevel = 
  | 'entry-level'
  | 'junior'
  | 'mid-level'
  | 'senior'
  | 'lead'
  | 'principal'
  | 'director'
  | 'executive'
  | 'no-experience';

export interface Job {
  id: string;
  title: string;
  slug?: string;
  company: Company;
  location: JobLocation;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  category: JobCategory;
  description: string;
  shortDescription?: string;
  responsibilities?: string[];
  requirements?: string[];
  qualifications?: string[];
  niceToHave?: string[];
  skills: Skill[];
  salary?: SalaryRange;
  postedAt: string;
  updatedAt?: string;
  expiresAt?: string;
  status: 'active' | 'paused' | 'filled' | 'expired' | 'draft';
  urgentHiring?: boolean;
  featured?: boolean;
  remote?: boolean;
  visa?: {
    sponsorshipAvailable?: boolean;
    sponsorshipRequired?: boolean;
    visaTypes?: string[];
  };
  applicationMethod: {
    type: 'internal' | 'external' | 'email';
    url?: string;
    email?: string;
    instructions?: string;
  };
  applicationDeadline?: string;
  startDate?: string;
  duration?: string; // For contract/temporary positions
  team?: {
    name?: string;
    size?: string;
    structure?: string;
  };
  workingHours?: {
    type: 'standard' | 'flexible' | 'shift' | 'compressed';
    details?: string;
  };
  travelRequirement?: {
    percentage?: number;
    description?: string;
  };
  securityClearance?: {
    required?: boolean;
    level?: string;
  };
  applicationCount?: number;
  viewCount?: number;
  source?: string; // Job board source
  externalId?: string; // ID from external job board
  tags?: string[];
  archived?: boolean;
  bookmarked?: boolean;
  applied?: boolean;
  similarJobs?: string[]; // Job IDs
  metadata?: Record<string, any>;
}

export interface JobSearchFilters {
  query?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
    radius?: number; // in kilometers
    remote?: boolean;
  };
  jobTypes?: JobType[];
  experienceLevels?: ExperienceLevel[];
  categories?: string[]; // Category IDs
  companies?: string[]; // Company IDs
  skills?: string[]; // Skill IDs
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
    period?: SalaryRange['period'];
  };
  postedSince?: 'today' | 'yesterday' | 'week' | 'month' | 'all';
  workingHours?: Array<'standard' | 'flexible' | 'shift' | 'compressed'>;
  benefits?: string[];
  companySize?: Array<'startup' | 'small' | 'medium' | 'large' | 'enterprise'>;
  visaSponsorship?: boolean;
  urgentHiring?: boolean;
  featured?: boolean;
  tags?: string[];
  sortBy?: 'relevance' | 'date' | 'salary' | 'company' | 'title';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  job?: Job; // Populated job details
  userId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'interviewing' | 'offered' | 'rejected' | 'withdrawn' | 'hired';
  appliedAt: string;
  updatedAt?: string;
  notes?: string;
  recruiterNotes?: string;
  source: 'direct' | 'referral' | 'job-board' | 'social' | 'career-page';
  referralSource?: string;
  customQuestions?: Array<{
    question: string;
    answer: string;
    required: boolean;
  }>;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: 'resume' | 'cover-letter' | 'portfolio' | 'certificate' | 'other';
    size?: number;
    uploadedAt: string;
  }>;
  timeline?: Array<{
    id: string;
    event: 'applied' | 'reviewed' | 'shortlisted' | 'interviewed' | 'offered' | 'rejected' | 'withdrawn' | 'hired';
    timestamp: string;
    details?: string;
    performedBy?: string;
  }>;
  interviews?: Array<{
    id: string;
    type: 'phone' | 'video' | 'in-person' | 'technical' | 'behavioral';
    scheduledAt: string;
    duration?: number; // in minutes
    interviewers?: string[];
    location?: string;
    meetingLink?: string;
    status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
    feedback?: string;
    rating?: number;
    notes?: string;
  }>;
  offer?: {
    id: string;
    salary: SalaryRange;
    startDate?: string;
    benefits?: string[];
    terms?: string;
    expiresAt?: string;
    status: 'pending' | 'accepted' | 'rejected' | 'expired' | 'withdrawn';
    negotiationNotes?: string;
  };
  rejectionReason?: string;
  rejectionFeedback?: string;
  withdrawalReason?: string;
  rating?: {
    companyRating?: number;
    interviewRating?: number;
    overallExperience?: number;
    feedback?: string;
  };
  communicationHistory?: Array<{
    id: string;
    type: 'email' | 'phone' | 'message' | 'meeting';
    direction: 'inbound' | 'outbound';
    subject?: string;
    content?: string;
    timestamp: string;
    participants?: string[];
  }>;
  metadata?: Record<string, any>;
}

export interface JobSearchResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  facets?: {
    locations?: Array<{
      value: string;
      count: number;
    }>;
    jobTypes?: Array<{
      value: JobType;
      count: number;
    }>;
    experienceLevels?: Array<{
      value: ExperienceLevel;
      count: number;
    }>;
    companies?: Array<{
      value: string;
      count: number;
      name?: string;
    }>;
    categories?: Array<{
      value: string;
      count: number;
      name?: string;
    }>;
    skills?: Array<{
      value: string;
      count: number;
    }>;
    salaryRanges?: Array<{
      range: string;
      count: number;
    }>;
  };
}

export interface JobAlert {
  id: string;
  userId: string;
  name: string;
  filters: JobSearchFilters;
  frequency: 'immediate' | 'daily' | 'weekly' | 'monthly';
  active: boolean;
  createdAt: string;
  lastSent?: string;
  jobCount?: number;
  email?: string;
  pushNotifications?: boolean;
}

export interface JobStats {
  totalJobs: number;
  jobsPostedToday: number;
  jobsPostedThisWeek: number;
  jobsPostedThisMonth: number;
  averageSalary?: number;
  totalCompanies: number;
  topCategories: Array<{
    category: string;
    count: number;
  }>;
  topLocations: Array<{
    location: string;
    count: number;
  }>;
  topSkills: Array<{
    skill: string;
    count: number;
  }>;
  jobTypeDistribution: Record<JobType, number>;
  experienceLevelDistribution: Record<ExperienceLevel, number>;
}

export type JobEventType = 
  | 'job_created'
  | 'job_updated'
  | 'job_expired'
  | 'job_filled'
  | 'application_received'
  | 'application_status_changed';

export interface JobEvent {
  id: string;
  type: JobEventType;
  jobId: string;
  applicationId?: string;
  timestamp: string;
  data: Record<string, any>;
  processed: boolean;
}