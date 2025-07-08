"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion, PanInfo, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Heart, 
  Info, 
  RotateCcw, 
  MapPin, 
  Building2, 
  Calendar, 
  Clock,
  Star,
  Users,
  Zap,
  MessageCircle,
  Video,
  CheckCircle2,
  Sparkles,
  DollarSign,
  Briefcase,
  ArrowLeft
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
    size: string;
    industry: string;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  workType: 'remote' | 'hybrid' | 'onsite';
  description: string;
  requirements: string[];
  skills: string[];
  benefits: string[];
  posted: string;
  experience: string;
  culture: {
    rating: number;
    highlights: string[];
  };
  matchScore: number;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Smart Contract Developer',
    company: {
      name: 'Chainlink Labs',
      logo: '/api/placeholder/100/100',
      size: '500-1000',
      industry: 'DeFi'
    },
    salary: { min: 140000, max: 180000, currency: 'USD' },
    location: 'San Francisco, CA',
    workType: 'remote',
    description: 'Join our innovative team building decentralized oracle networks that power the future of Web3. You\'ll be working on cutting-edge smart contracts that secure billions in value.',
    requirements: ['5+ years Solidity experience', 'Deep understanding of DeFi protocols', 'Experience with oracle networks'],
    skills: ['Solidity', 'TypeScript', 'Go', 'Web3.js', 'Hardhat'],
    benefits: ['Equity Package', 'Remote Work', 'Learning Budget', 'Conference Coverage'],
    posted: '2 days ago',
    experience: '5-7 years',
    culture: {
      rating: 4.9,
      highlights: ['Innovation focus', 'Top-tier compensation', 'Global impact']
    },
    matchScore: 95
  },
  {
    id: '2',
    title: 'Frontend Engineer - DeFi Protocol',
    company: {
      name: 'Uniswap',
      logo: '/api/placeholder/100/100',
      size: '100-500',
      industry: 'DeFi'
    },
    salary: { min: 120000, max: 160000, currency: 'USD' },
    location: 'New York, NY',
    workType: 'hybrid',
    description: 'Build the UI that powers the largest decentralized exchange. Create intuitive interfaces that make DeFi accessible to millions of users worldwide.',
    requirements: ['3+ years React experience', 'Web3 integration knowledge', 'DeFi protocol understanding'],
    skills: ['React', 'TypeScript', 'Web3.js', 'GraphQL', 'Styled Components'],
    benefits: ['Stock Options', 'Health Insurance', 'Flexible PTO', 'Team Retreats'],
    posted: '1 day ago',
    experience: '3-5 years',
    culture: {
      rating: 4.8,
      highlights: ['Work-life balance', 'Cutting-edge tech', 'Open source culture']
    },
    matchScore: 88
  },
  {
    id: '3',
    title: 'Product Designer - NFT Marketplace',
    company: {
      name: 'OpenSea',
      logo: '/api/placeholder/100/100',
      size: '200-500',
      industry: 'NFTs'
    },
    salary: { min: 110000, max: 150000, currency: 'USD' },
    location: 'Remote',
    workType: 'remote',
    description: 'Design the future of digital ownership. Create beautiful, functional interfaces for the world\'s largest NFT marketplace.',
    requirements: ['4+ years product design', 'NFT/Web3 experience', 'Figma expertise'],
    skills: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
    benefits: ['Remote First', 'Design Tools Budget', 'Professional Development', 'NFT Allowance'],
    posted: '3 days ago',
    experience: '4-6 years',
    culture: {
      rating: 4.7,
      highlights: ['Creative freedom', 'Remote culture', 'Industry leading']
    },
    matchScore: 82
  },
  {
    id: '4',
    title: 'DevOps Engineer - Layer 2',
    company: {
      name: 'Polygon',
      logo: '/api/placeholder/100/100',
      size: '500-1000',
      industry: 'Infrastructure'
    },
    salary: { min: 130000, max: 170000, currency: 'USD' },
    location: 'Austin, TX',
    workType: 'onsite',
    description: 'Scale Ethereum for the world. Build and maintain infrastructure that processes millions of transactions daily.',
    requirements: ['Kubernetes expertise', 'Blockchain infrastructure', 'CI/CD pipelines'],
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Go', 'Python'],
    benefits: ['Relocation Package', 'Stock Options', 'Tech Stipend', 'Gym Membership'],
    posted: '5 days ago',
    experience: '4-7 years',
    culture: {
      rating: 4.6,
      highlights: ['Scaling solutions', 'Technical excellence', 'Global team']
    },
    matchScore: 78
  },
  {
    id: '5',
    title: 'Community Manager - DeFi',
    company: {
      name: 'Aave',
      logo: '/api/placeholder/100/100',
      size: '100-200',
      industry: 'DeFi'
    },
    salary: { min: 70000, max: 100000, currency: 'USD' },
    location: 'London, UK',
    workType: 'hybrid',
    description: 'Build and nurture the Aave community. Engage with users, create content, and help grow the largest lending protocol in DeFi.',
    requirements: ['3+ years community management', 'DeFi knowledge', 'Social media expertise'],
    skills: ['Community Building', 'Social Media', 'Content Creation', 'Discord', 'Analytics'],
    benefits: ['Flexible Hours', 'Travel Budget', 'AAVE Tokens', 'Conference Coverage'],
    posted: '1 week ago',
    experience: '2-4 years',
    culture: {
      rating: 4.5,
      highlights: ['Community first', 'Growth opportunities', 'DeFi innovation']
    },
    matchScore: 74
  }
];

