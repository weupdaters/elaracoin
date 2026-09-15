import React, { useState, useEffect } from 'react';
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
      {/* Fixed Navbar with ELARA Logo and Section Links */}
      <Navbar entranceComplete={entranceComplete} />

      {/* Main Content: Exact 5 Original Sections */}
      <main>
        {/* Section 1: Hero Section with Mouse-Scrubbed Video / Cyber Character */}
        <HeroSection entranceComplete={entranceComplete} />

        {/* Section 2: Cinematic 3D Perspective Section (What Is ELARA?) */}
        <CinematicSection />

        {/* Section 3: Performance & Tokenomics Metrics (100B Locked, 0.25% Daily, 25% Presale) */}
        <MetricsSection />

        {/* Section 4: Technology & Solution (The Problem & Solution 4-Column Grid) */}
        <TechnologySection />

        {/* Section 5: Architecture (Vision & Mission 3 Pillars) */}
        <ArchitectureSection />
      </main>

      {/* Footer: Exact 2-Column Layout with Video #5 and Community Links */}
      <Footer />
    </div>
  );
};

export default App;
