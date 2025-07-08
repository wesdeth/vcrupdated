"use client";
import Link from 'next/link';
import { Search, User, Briefcase, Users, Bell, MessageCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
              VCR
            </div>
            <span className="ml-2 text-sm text-gray-600 font-medium">vcr.eth</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Web3 professionals, companies, jobs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="flex flex-col items-center text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Users className="w-6 h-6" />
              <span className="text-xs mt-1">Network</span>
            </Link>
            
            <Link 
              href="/jobs" 
              className="flex flex-col items-center text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Briefcase className="w-6 h-6" />
              <span className="text-xs mt-1">Jobs</span>
            </Link>

            <Link 
              href="/messages" 
              className="flex flex-col items-center text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs mt-1">Messages</span>
            </Link>

            <Link 
              href="/notifications" 
              className="flex flex-col items-center text-gray-600 hover:text-indigo-600 transition-colors relative"
            >
              <Bell className="w-6 h-6" />
              <span className="text-xs mt-1">Notifications</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">Your VCR Profile</p>
                    <p className="text-sm text-gray-600">Build your Web3 professional presence</p>
                  </div>
                  
                  <Link 
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    View Profile
                  </Link>
                  
                  <Link 
                    href="/profile/edit"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Edit Profile
                  </Link>
                  
                  <Link 
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Settings & Privacy
                  </Link>
                  
                  <hr className="my-2" />
                  
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;