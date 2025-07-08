import Link from 'next/link';
import { Twitter, Github, MessageCircle, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                VCR
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              The premier professional network for Web3. Connect, collaborate, and build the future of decentralized technology.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com/vcr_platform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/vcr-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/vcr-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://t.me/vcr_platform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/profile" className="text-gray-600 hover:text-gray-900 text-sm">
                  Build Profile
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-600 hover:text-gray-900 text-sm">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="/network" className="text-gray-600 hover:text-gray-900 text-sm">
                  Expand Network
                </Link>
              </li>
              <li>
                <Link href="/messages" className="text-gray-600 hover:text-gray-900 text-sm">
                  Messages
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">
                  About VCR
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-gray-900 text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-gray-900 text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-600 hover:text-gray-900 text-sm">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-gray-900 text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2024 Verified Chain Resume (VCR). All rights reserved.
            </div>
            <div className="text-sm text-gray-600">
              Built for the Web3 community with ❤️
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;