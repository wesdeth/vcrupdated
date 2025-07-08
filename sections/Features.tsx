"use client";

import Image from "next/image";

export default function Features() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-primary-text mb-6">
          Hiring sucks in Web3.
        </h2>
        <h2 className="text-4xl font-bold text-primary-text mb-8">
          We made it better. 🔥
        </h2>
        
        <p className="text-xl text-secondary-text max-w-4xl mx-auto mb-12">
          Finally, a professional network that actually works. VCR connects the best Web3 talent 
          with top companies through verified on-chain resumes and smart matching. No more endless 
          scrolling through irrelevant jobs or sketchy recruiters sliding into your DMs.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-platform-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-primary-text mb-2">
              Smart Job Matching
            </h3>
            <p className="text-secondary-text">
              Swipe through jobs that actually match your skills. No more wasting time on irrelevant positions.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-platform-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-xl font-semibold text-primary-text mb-2">
              Verified On-Chain Resume
            </h3>
            <p className="text-secondary-text">
              Your contributions, commits, and contracts speak louder than any traditional resume.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-platform-green rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold text-primary-text mb-2">
              Direct Connection
            </h3>
            <p className="text-secondary-text">
              Skip the middleman. Connect directly with hiring managers through secure XMTP messaging.
            </p>
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold text-primary-text mt-16">
          The only Web3 social network that pays your bills 💰
        </h3>
      </div>
    </section>
  );
}