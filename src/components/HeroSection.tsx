import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from './ScrambleIn';

interface HeroSectionProps {
  entranceComplete: boolean;
}

const HERO_BG_IMAGE = '/assets/ChatGPT Image Sep 6, 2026, 05_20_13 PM.png';
const HERO_CHARACTER_IMAGE = '/assets/astronaut-character.png';

export const HeroSection: React.FC<HeroSectionProps> = ({ entranceComplete }) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const x = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        const y = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col select-none bg-[#06152F]">
      {/* Background Cosmic Landscape with subtle mouse parallax */}
      <motion.div
        className="absolute -inset-4 pointer-events-none z-0 overflow-hidden"
        animate={{
          x: -mousePos.x * 12,
          y: -mousePos.y * 8,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 60 }}
      >
        <img
          src={HERO_BG_IMAGE}
          alt="ELARA Space Background"
          className="w-full h-full object-cover object-center scale-105 select-none pointer-events-none"
        />

        {/* Dark Black 0.9 (90%) Overlay for high contrast between astronaut and background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.88) 0%, rgba(2, 6, 18, 0.90) 50%, rgba(6, 21, 47, 0.92) 100%)',
          }}
        />
      </motion.div>

      {/* Electric Blue Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: 'radial-gradient(rgba(22, 139, 255, 0.25) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.12,
        }}
      />

      {/* Ambient Celestial Glow behind Astronaut */}
      <div
        className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] pointer-events-none opacity-30 z-[1]"
        style={{
          background:
            'radial-gradient(circle, #168BFF 0%, rgba(22, 139, 255, 0.35) 50%, transparent 70%)',
        }}
      />

      {/* Large background watermark text: ELARA in Anton SC with subtle parallax */}
      <motion.div
        className="absolute left-1/2 pointer-events-none uppercase font-anton whitespace-nowrap select-none z-[2]"
        style={{
          top: 'calc(50% + 50px)',
          fontSize: 'clamp(140px, 32vw, 550px)',
          letterSpacing: '-4px',
          opacity: 0.12,
          background:
            'linear-gradient(180deg, rgba(226, 232, 240, 0.3) 0%, rgba(22, 139, 255, 0.45) 60%, rgba(6, 21, 47, 0.1) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          lineHeight: 0.8,
        }}
        animate={{
          x: `calc(-50% + ${-mousePos.x * 12}px)`,
          y: `calc(-50% + ${-mousePos.y * 8}px)`,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 60 }}
      >
        ELARA
      </motion.div>

      {/* Centered Futuristic Astronaut Character with 3D Parallax Tilt */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3] overflow-hidden"
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          animate={{
            x: mousePos.x * 20,
            y: mousePos.y * 14,
            rotateY: mousePos.x * 5,
            rotateX: -mousePos.y * 5,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 70, mass: 0.8 }}
        >
          <motion.img
            src={HERO_CHARACTER_IMAGE}
            alt="ELARA Astronaut Character"
            className="w-full h-full object-contain max-h-[88vh] sm:max-h-[92vh] md:max-h-[96vh] object-center pointer-events-none select-none drop-shadow-[0_15px_50px_rgba(22,139,255,0.3)]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: entranceComplete ? 1 : 0,
              scale: entranceComplete ? 1 : 0.94,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </motion.div>
      </div>

      {/* Content Layout */}
      <motion.div
        className="relative z-20 w-full h-full flex flex-col justify-between px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 pb-8 sm:pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        {/* Top spacer */}
        <div className="flex-1" />

        {/* Bottom Row */}
        <div className="w-full flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Left Column */}
          <div className="flex flex-col gap-4 max-w-xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#168BFF]/15 border border-[#168BFF]/40 text-[#168BFF] text-xs font-mono font-semibold w-fit shadow-[0_0_15px_rgba(22,139,255,0.2)]">
              <span>⚡ Built on Soroban Smart Contracts</span>
            </div>

            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="ELARA" delay={200} triggered={entranceComplete} />
              <br />
              <span className="text-[#168BFF]">
                <ScrambleIn text="Network" delay={500} triggered={entranceComplete} />
              </span>
            </h1>

            <motion.p
              className="max-w-md text-[13px] sm:text-[15px] text-[#C0C7D6] leading-relaxed"
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
            >
              Building the future of decentralized finance with transparency, security, and
              real-world utility. 100 Billion locked supply with automated 0.25% daily
              holder rewards.
            </motion.p>
          </div>

          {/* Right Column */}
          <div className="text-left md:text-right">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="100B" delay={700} triggered={entranceComplete} />
              <br />
              <span className="text-emerald-400">
                <ScrambleIn text="Locked" delay={1000} triggered={entranceComplete} />
              </span>
            </h1>
            <p className="text-xs font-mono text-[#C0C7D6]/70 mt-2">
              Fixed Supply • Zero Inflation • Renounced
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
