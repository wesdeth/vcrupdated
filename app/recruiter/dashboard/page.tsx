"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Briefcase, 
  Eye, 
  Heart, 
  MessageCircle,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Star,
  MapPin,
  DollarSign,
  Building2,
  Zap,
  Calendar
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  skills: string[];
  experience: string;
  location: string;
  lookingForWork: boolean;
  matchScore: number;
  lastActive: string;
  portfolioUrl?: string;
  githubUrl?: string;
  socialLinks: {
    ens?: string;
    farcaster?: string;
    lens?: string;
    twitter?: string;
  };
}

interface Job {
  id: string;
  title: string;
  location: string;
  workType: 'remote' | 'hybrid' | 'onsite';
  salary: string;
  applicants: number;
  views: number;
  posted: string;
  status: 'active' | 'paused' | 'closed';
  skills: string[];
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'vitalik.eth',
    handle: '0xd8da...6045',
    avatar: 'https://euc.li/vitalik.eth',
    bio: 'Co-founder of Ethereum. Building the future of decentralized systems.',
    skills: ['Solidity', 'Go', 'Python', 'Blockchain Architecture', 'Cryptography'],
    experience: '10+ years',
    location: 'Global',
    lookingForWork: false,
    matchScore: 98,
    lastActive: '2 hours ago',
    portfolioUrl: 'https://vitalik.ca',
    githubUrl: 'https://github.com/vbuterin',
    socialLinks: {
      ens: 'vitalik.eth',
      twitter: '@VitalikButerin'
    }
  },
  {
    id: '2',
    name: 'nick.eth',
    handle: '0xb8c2...67d5',
    avatar: 'https://cdn.simplehash.com/assets/102401925f00ab7f22572eb5c91a97930b87864cd61f0546c8974aee6e7ce7bc.png',
    bio: 'Lead developer of ENS & Ethereum Foundation alum. Certified rat tickler.',
    skills: ['Solidity', 'JavaScript', 'Smart Contracts', 'DNS', 'Go'],
    experience: '8+ years',
    location: 'London, UK',
    lookingForWork: true,
    matchScore: 94,
    lastActive: '1 day ago',
    githubUrl: 'https://github.com/arachnid',
    socialLinks: {
      ens: 'nick.eth',
      twitter: '@arachnid'
    }
  },
  {
    id: '3',
    name: 'luc.eth',
    handle: 'luc.eth',
    avatar: 'https://gateway.pinata.cloud/ipfs/bafkreifnrjhkl7ccr2ifwn2n7ap6dh2way25a6w5x2szegvj5pt4b5nvfu',
    bio: 'Create Epic Shit, DevRel @ ENS, Researcher @ V3X',
    skills: ['React', 'TypeScript', 'Web3.js', 'DevRel', 'Technical Writing'],
    experience: '5+ years',
    location: 'Remote',
    lookingForWork: true,
    matchScore: 89,
    lastActive: '3 hours ago',
    portfolioUrl: 'https://luc.xyz',
    socialLinks: {
      ens: 'luc.eth',
      farcaster: 'luc'
    }
  },
  {
    id: '4',
    name: 'sio.eth',
    handle: '0xd5fb...24f5',
    avatar: 'https://cdn.simplehash.com/assets/966476fc90b72b1369eb0f301f1448789ec66915cdf99631f39099269c72d043.png',
    bio: 'Product Designer at Aragon ⟡ Cyclist ⟡ Music Nerd',
    skills: ['Figma', 'Product Design', 'UX Research', 'Design Systems', 'Web3 UX'],
    experience: '6+ years',
    location: 'Barcelona, Spain',
    lookingForWork: false,
    matchScore: 87,
    lastActive: '1 hour ago',
    portfolioUrl: 'https://sio.design',
    socialLinks: {
      ens: 'sio.eth',
      lens: 'sio.lens'
    }
  },
  {
    id: '5',
    name: 'ace.eth',
    handle: '0xe978...80ca',
    avatar: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/4e69a13e-7fe7-49fa-5885-6da6706a3000/original',
    bio: 'building @perl & @offmarket | fid #539 | resuming /cheesecoin once we hit pmf 🎯',
    skills: ['Rust', 'Solidity', 'Backend', 'DeFi', 'Protocol Design'],
    experience: '4+ years',
    location: 'San Francisco, CA',
    lookingForWork: true,
    matchScore: 85,
    lastActive: '2 days ago',
    githubUrl: 'https://github.com/ace',
    socialLinks: {
      farcaster: 'ace'
    }
  }
];

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Smart Contract Developer',
    location: 'Remote',
    workType: 'remote',
    salary: '$140k - $180k',
    applicants: 23,
    views: 156,
    posted: '2 days ago',
    status: 'active',
    skills: ['Solidity', 'TypeScript', 'DeFi']
  },
  {
    id: '2',
    title: 'Frontend Engineer - DeFi',
    location: 'New York, NY',
    workType: 'hybrid',
    salary: '$120k - $160k',
    applicants: 18,
    views: 234,
    posted: '1 week ago',
    status: 'active',
    skills: ['React', 'Web3.js', 'TypeScript']
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    location: 'Austin, TX',
    workType: 'onsite',
    salary: '$110k - $150k',
    applicants: 12,
    views: 98,
    posted: '3 days ago',
    status: 'paused',
    skills: ['Docker', 'Kubernetes', 'AWS']
  }
];

