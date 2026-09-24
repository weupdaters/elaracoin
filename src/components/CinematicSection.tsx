import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const ABOUT_BG_IMAGE = '/assets/elara-about-bg.jpg';

export const CinematicSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 30,
    mass: 1.2,
  });

  const yScaleValue = useTransform(smoothProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full min-h-screen py-20 sm:py-28 md:py-32 overflow-hidden flex items-center justify-center bg-[#06152F] select-none"
    >
      {/* Background Graphic generated with Nano Banana */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img
          src={ABOUT_BG_IMAGE}
          alt="ELARA Planetary Cosmic Background"
          className="w-full h-full object-cover object-center pointer-events-none select-none opacity-80"
        />

        {/* Deep navy vignette overlay for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(6, 21, 47, 0.75) 0%, rgba(3, 11, 23, 0.95) 85%)',
          }}
        />
      </motion.div>

      {/* Top gradient blend */}
      <div
        className="absolute top-0 left-0 w-full h-[100px] sm:h-[140px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, #06152F 0%, transparent 100%)',
        }}
      />

      {/* Bottom gradient blend */}
      <div
        className="absolute bottom-0 left-0 w-full h-[100px] sm:h-[140px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, #06152F 0%, transparent 100%)',
        }}
      />

      {/* Ambient Electric Blue Glow */}
      <div
        className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none opacity-25 z-10"
        style={{
          background: 'radial-gradient(circle, #168BFF 0%, transparent 70%)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl px-4 sm:px-8 md:px-12 w-full flex flex-col items-center justify-center text-center">
        {/* Top Tag */}
        <motion.div
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#168BFF]/20 border border-[#168BFF]/40 text-[#00D2FF] text-[11px] sm:text-xs font-mono font-semibold mb-6 sm:mb-8 shadow-[0_0_15px_rgba(22,139,255,0.3)]"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <i className="bi bi-globe-americas" />
          <span>ABOUT ELARA ECOSYSTEM</span>
        </motion.div>

        {/* Copy text with smooth translateY on scroll */}
        <motion.p
          style={{ y: yScaleValue }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-sans font-normal text-[18px] sm:text-[24px] md:text-[32px] lg:text-[38px] text-white leading-[1.45] sm:leading-[1.35] tracking-[-0.02em] select-none text-center drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
        >
          ELARA is a next-generation blockchain project built with a clear vision: to
          create a transparent, community-driven, and sustainable digital ecosystem.{' '}
          <span className="text-[#168BFF] font-semibold">At ELARA,</span> we believe blockchain is
          not just about tokens — it’s about trust, freedom, and long-term value. Built on
          a fast and cost-efficient network, ELARA is more than a token — it’s a growing
          ecosystem powered by its community.
        </motion.p>

        {/* Highlight Pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 mt-8 sm:mt-12 w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#06152F]/80 border border-[#168BFF]/30 text-[11px] sm:text-xs font-mono text-[#C0C7D6] flex items-center gap-2">
            <span className="text-emerald-400">●</span> 100B Supply Locked
          </div>
          <div className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#06152F]/80 border border-[#168BFF]/30 text-[11px] sm:text-xs font-mono text-[#C0C7D6] flex items-center gap-2">
            <span className="text-[#00D2FF]">●</span> 0.25% Daily Yield
          </div>
          <div className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#06152F]/80 border border-[#168BFF]/30 text-[11px] sm:text-xs font-mono text-[#C0C7D6] flex items-center gap-2">
            <span className="text-[#168BFF]">●</span> Soroban SAC Protocol 20+
          </div>
          <div className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#06152F]/80 border border-[#168BFF]/30 text-[11px] sm:text-xs font-mono text-[#C0C7D6] flex items-center gap-2">
            <span className="text-purple-400">●</span> Renounced Issuer
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicSection;
