export type UserRole = 'job_seeker' | 'recruiter';

export type UserStatus = 'active' | 'inactive' | 'pending';

export type WorkType = 'remote' | 'hybrid' | 'onsite';

export type ExperienceLevel = 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';

export type SalaryRange = {
  min: number;
  max: number;
  currency: string;
  period: 'hourly' | 'monthly' | 'yearly';
};

export type Web3Platform = {
  name: string;
  handle: string;
  url?: string;
  verified?: boolean;
};

export type ApplicationStatus = 'pending' | 'reviewed' | 'interview' | 'offered' | 'rejected' | 'accepted';

export interface BaseUser {
  id: string;
  address: string; // Wallet address
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  profile: UserProfile;
  ensName?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  bio?: string;
  avatar?: string;
  location?: string;
  skills: string[];
  experienceLevel: ExperienceLevel;
  portfolioLinks: string[];
  socialMedia: {
    web3Platforms: Web3Platform[];
    traditional?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
      website?: string;
    };
  };
  preferredWorkType: WorkType[];
  salaryExpectations?: SalaryRange;
}

export interface CompanyInfo {
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  industry: string;
  size: string; // e.g., "1-10", "11-50", "51-200", etc.
  location?: string;
  founded?: number;
  socialMedia?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    discord?: string;
  };
}

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  experienceLevel: ExperienceLevel;
  workType: WorkType;
  location?: string;
  salaryRange?: SalaryRange;
  benefits?: string[];
  isActive: boolean;
  applications: string[]; // Array of application IDs
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export interface CandidateSearch {
  id: string;
  query: string;
  skills: string[];
  experienceLevel?: ExperienceLevel;
  workType?: WorkType[];
  location?: string;
  salaryRange?: SalaryRange;
  results: string[]; // Array of user IDs
  createdAt: Date;
}

export interface Match {
  id: string;
  jobSeekerId: string;
  recruiterId: string;
  jobId?: string; // Optional if it's a general match
  score: number; // Matching score (0-100)
  status: 'pending' | 'viewed' | 'contacted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Recruiter extends BaseUser {
  role: 'recruiter';
  company: CompanyInfo;
  jobsPosted: JobPosting[];
  candidateSearches: CandidateSearch[];
  matches: Match[];
  subscription?: {
    plan: 'basic' | 'premium' | 'enterprise';
    expiresAt: Date;
    features: string[];
  };
}

export interface ResumeData {
  summary?: string;
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    isCurrent: boolean;
    description: string;
    achievements?: string[];
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    gpa?: number;
  }[];
  certifications?: {
    id: string;
    name: string;
    issuer: string;
    issueDate: Date;
    expiryDate?: Date;
    credentialUrl?: string;
  }[];
  projects?: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    githubUrl?: string;
    startDate: Date;
    endDate?: Date;
  }[];
}

export interface JobPreferences {
  desiredRoles: string[];
  industries: string[];
  workType: WorkType[];
  locations: string[];
  minSalary?: number;
  maxSalary?: number;
  currency: string;
  benefits: string[];
  companySize?: string[];
  isRemoteOnly: boolean;
  isOpenToRelocate: boolean;
  availabilityDate?: Date;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobSeekerId: string;
  recruiterId: string;
  status: ApplicationStatus;
  coverLetter?: string;
  resumeUrl?: string;
  portfolio?: string[];
  appliedAt: Date;
  updatedAt: Date;
  interviewNotes?: string;
  feedback?: string;
}

export interface JobSeeker extends BaseUser {
  role: 'job_seeker';
  resume: ResumeData;
  jobPreferences: JobPreferences;
  applications: JobApplication[];
  matches: Match[];
  savedJobs: string[]; // Array of job IDs
  profileViews: {
    viewerId: string;
    viewedAt: Date;
  }[];
  isOpenToWork: boolean;
}

export type User = Recruiter | JobSeeker;

// Utility types for creating and updating users
export type CreateUserInput = Omit<BaseUser, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateUserInput = Partial<Omit<BaseUser, 'id' | 'address' | 'role' | 'createdAt' | 'updatedAt'>>;

export type CreateRecruiterInput = Omit<Recruiter, 'id' | 'createdAt' | 'updatedAt' | 'jobsPosted' | 'candidateSearches' | 'matches'>;

export type CreateJobSeekerInput = Omit<JobSeeker, 'id' | 'createdAt' | 'updatedAt' | 'applications' | 'matches' | 'savedJobs' | 'profileViews'>;

// Search and filter types
export interface UserSearchFilters {
  role?: UserRole;
  status?: UserStatus;
  skills?: string[];
  experienceLevel?: ExperienceLevel;
  location?: string;
  workType?: WorkType;
  isVerified?: boolean;
  hasEns?: boolean;
}

export interface JobSearchFilters {
  skills?: string[];
  experienceLevel?: ExperienceLevel;
  workType?: WorkType;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  companySize?: string;
  industry?: string;
  isRemoteOnly?: boolean;
  postedWithinDays?: number;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}