const stats = {
  totalCandidates: 1247,
  activeJobs: 8,
  totalApplications: 156,
  responseRate: 78
};

export default function RecruiterDashboard() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'candidates' | 'jobs' | 'matches'>('candidates');

  const CandidateCard = ({ candidate }: { candidate: Candidate }) => {
    return (
      <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 bg-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                <p className="text-sm text-gray-600">{candidate.handle}</p>
                <p className="text-xs text-gray-500 mt-1">Active {candidate.lastActive}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Zap className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-gray-900">{candidate.matchScore}%</span>
              </div>
              {candidate.lookingForWork && (
                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 text-xs">
                  Open to work
                </Badge>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{candidate.bio}</p>

          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{candidate.location}</span>
            <span className="mx-2">•</span>
            <span>{candidate.experience}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {candidate.skills.slice(0, 3).map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCandidate(candidate);
                }}
                className="text-xs"
              >
                <Eye className="w-3 h-3 mr-1" />
                View Profile
              </Button>
              <Button
                size="sm"
                className="text-xs bg-blue-600 hover:bg-blue-700"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Contact
              </Button>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const JobCard = ({ job }: { job: Job }) => {
    return (
      <Card className="border border-gray-200 bg-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{job.location}</span>
                <Badge 
                  variant="outline" 
                  className={`ml-2 text-xs ${
                    job.workType === 'remote' ? 'border-green-200 text-green-700' :
                    job.workType === 'hybrid' ? 'border-orange-200 text-orange-700' :
                    'border-blue-200 text-blue-700'
                  }`}
                >
                  {job.workType}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                <span className="font-semibold">{job.salary}</span>
              </div>
            </div>
            <Badge 
              variant={job.status === 'active' ? 'default' : 'secondary'}
              className={`${
                job.status === 'active' ? 'bg-green-100 text-green-800' :
                job.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              {job.status}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {job.skills.map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">{job.applicants}</div>
              <div className="text-xs text-gray-600">Applicants</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{job.views}</div>
              <div className="text-xs text-gray-600">Views</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Posted</div>
              <div className="text-xs font-medium text-gray-900">{job.posted}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs flex-1">
              Edit Job
            </Button>
            <Button size="sm" className="text-xs flex-1 bg-blue-600 hover:bg-blue-700">
              View Applications
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruiter Dashboard</h1>
          <p className="text-gray-600">Manage your job postings and discover top Web3 talent</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalCandidates}</div>
                  <div className="text-sm text-gray-600">Total Candidates</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.activeJobs}</div>
                  <div className="text-sm text-gray-600">Active Jobs</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
                  <div className="text-sm text-gray-600">Applications</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.responseRate}%</div>
                  <div className="text-sm text-gray-600">Response Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'candidates', label: 'Candidates', icon: Users },
              { id: 'jobs', label: 'My Jobs', icon: Briefcase },
              { id: 'matches', label: 'Matches', icon: Heart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-1 py-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder={
                  activeTab === 'candidates' ? "Search candidates by skills, name, or location..." :
                  activeTab === 'jobs' ? "Search your jobs..." :
                  "Search matches..."
                }
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            {activeTab === 'jobs' && (
              <Button onClick={() => setShowJobForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'candidates' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
            <p className="text-gray-600">
              When candidates and your jobs match, they'll appear here.
            </p>
          </div>
        )}

        {/* Candidate Profile Modal */}
        <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedCandidate && (
              <>
                <DialogHeader>
                  <DialogTitle>Candidate Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedCandidate.avatar} />
                      <AvatarFallback>{selectedCandidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{selectedCandidate.name}</h3>
                      <p className="text-gray-600 mb-2">{selectedCandidate.handle}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{selectedCandidate.location}</span>
                        <span>•</span>
                        <span>{selectedCandidate.experience}</span>
                        <div className="flex items-center gap-1 ml-auto">
                          <Zap className="w-4 h-4 text-green-500" />
                          <span className="font-semibold">{selectedCandidate.matchScore}% match</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-gray-600">{selectedCandidate.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Links</h4>
                    <div className="space-y-2">
                      {selectedCandidate.portfolioUrl && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <a href={selectedCandidate.portfolioUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Portfolio
                          </a>
                        </div>
                      )}
                      {selectedCandidate.githubUrl && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <a href={selectedCandidate.githubUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            GitHub
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Call
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Job Form Modal */}
        <Dialog open={showJobForm} onOpenChange={setShowJobForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Post New Job</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <Input placeholder="e.g. Senior Smart Contract Developer" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <Input placeholder="e.g. San Francisco, CA" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work Type
                  </label>
                  <select className="w-full h-10 px-3 border border-gray-300 rounded-md">
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Salary
                  </label>
                  <Input placeholder="e.g. $120k" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Salary
                  </label>
                  <Input placeholder="e.g. $180k" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <Textarea 
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Skills (comma-separated)
                </label>
                <Input placeholder="e.g. Solidity, TypeScript, React, Web3.js" />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={() => setShowJobForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Post Job
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}