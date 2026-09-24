import React from 'react';
import { motion } from 'framer-motion';

const TECH_BG_IMAGE = '/assets/elara-technology-bg.jpg';

interface FeatureItem {
  step: string;
  title: string;
  desc: string;
  icon: string;
}

const FEATURES: FeatureItem[] = [
  {
    step: '01',
    title: 'Locked Liquidity',
    desc: 'Ensuring absolute market stability and trust with 100B locked supply and zero dump risk.',
    icon: 'bi-shield-lock-fill',
  },
  {
    step: '02',
    title: 'Vested & Renounced',
    desc: 'Issuer account permanently renounced; zero minting function or admin backdoors.',
    icon: 'bi-file-earmark-check-fill',
  },
  {
    step: '03',
    title: 'Daily Rewards',
    desc: '0.25% daily rewards automatically distributed to every token holder on the network.',
    icon: 'bi-lightning-charge-fill',
  },
  {
    step: '04',
    title: 'Community-First',
    desc: 'Transparent public allocations and decentralized governance designed for long-term growth.',
    icon: 'bi-people-fill',
  },
];

export const TechnologySection: React.FC = () => {
  return (
    <section
      id="solution"
      className="relative w-full min-h-screen py-20 sm:py-28 md:py-32 overflow-hidden flex flex-col justify-center bg-[#06152F] select-none"
    >
      {/* Background Graphic generated with Nano Banana */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <img
          src={TECH_BG_IMAGE}
          alt="ELARA Soroban Smart Contract Architecture"
          className="w-full h-full object-cover object-center opacity-60"
        />

        {/* Deep Space Navy overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(6, 21, 47, 0.80) 0%, rgba(3, 11, 23, 0.96) 100%)',
          }}
        />
      </motion.div>

      {/* Top and Bottom edge fades */}
      <div
        className="absolute top-0 left-0 w-full h-[100px] sm:h-[120px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, #06152F 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-[100px] sm:h-[120px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, #06152F 0%, transparent 100%)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-3.5 sm:px-6 md:px-12 flex flex-col justify-between">
        {/* Top Area: Problem & Solution Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-5 sm:gap-6 w-full mb-10 sm:mb-16">
          {/* Left Heading */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#168BFF]/20 border border-[#168BFF]/40 text-[#00D2FF] text-[11px] sm:text-xs font-mono font-semibold mb-3 sm:mb-4 shadow-[0_0_15px_rgba(22,139,255,0.3)]">
              <i className="bi bi-cpu-fill" />
              <span>THE ARCHITECTURE</span>
            </div>

            <h2 className="text-white font-light text-[clamp(28px,6vw,60px)] leading-[1.0] tracking-[-0.03em]">
              The Problem <br />
              <span className="text-[#168BFF] font-medium">&amp; Solution</span>
            </h2>
          </motion.div>

          {/* Right Paragraph */}
          <motion.p
            className="text-[#C0C7D6] text-[13px] sm:text-[15px] leading-relaxed max-w-lg lg:text-right"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Many blockchain projects suffer from unclear tokenomics, sudden mints, or
            unsustainable rewards. ELARA addresses this at the protocol level with 100B
            locked supply, renounced governance, automated daily rewards, and Soroban SAC
            interoperability.
          </motion.p>
        </div>

        {/* Bottom Feature Grid: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="group relative p-5 sm:p-6 md:p-7 rounded-2xl bg-[#06152F]/75 backdrop-blur-xl border border-[#168BFF]/25 hover:border-[#168BFF] hover:shadow-[0_0_30px_rgba(22,139,255,0.35)] transition-all duration-300 flex flex-col justify-between"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            >
              {/* Card Header: Step & Icon */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="font-mono text-xs font-bold text-[#168BFF] bg-[#168BFF]/15 px-2.5 py-1 rounded border border-[#168BFF]/30">
                  {feat.step}
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#168BFF]/15 border border-[#168BFF]/30 flex items-center justify-center text-[#168BFF] text-base sm:text-lg group-hover:bg-[#168BFF] group-hover:text-white transition-colors duration-300">
                  <i className={`bi ${feat.icon}`} />
                </div>
              </div>

              {/* Title & Desc */}
              <div>
                <h3 className="text-white text-base sm:text-lg font-medium tracking-tight mb-1.5 group-hover:text-[#00D2FF] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-[#C0C7D6]/80 text-xs sm:text-sm leading-relaxed font-mono">
                  {feat.desc}
                </p>
              </div>

              {/* Accent Line */}
              <div className="mt-4 sm:mt-6 w-full h-[1px] bg-gradient-to-r from-transparent via-[#168BFF]/30 to-transparent group-hover:via-[#168BFF] transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
