import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import ProfileGrid from '@/components/sections/ProfileGrid';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1EB] to-[#E6F2FF]">
      <Hero />
      <Features />
      <ProfileGrid />
      <Footer />
    </div>
  );
}