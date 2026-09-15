import React from 'react';
import { motion } from 'framer-motion';

const SECTION4_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4';

interface FeatureItem {
  title: string;
  desc: string;
}

const FEATURES: FeatureItem[] = [
  {
    title: 'Locked Liquidity',
    desc: 'Ensuring market stability and trust with 100B locked supply and zero dump risk.',
  },
  {
    title: 'Vested & Renounced',
    desc: 'Contract ownership renounced; no minting function or admin backdoor.',
  },
  {
    title: 'Daily Rewards',
    desc: '0.25% daily rewards automatically distributed to every token holder.',
  },
  {
    title: 'Community-First',
    desc: 'Transparent allocations and decentralized governance designed for users.',
  },
];

export const TechnologySection: React.FC = () => {
  return (
    <section
      id="solution"
      className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between px-8 sm:px-12 md:px-16 py-12 sm:py-16 bg-[#06152F] select-none"
    >
      {/* Background Video */}
      <video
        src={SECTION4_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
      />

      {/* Deep Space Navy overlay */}
      <div className="absolute inset-0 bg-[#06152F]/75 pointer-events-none" />

      {/* Top Area */}
      <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6 w-full">
        {/* Left Heading */}
        <motion.h2
          className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
          The Problem <br />
          <span className="text-[#168BFF]">&amp; Solution</span>
        </motion.h2>

        {/* Right Paragraph */}
        <motion.p
          className="text-[#C0C7D6] text-[13px] sm:text-[15px] leading-relaxed max-w-md md:text-right md:pt-2"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }}
        >
          Many blockchain projects fail due to unclear tokenomics, lack of
          transparency, or unsustainable reward systems. ELARA solves this with
          locked liquidity, vested allocations, zero inflation, and community-first
          growth.
        </motion.p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 w-full">
        {FEATURES.map((feat, i) => (
          <motion.div
            key={feat.title}
            className="border-t border-[#168BFF]/25 pt-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.3 + i * 0.1,
              ease: 'easeOut',
            }}
          >
            <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
              {feat.title}
            </h3>
            <p className="text-[#C0C7D6]/80 text-[12px] sm:text-[14px] leading-relaxed">
              {feat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechnologySection;
