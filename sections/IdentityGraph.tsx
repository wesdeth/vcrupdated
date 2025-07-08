import React from 'react';
import { Eye } from 'lucide-react';

export default function IdentityGraph() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Column - Text Content */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-semibold text-[#1A1A1A]">
            Visualize Identity Graph
          </h2>
          <p className="text-base text-[#666666] leading-relaxed">
            Deep dive into Web3 identities and connections across digital space.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F46E5] text-white rounded-lg font-medium hover:bg-[#4338CA] transition-colors">
            <Eye size={20} />
            Visualize
          </button>
        </div>

        {/* Right Column - Visual Element */}
        <div className="flex-1 flex justify-center">
          <div className="w-48 h-48 bg-white/50 rounded-xl flex items-center justify-center shadow-sm">
            <Eye size={48} className="text-[#4F46E5]" />
          </div>
        </div>
      </div>
    </section>
  );
}