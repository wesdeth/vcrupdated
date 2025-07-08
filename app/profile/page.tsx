import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Users, Edit2, ExternalLink, Star, MessageCircle, Heart, Share2, Award, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Web3Experience {
  id: string
  title: string
  company: string
  duration: string
  description: string
  logo?: string
  isDao?: boolean
}

interface Web3Credential {
  id: string
  name: string
  issuer: string
  type: 'NFT' | 'POAP' | 'Certificate' | 'Badge'
  image: string
  verificationUrl?: string
  issuedDate: string
}

interface Skill {
  id: string
  name: string
  endorsements: number
}

interface ActivityPost {
  id: string
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  hasLiked: boolean
}

interface Contact {
  ens?: string
  walletAddress: string
  email?: string
  twitter?: string
  discord?: string
}

interface Recommendation {
  id: string
  recommender: {
    name: string
    title: string
    avatar: string
  }
  content: string
  date: string
}

interface UserProfile {
  name: string
  title: string
  location: string
  bio: string
  avatar: string
  coverPhoto: string
  connections: number
  experience: Web3Experience[]
  credentials: Web3Credential[]
  skills: Skill[]
  activity: ActivityPost[]
  contact: Contact
  recommendations: Recommendation[]
  joinDate: string
}

// Sample data
const profileData: UserProfile = {
  name: "Alexandra Chen",
  title: "Web3 Product Manager & DAO Contributor",
  location: "San Francisco, CA",
  bio: "Passionate about building decentralized products that empower communities. 5+ years in traditional tech, now fully committed to the Web3 ecosystem. Currently leading product strategy for emerging DeFi protocols and contributing to multiple DAOs.",
  avatar: "/placeholder-avatar.jpg",
  coverPhoto: "/placeholder-cover.jpg",
  connections: 847,
  joinDate: "March 2022",
  experience: [
    {
      id: "1",
      title: "Senior Product Manager",
      company: "Aave",
      duration: "Jan 2023 - Present",
      description: "Leading product development for Aave V4 protocol. Managing cross-functional teams to implement new lending features and improve user experience. Responsible for roadmap planning and stakeholder communication.",
      isDao: false
    },
    {
      id: "2", 
      title: "Core Contributor",
      company: "Uniswap DAO",
      duration: "Jun 2022 - Present",
      description: "Contributing to governance proposals and product strategy discussions. Active participant in community calls and working groups focused on protocol improvements and ecosystem growth.",
      isDao: true
    },
    {
      id: "3",
      title: "Product Manager",
      company: "MetaMask",
      duration: "Mar 2022 - Dec 2022",
      description: "Managed wallet UX improvements and new feature rollouts. Collaborated with engineering teams to implement portfolio tracking and DApp discovery features. Led user research initiatives.",
      isDao: false
    },
    {
      id: "4",
      title: "Product Manager",
      company: "Spotify",
      duration: "Jan 2020 - Feb 2022",
      description: "Led product initiatives for creator tools and artist monetization features. Managed product roadmap for 10M+ monthly active creators. Transitioned to Web3 after discovering DeFi and DAOs.",
      isDao: false
    }
  ],
  credentials: [
    {
      id: "1",
      name: "ETHGlobal Hackathon Winner",
      issuer: "ETHGlobal",
      type: "POAP",
      image: "/placeholder-poap.jpg",
      issuedDate: "Oct 2023",
      verificationUrl: "https://poap.gallery/event/123"
    },
    {
      id: "2",
      name: "Aave Contributor NFT",
      issuer: "Aave",
      type: "NFT",
      image: "/placeholder-nft.jpg",
      issuedDate: "Jan 2023"
    },
    {
      id: "3",
      name: "Product Management Certificate",
      issuer: "Stanford Online",
      type: "Certificate",
      image: "/placeholder-cert.jpg",
      issuedDate: "Dec 2021",
      verificationUrl: "https://verify.stanford.edu/cert/123"
    },
    {
      id: "4",
      name: "DeFi Native Badge",
      issuer: "DeFi Pulse",
      type: "Badge",
      image: "/placeholder-badge.jpg",
      issuedDate: "Aug 2022"
    }
  ],
  skills: [
    { id: "1", name: "Product Management", endorsements: 42 },
    { id: "2", name: "DeFi Protocols", endorsements: 38 },
    { id: "3", name: "DAO Governance", endorsements: 35 },
    { id: "4", name: "Smart Contracts", endorsements: 28 },
    { id: "5", name: "User Experience Design", endorsements: 31 },
    { id: "6", name: "Tokenomics", endorsements: 25 },
    { id: "7", name: "Community Building", endorsements: 33 },
    { id: "8", name: "Web3 Strategy", endorsements: 29 }
  ],
  activity: [
    {
      id: "1",
      content: "Excited to announce that our new lending pool proposal passed governance! This will enable more efficient capital allocation across the protocol. Thanks to everyone who participated in the discussion and voting process. 🚀",
      timestamp: "2 hours ago",
      likes: 47,
      comments: 12,
      shares: 8,
      hasLiked: false
    },
    {
      id: "2",
      content: "Just published a deep dive on cross-chain liquidity strategies. The future of DeFi is multi-chain, and we need better tools for capital efficiency across networks. What are your thoughts on the current state of bridge protocols?",
      timestamp: "1 day ago",
      likes: 93,
      comments: 28,
      shares: 15,
      hasLiked: true
    },
    {
      id: "3",
      content: "Attending DevCon this week! Always inspired by the innovation happening in our ecosystem. Looking forward to the governance andDAO track sessions. DM me if you want to connect!",
      timestamp: "3 days ago",
      likes: 156,
      comments: 34,
      shares: 22,
      hasLiked: false
    }
  ],
  contact: {
    ens: "alexandra.eth",
    walletAddress: "0x742d35Cc6634C0532925a3b8D42C68d8",
    email: "alex@defi.example",
    twitter: "@alexandra_web3",
    discord: "alexandra#1234"
  },
  recommendations: [
    {
      id: "1",
      recommender: {
        name: "Marcus Rodriguez",
        title: "Engineering Lead at Compound",
        avatar: "/placeholder-avatar-2.jpg"
      },
      content: "Alexandra is one of the most thoughtful product managers I've worked with in Web3. Her ability to balance technical constraints with user needs is exceptional. She played a crucial role in our v3 launch success.",
      date: "2 weeks ago"
    },
    {
      id: "2",
      recommender: {
        name: "Sarah Kim",
        title: "Head of Growth at Uniswap",
        avatar: "/placeholder-avatar-3.jpg"
      },
      content: "Alex brings incredible energy and insight to our DAO discussions. Her background in traditional product management combined with deep Web3 knowledge makes her contributions invaluable. Highly recommend!",
      date: "1 month ago"
    }
  ]
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Cover Photo Section */}
      <div className="relative">
        <div 
          className="h-64 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600"
          style={{
            backgroundImage: `url(${profileData.coverPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="absolute -bottom-16 left-8">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage src={profileData.avatar} alt={profileData.name} />
            <AvatarFallback className="text-2xl">{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>

        <div className="absolute top-4 right-4">
          <Link href="/profile/edit">
            <Button variant="secondary" className="bg-white/90 hover:bg-white">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Profile Info & Contact */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{profileData.name}</h1>
              <p className="text-lg text-indigo-600 font-medium mb-2">{profileData.title}</p>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Users className="w-4 h-4 mr-1" />
                <span>{profileData.connections.toLocaleString()} connections</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Joined {profileData.joinDate}</span>
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                {profileData.contact.ens && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ENS Name</span>
                    <span className="text-sm font-medium text-indigo-600">{profileData.contact.ens}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Wallet</span>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                    {profileData.contact.walletAddress}...
                  </span>
                </div>
                {profileData.contact.email && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email</span>
                    <span className="text-sm text-indigo-600">{profileData.contact.email}</span>
                  </div>
                )}
                {profileData.contact.twitter && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Twitter</span>
                    <span className="text-sm text-indigo-600">{profileData.contact.twitter}</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Skills & Endorsements</h3>
              <div className="grid grid-cols-1 gap-3">
                {profileData.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                      {skill.endorsements}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Middle & Right Columns - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* About Section */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
            </Card>

            {/* Experience Section */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Web3 Experience</h2>
              <div className="space-y-6">
                {profileData.experience.map((exp, index) => (
                  <div key={exp.id}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-8 h-8 bg-indigo-600 rounded"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                          {exp.isDao && (
                            <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                              DAO
                            </Badge>
                          )}
                        </div>
                        <p className="text-indigo-600 font-medium text-sm mb-1">{exp.company}</p>
                        <p className="text-gray-600 text-sm mb-2">{exp.duration}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                    {index < profileData.experience.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </Card>

            {/* Web3 Credentials */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Web3 Credentials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData.credentials.map((credential) => (
                  <div key={credential.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 text-sm truncate">{credential.name}</h4>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-xs text-gray-600 mb-1">by {credential.issuer}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {credential.type}
                          </Badge>
                          {credential.verificationUrl && (
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Activity Feed */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-6">
                {profileData.activity.map((post, index) => (
                  <div key={post.id}>
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={profileData.avatar} alt={profileData.name} />
                        <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="mb-2">
                          <span className="font-medium text-gray-900">{profileData.name}</span>
                          <span className="text-gray-600 text-sm ml-2">{post.timestamp}</span>
                        </div>
                        <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>
                        <div className="flex items-center space-x-6 text-gray-600">
                          <button className={`flex items-center space-x-1 text-sm hover:text-indigo-600 transition-colors ${post.hasLiked ? 'text-red-500' : ''}`}>
                            <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-current' : ''}`} />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-sm hover:text-indigo-600 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-sm hover:text-indigo-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span>{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    {index < profileData.activity.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h2>
              <div className="space-y-6">
                {profileData.recommendations.map((rec, index) => (
                  <div key={rec.id}>
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={rec.recommender.avatar} alt={rec.recommender.name} />
                        <AvatarFallback>{rec.recommender.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="mb-2">
                          <h4 className="font-medium text-gray-900">{rec.recommender.name}</h4>
                          <p className="text-sm text-gray-600">{rec.recommender.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{rec.date}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-700 text-sm leading-relaxed italic">"{rec.content}"</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < profileData.recommendations.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}