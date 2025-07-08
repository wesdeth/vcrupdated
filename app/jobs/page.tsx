import { Search, MapPin, Clock, DollarSign, Users, TrendingUp, Star, Heart, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  companyLogo: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  experience: 'Entry' | 'Mid' | 'Senior' | 'Lead'
  salary: string
  postedDate: string
  isRemote: boolean
  technologies: string[]
  featured: boolean
}

interface JobStats {
  totalJobs: number
  newToday: number
  remoteJobs: number
  avgSalary: string
}

const jobStats: JobStats = {
  totalJobs: 847,
  newToday: 23,
  remoteJobs: 612,
  avgSalary: "$95k"
}

const featuredJobs: Job[] = [
  {
    id: "1",
    title: "Senior Smart Contract Developer",
    company: "Chainlink Labs",
    companyLogo: "https://logo.clearbit.com/chainlinklabs.com",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Senior",
    salary: "$140k - $180k",
    postedDate: "2 days ago",
    isRemote: true,
    technologies: ["Solidity", "TypeScript", "Go"],
    featured: true
  },
  {
    id: "2",
    title: "DeFi Product Manager",
    company: "Uniswap",
    companyLogo: "https://logo.clearbit.com/uniswap.org",
    location: "New York, NY",
    type: "Full-time",
    experience: "Mid",
    salary: "$120k - $160k",
    postedDate: "1 day ago",
    isRemote: false,
    technologies: ["DeFi", "Product Strategy", "Analytics"],
    featured: true
  },
  {
    id: "3",
    title: "Frontend Developer - Web3 Wallet",
    company: "MetaMask",
    companyLogo: "https://logo.clearbit.com/metamask.io",
    location: "Remote",
    type: "Full-time",
    experience: "Mid",
    salary: "$100k - $140k",
    postedDate: "3 days ago",
    isRemote: true,
    technologies: ["React", "Web3.js", "TypeScript"],
    featured: false
  }
]

const allJobs: Job[] = [
  ...featuredJobs,
  {
    id: "4",
    title: "Blockchain Security Engineer",
    company: "OpenZeppelin",
    companyLogo: "https://logo.clearbit.com/openzeppelin.com",
    location: "Buenos Aires, AR",
    type: "Full-time",
    experience: "Senior",
    salary: "$110k - $150k",
    postedDate: "1 week ago",
    isRemote: true,
    technologies: ["Security", "Solidity", "Auditing"],
    featured: false
  },
  {
    id: "5",
    title: "NFT Platform Designer",
    company: "OpenSea",
    companyLogo: "https://logo.clearbit.com/opensea.io",
    location: "Los Angeles, CA",
    type: "Contract",
    experience: "Mid",
    salary: "$80k - $120k",
    postedDate: "4 days ago",
    isRemote: true,
    technologies: ["Figma", "NFTs", "UX Design"],
    featured: false
  },
  {
    id: "6",
    title: "DevOps Engineer - Infrastructure",
    company: "Polygon",
    companyLogo: "https://logo.clearbit.com/polygon.technology",
    location: "London, UK",
    type: "Full-time",
    experience: "Senior",
    salary: "$90k - $130k",
    postedDate: "5 days ago",
    isRemote: false,
    technologies: ["Kubernetes", "AWS", "Docker"],
    featured: false
  },
  {
    id: "7",
    title: "Data Scientist - DeFi Analytics",
    company: "Dune Analytics",
    companyLogo: "https://logo.clearbit.com/dune.com",
    location: "Oslo, NO",
    type: "Full-time",
    experience: "Mid",
    salary: "$85k - $115k",
    postedDate: "1 week ago",
    isRemote: true,
    technologies: ["Python", "SQL", "Analytics"],
    featured: false
  },
  {
    id: "8",
    title: "Community Manager",
    company: "Discord",
    companyLogo: "https://logo.clearbit.com/discord.com",
    location: "Austin, TX",
    type: "Full-time",
    experience: "Entry",
    salary: "$60k - $80k",
    postedDate: "3 days ago",
    isRemote: true,
    technologies: ["Community", "Social Media", "Content"],
    featured: false
  },
  {
    id: "9",
    title: "Rust Developer - Layer 2",
    company: "Arbitrum",
    companyLogo: "https://logo.clearbit.com/arbitrum.io",
    location: "Remote",
    type: "Full-time",
    experience: "Senior",
    salary: "$130k - $170k",
    postedDate: "6 days ago",
    isRemote: true,
    technologies: ["Rust", "Layer 2", "Blockchain"],
    featured: false
  }
]

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-200 bg-white">
      {job.featured && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-t-lg">
          <Star className="inline-block w-3 h-3 mr-1" />
          Featured
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-semibold text-sm">
                  {job.company.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {job.title}
              </CardTitle>
              <p className="text-gray-600 font-medium">{job.company}</p>
            </div>
          </div>
          <Badge variant={job.type === 'Remote' ? 'default' : 'secondary'} className="text-xs">
            {job.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600 space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{job.postedDate}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-sm">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-gray-900">{job.salary}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {job.technologies.slice(0, 3).map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Badge variant="outline" className={`text-xs ${
              job.experience === 'Entry' ? 'border-green-200 text-green-700' :
              job.experience === 'Mid' ? 'border-blue-200 text-blue-700' :
              job.experience === 'Senior' ? 'border-purple-200 text-purple-700' :
              'border-orange-200 text-orange-700'
            }`}>
              {job.experience} Level
            </Badge>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatsCard({ icon: Icon, label, value, color }: { 
  icon: any, 
  label: string, 
  value: string | number, 
  color: string 
}) {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Web3 Jobs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover your next opportunity in the decentralized world. Connect your VCR profile and get matched with top Web3 companies.
          </p>
          
          {/* Job Matching CTA */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-6 h-6" />
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Find Your Perfect Match</h3>
            <p className="text-purple-100 mb-4">
              Swipe through jobs that match your skills. Get discovered by top Web3 companies.
            </p>
            <Link href="/jobs/match">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                <Heart className="w-4 h-4 mr-2" />
                Start Job Matching
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            icon={Users}
            label="Total Jobs"
            value={jobStats.totalJobs}
            color="bg-indigo-600"
          />
          <StatsCard
            icon={TrendingUp}
            label="New Today"
            value={jobStats.newToday}
            color="bg-green-600"
          />
          <StatsCard
            icon={MapPin}
            label="Remote Jobs"
            value={jobStats.remoteJobs}
            color="bg-blue-600"
          />
          <StatsCard
            icon={DollarSign}
            label="Avg. Salary"
            value={jobStats.avgSalary}
            color="bg-purple-600"
          />
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border border-gray-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs, companies, skills..."
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              
              <select className="h-12 px-3 border border-gray-300 rounded-md text-gray-700 bg-white">
                <option>All Types</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Remote</option>
              </select>
              
              <select className="h-12 px-3 border border-gray-300 rounded-md text-gray-700 bg-white">
                <option>All Levels</option>
                <option>Entry</option>
                <option>Mid</option>
                <option>Senior</option>
                <option>Lead</option>
              </select>
              
              <select className="h-12 px-3 border border-gray-300 rounded-md text-gray-700 bg-white">
                <option>All Locations</option>
                <option>Remote</option>
                <option>San Francisco</option>
                <option>New York</option>
                <option>London</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Jobs */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Star className="w-5 h-5 text-amber-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* All Jobs */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Web3 Jobs</h2>
            <div className="text-sm text-gray-600">
              Showing {allJobs.length} of {jobStats.totalJobs} jobs
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
              Load More Jobs
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}