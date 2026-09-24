import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from './ScrambleIn';

interface HeroSectionProps {
  entranceComplete: boolean;
}

const HERO_BG_IMAGE = '/assets/hero-bg.png';
const HERO_CHARACTER_IMAGE = '/assets/astronaut-character.png';

export const HeroSection: React.FC<HeroSectionProps> = ({ entranceComplete }) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Only track mouse on devices with fine pointer (mouse) to avoid touch scroll jitter
    if (window.matchMedia('(pointer: fine)').matches) {
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setMousePos({ x, y });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col justify-between select-none bg-[#06152F]">
      {/* Background Cosmic Landscape with subtle mouse parallax */}
      <motion.div
        className="absolute -inset-4 pointer-events-none z-0 overflow-hidden"
        animate={{
          x: -mousePos.x * 10,
          y: -mousePos.y * 6,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 60 }}
      >
        <img
          src={HERO_BG_IMAGE}
          alt="ELARA Space Background"
          className="w-full h-full object-cover object-center scale-105 select-none pointer-events-none"
        />

        {/* Dynamic Dark Gradient Overlay for optimal contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(3, 11, 23, 0.84) 0%, rgba(6, 21, 47, 0.65) 45%, rgba(3, 11, 23, 0.95) 100%)',
          }}
        />
      </motion.div>

      {/* Electric Blue Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: 'radial-gradient(rgba(22, 139, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.15,
        }}
      />

      {/* Ambient Celestial Glow behind Astronaut */}
      <div
        className="absolute w-[280px] sm:w-[480px] md:w-[680px] h-[280px] sm:h-[480px] md:h-[680px] top-[40%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] sm:blur-[140px] pointer-events-none opacity-40 z-[1]"
        style={{
          background:
            'radial-gradient(circle, #168BFF 0%, rgba(0, 210, 255, 0.35) 45%, transparent 70%)',
        }}
      />

      {/* Large background watermark text: ELARA */}
      <motion.div
        className="absolute left-1/2 pointer-events-none uppercase font-anton whitespace-nowrap select-none z-[2]"
        style={{
          top: 'clamp(20%, 35vh, 50%)',
          fontSize: 'clamp(80px, 24vw, 480px)',
          letterSpacing: '-2px',
          opacity: 0.09,
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(22, 139, 255, 0.5) 60%, rgba(6, 21, 47, 0.1) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          lineHeight: 0.8,
        }}
        animate={{
          x: `calc(-50% + ${-mousePos.x * 10}px)`,
          y: `calc(-50% + ${-mousePos.y * 6}px)`,
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
          className="relative w-full h-full flex items-center justify-center pt-16 md:pt-0"
          animate={{
            x: mousePos.x * 16,
            y: mousePos.y * 10,
            rotateY: mousePos.x * 4,
            rotateX: -mousePos.y * 4,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 70, mass: 0.8 }}
        >
          <motion.img
            src={HERO_CHARACTER_IMAGE}
            alt="ELARA Astronaut Character"
            className="w-full h-full object-contain max-h-[42vh] sm:max-h-[55vh] md:max-h-[85vh] lg:max-h-[92vh] object-center pointer-events-none select-none drop-shadow-[0_15px_50px_rgba(22,139,255,0.45)]"
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
        className="relative z-20 w-full flex-1 flex flex-col justify-between px-3.5 sm:px-6 md:px-12 pt-24 sm:pt-28 pb-6 sm:pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        {/* Top spacer for desktop */}
        <div className="hidden md:block flex-1" />

        {/* Bottom Interactive Row */}
        <div className="w-full flex flex-col gap-5 md:flex-row md:items-end md:justify-between mt-auto">
          {/* Left Column: Heading + Tag + Description + CTAs */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-xl bg-[#030B17]/75 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-4 sm:p-5 md:p-0 rounded-2xl border border-[#168BFF]/25 md:border-none shadow-xl md:shadow-none">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#168BFF]/20 border border-[#168BFF]/45 text-[#00D2FF] text-[11px] sm:text-xs font-mono font-semibold w-fit shadow-[0_0_15px_rgba(22,139,255,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D2FF]" />
              </span>
              <span>Built on Soroban Smart Contracts</span>
            </div>

            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(32px,8vw,86px)] drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
              <ScrambleIn text="ELARA" delay={200} triggered={entranceComplete} />
              <br />
              <span className="text-[#168BFF] font-medium drop-shadow-[0_0_30px_rgba(22,139,255,0.6)]">
                <ScrambleIn text="Network" delay={500} triggered={entranceComplete} />
              </span>
            </h1>

            <motion.p
              className="max-w-md text-[13px] sm:text-[15px] text-[#C0C7D6] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              initial={{ y: 20, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
            >
              Next-generation decentralized finance on Stellar &amp; Soroban. 100 Billion
              locked supply with automated 0.25% daily holder rewards and renounced issuer.
            </motion.p>

            {/* Quick CTAs: Stacked full-width on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 pointer-events-auto">
              <a
                href="https://t.me/elaratoken"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 sm:h-12 px-5 sm:px-6 rounded-full bg-gradient-to-r from-white via-[#E2E8F0] to-[#C0C7D6] border border-[#168BFF]/40 text-[#06152F] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(22,139,255,0.35)] hover:shadow-[0_0_30px_rgba(22,139,255,0.6)] transition-all no-underline cursor-pointer"
              >
                <i className="bi bi-rocket-takeoff-fill text-[#168BFF]" />
                <span>Join 25% Presale</span>
              </a>

              <a
                href="https://stellar.expert/explorer/public/asset/ELARA-GB3WVZRQB2MXRFD4J3JV3OZH5K6V7WPKIKVMONOKXN3QV2QTVHNMAGVG"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 sm:h-12 px-4 sm:px-5 rounded-full bg-[#06152F]/90 hover:bg-[#168BFF]/25 border border-[#168BFF]/40 text-[#C0C7D6] hover:text-white font-mono text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all no-underline"
              >
                <span>StellarExpert Explorer</span>
                <i className="bi bi-arrow-up-right text-[11px] text-[#00D2FF]" />
              </a>
            </div>
          </div>

          {/* Right Column: 100B Locked Stat Card */}
          <div className="text-left md:text-right bg-[#030B17]/75 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-4 sm:p-5 md:p-0 rounded-2xl border border-[#168BFF]/25 md:border-none shadow-xl md:shadow-none">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-[11px] font-mono mb-2">
              <i className="bi bi-lock-fill" />
              <span>ON-CHAIN VERIFIED</span>
            </div>

            <h2 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(32px,7vw,80px)]">
              <ScrambleIn text="100B" delay={700} triggered={entranceComplete} />
              <br />
              <span className="text-emerald-400 font-medium drop-shadow-[0_0_25px_rgba(52,211,153,0.4)]">
                <ScrambleIn text="Locked" delay={1000} triggered={entranceComplete} />
              </span>
            </h2>

            <p className="text-[11px] sm:text-xs font-mono text-[#C0C7D6]/80 mt-1 sm:mt-2">
              Fixed Supply • Zero Inflation • Renounced
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
