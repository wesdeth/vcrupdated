import { Search, Users, Briefcase, Award } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F1EB] to-[#E6F2FF]" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-6xl md:text-7xl font-bold text-[#1A1A1A] mb-6">
            Verified Chain
            <br />
            <span className="text-[#4F46E5]">Resume</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[#666666] mb-12 max-w-3xl mx-auto leading-relaxed">
            The professional network for Web3. Build your decentralized identity, 
            connect with Web3 professionals, and discover opportunities in the blockchain ecosystem.
          </p>
          
          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#666666] w-6 h-6" />
              <input
                type="text"
                placeholder="Search Web3 professionals, DAOs, or job opportunities..."
                className="w-full pl-16 pr-6 py-6 text-lg rounded-2xl border border-[#E5E7EB] bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#4F46E5] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#4338CA] transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4F46E5] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                Web3 Network
              </h3>
              <p className="text-[#666666]">
                Connect with builders, creators, and innovators across the decentralized ecosystem
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#8B5CF6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                Web3 Careers
              </h3>
              <p className="text-[#666666]">
                Discover job opportunities at leading Web3 companies and DAOs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                Verified Credentials
              </h3>
              <p className="text-[#666666]">
                Showcase your Web3 achievements, NFTs, POAPs, and on-chain reputation
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
            <Link
              href="/profile/edit"
              className="bg-[#4F46E5] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#4338CA] transition-colors"
            >
              Build Your VCR Profile
            </Link>
            <Link
              href="/jobs"
              className="border-2 border-[#4F46E5] text-[#4F46E5] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#4F46E5] hover:text-white transition-colors"
            >
              Explore Web3 Jobs
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1A1A1A]">10k+</div>
              <div className="text-[#666666]">Web3 Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1A1A1A]">500+</div>
              <div className="text-[#666666]">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1A1A1A]">2k+</div>
              <div className="text-[#666666]">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1A1A1A]">50k+</div>
              <div className="text-[#666666]">Verified Credentials</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;