interface SwipeResult {
  type: 'like' | 'pass';
  jobId: string;
}

export default function JobMatchingPage() {
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [swipeResults, setSwipeResults] = useState<SwipeResult[]>([]);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [lastAction, setLastAction] = useState<'like' | 'pass' | null>(null);

  const currentJob = mockJobs[currentJobIndex];
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!currentJob) return;

    const isLike = direction === 'right';
    const targetX = direction === 'right' ? 300 : -300;

    // Animate the card out
    await controls.start({
      x: targetX,
      rotate: direction === 'right' ? 30 : -30,
      opacity: 0,
      transition: { duration: 0.3 }
    });

    // Record the swipe result
    const result: SwipeResult = {
      type: isLike ? 'like' : 'pass',
      jobId: currentJob.id
    };
    
    setSwipeResults(prev => [...prev, result]);
    setLastAction(isLike ? 'like' : 'pass');

    // Check for match (simulate 30% chance of match on like)
    if (isLike && Math.random() > 0.7) {
      setShowMatch(true);
    }

    // Move to next job
    setCurrentJobIndex(prev => prev + 1);
    
    // Reset card position
    x.set(0);
    controls.set({ x: 0, rotate: 0, opacity: 1 });
  };

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const threshold = 150;
    
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      await handleSwipe(direction);
    } else {
      // Spring back to center
      controls.start({
        x: 0,
        rotate: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      });
    }
  };

  const handleUndo = () => {
    if (currentJobIndex > 0 && swipeResults.length > 0) {
      setCurrentJobIndex(prev => prev - 1);
      setSwipeResults(prev => prev.slice(0, -1));
      setLastAction(null);
      x.set(0);
      controls.set({ x: 0, rotate: 0, opacity: 1 });
    }
  };

  const formatSalary = (job: Job) => {
    const { min, max, currency } = job.salary;
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k ${currency}`;
  };

  if (currentJobIndex >= mockJobs.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">All done for now! 🎉</h1>
          <p className="text-lg text-gray-600 max-w-md">
            You've swiped through all available jobs. Check back later for more opportunities!
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Liked {swipeResults.filter(r => r.type === 'like').length} jobs • 
              Passed on {swipeResults.filter(r => r.type === 'pass').length} jobs
            </p>
            <Button 
              onClick={() => {
                setCurrentJobIndex(0);
                setSwipeResults([]);
                setLastAction(null);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Start Over
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentJob) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-semibold text-gray-900">Job Match</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 py-2">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{currentJobIndex + 1} of {mockJobs.length}</span>
            <span>{Math.round(((currentJobIndex + 1) / mockJobs.length) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentJobIndex + 1) / mockJobs.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 pb-24">
        <div className="max-w-lg mx-auto relative">
          {/* Card Stack */}
          <div className="relative h-[600px]">
            <AnimatePresence>
              {mockJobs.slice(currentJobIndex, currentJobIndex + 2).map((job, index) => (
                <motion.div
                  key={job.id}
                  className="absolute inset-0"
                  style={{
                    x: index === 0 ? x : 0,
                    rotate: index === 0 ? rotate : 0,
                    opacity: index === 0 ? opacity : 1,
                    scale: index === 1 ? 0.95 : 1,
                    zIndex: index === 0 ? 2 : 1
                  }}
                  drag={index === 0 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={index === 0 ? handleDragEnd : undefined}
                  animate={index === 0 ? controls : undefined}
                >
                  <Card className="h-full bg-white shadow-xl border-0 overflow-hidden">
                    {/* Match Score */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {job.matchScore}% match
                      </div>
                    </div>

                    {/* Company Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                          <AvatarImage src={job.company.logo} alt={job.company.name} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg">
                            {job.company.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-900 leading-tight">{job.title}</h2>
                          <p className="text-gray-600 font-medium">{job.company.name}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {job.company.size} employees
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              {job.culture.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="p-6 space-y-4 overflow-y-auto flex-1">
                      {/* Salary & Location */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-medium text-green-700 uppercase">Salary</span>
                          </div>
                          <p className="font-semibold text-gray-900">{formatSalary(job)}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-medium text-blue-700 uppercase">Location</span>
                          </div>
                          <p className="font-semibold text-gray-900">{job.location}</p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs mt-1 ${
                              job.workType === 'remote' ? 'border-green-200 text-green-700' :
                              job.workType === 'hybrid' ? 'border-orange-200 text-orange-700' :
                              'border-blue-200 text-blue-700'
                            }`}
                          >
                            {job.workType}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">About this role</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {job.benefits.slice(0, 4).map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Culture Highlights */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Culture</h4>
                        <div className="space-y-1">
                          {job.culture.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Posted {job.posted}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.experience}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Swipe Indicators */}
                  {index === 0 && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-xl border-4 border-red-500 flex items-center justify-center pointer-events-none"
                        style={{
                          opacity: useTransform(x, [-150, -50], [1, 0])
                        }}
                      >
                        <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg transform -rotate-12">
                          PASS
                        </div>
                      </motion.div>
                      
                      <motion.div
                        className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-xl border-4 border-green-500 flex items-center justify-center pointer-events-none"
                        style={{
                          opacity: useTransform(x, [50, 150], [0, 1])
                        }}
                      >
                        <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg transform rotate-12">
                          LIKE
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-lg mx-auto flex justify-center gap-6">
          <Button
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600"
            onClick={() => handleSwipe('left')}
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600"
            onClick={handleUndo}
            disabled={currentJobIndex === 0}
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-12 h-12 rounded-full border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-600"
            onClick={() => setShowJobDetails(true)}
          >
            <Info className="w-5 h-5" />
          </Button>

          <Button
            size="lg"
            className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
            onClick={() => handleSwipe('right')}
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Match Dialog */}
      <Dialog open={showMatch} onOpenChange={setShowMatch}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">It's a Match! 🎉</h2>
              <p className="text-gray-600">
                You and <span className="font-semibold">{currentJob.company.name}</span> liked each other!
              </p>
            </div>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowMatch(false)}>
                Keep Swiping
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Details Dialog */}
      <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Job Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={currentJob.company.logo} />
                <AvatarFallback>{currentJob.company.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">{currentJob.title}</h3>
                <p className="text-gray-600">{currentJob.company.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Salary</h4>
                <p className="text-gray-600">{formatSalary(currentJob)}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Experience</h4>
                <p className="text-gray-600">{currentJob.experience}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Requirements</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {currentJob.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Benefits</h4>
              <div className="grid grid-cols-2 gap-2">
                {currentJob.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}