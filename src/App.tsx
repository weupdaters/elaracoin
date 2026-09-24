import React, { useState, useEffect } from 'react';
import NanoBanner from './components/NanoBanner';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CinematicSection from './components/CinematicSection';
import MetricsSection from './components/MetricsSection';
import TechnologySection from './components/TechnologySection';
import ArchitectureSection from './components/ArchitectureSection';
import Footer from './components/Footer';

export const App: React.FC = () => {
  const [entranceComplete, setEntranceComplete] = useState<boolean>(false);

  useEffect(() => {
    // After 800ms delay, entranceComplete state becomes true
    const timer = setTimeout(() => {
      setEntranceComplete(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="bg-[#06152F] text-white min-h-screen selection:bg-[#168BFF] selection:text-white overflow-x-hidden"
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      {/* Top Fixed Header with Nano Announcement Banner & Navbar */}
      <div className="fixed top-0 left-0 w-full z-40 flex flex-col pointer-events-none">
        <NanoBanner />
        <Navbar entranceComplete={entranceComplete} />
      </div>

      {/* Main Content: Exact 5 Original Sections */}
      <main>
        {/* Section 1: Hero Section with Cyber Character and Parallax */}
        <HeroSection entranceComplete={entranceComplete} />

        {/* Section 2: Cinematic Section (What Is ELARA?) */}
        <CinematicSection />

        {/* Section 3: Performance & Tokenomics Metrics (100B Locked, 0.25% Daily, 25% Presale) */}
        <MetricsSection />

        {/* Section 4: Technology & Solution (The Problem & Solution 4-Column Cyber Grid) */}
        <TechnologySection />

        {/* Section 5: Architecture (Vision & Mission 3 Pillars) */}
        <ArchitectureSection />
      </main>

      {/* Footer: 2-Column Layout with Nano Banana Orbital Station and Community Links */}
      <Footer />
    </div>
  );
};

export default App;
