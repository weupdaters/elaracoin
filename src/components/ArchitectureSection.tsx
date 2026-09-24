import React from 'react';
import { motion } from 'framer-motion';

interface LayerCard {
  pillar: string;
  name: string;
  detail: string;
  icon: string;
}

const LAYERS: LayerCard[] = [
  {
    pillar: 'Pillar 01',
    name: 'Secure & Scalable Infrastructure',
    detail: 'Fixed 100B Locked Supply • Zero Inflation • Renounced Issuer',
    icon: 'bi-shield-check',
  },
  {
    pillar: 'Pillar 02',
    name: 'Rewarding Active Supporters',
    detail: '0.25% Daily Rewards Distributed Automatically to Every Holder',
    icon: 'bi-gift-fill',
  },
  {
    pillar: 'Pillar 03',
    name: 'Open & Transparent Community',
    detail: '25% Dedicated Presale Allocation • Soroban SAC Interoperability',
    icon: 'bi-diagram-3-fill',
  },
];

export const ArchitectureSection: React.FC = () => {
  return (
    <section
      id="vision"
      className="relative w-full min-h-screen py-20 sm:py-28 md:py-32 bg-[#06152F] flex items-center justify-center select-none overflow-hidden"
    >
      {/* Ambient background navy-to-dark gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #06152F 0%, #030B17 100%)',
        }}
      />

      {/* Cybernetic Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(22, 139, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 139, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Subtle Electric Blue Aura */}
      <div
        className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none opacity-25 z-[1]"
        style={{
          background: 'radial-gradient(circle, #168BFF 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-3.5 sm:px-6 md:px-8 flex flex-col items-center text-center">
        {/* Heading block */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#168BFF]/20 border border-[#168BFF]/40 text-[#00D2FF] text-[11px] sm:text-xs font-mono font-semibold mb-3 sm:mb-4 shadow-[0_0_15px_rgba(22,139,255,0.3)]">
            <i className="bi bi-compass-fill" />
            <span>VISION &amp; MISSION</span>
          </div>

          <h2 className="text-white font-light text-[clamp(26px,5.5vw,52px)] leading-[1.1] tracking-[-0.03em] mb-4 sm:mb-6">
            Three Pillars. <span className="text-[#168BFF] font-medium">Zero Compromise.</span>
          </h2>

          <p className="text-[#C0C7D6] text-[13px] sm:text-[15px] leading-relaxed max-w-xl mx-auto font-mono">
            Building a decentralized financial ecosystem that empowers individuals and
            redefines community trust. Real utility, fixed supply, and automatic daily yield.
          </p>
        </motion.div>

        {/* Pillar cards */}
        <motion.div
          className="mt-10 sm:mt-14 flex flex-col items-center gap-3.5 sm:gap-4 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }}
        >
          {LAYERS.map((item, index) => (
            <motion.div
              key={item.pillar}
              className="w-full p-4 sm:p-5 md:p-6 rounded-2xl bg-[#06152F]/80 backdrop-blur-xl border border-[#168BFF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-[#168BFF] hover:shadow-[0_0_30px_rgba(22,139,255,0.35)] transition-all duration-300"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Left Column: Icon + Pillar Tag + Name */}
              <div className="flex items-center gap-3 sm:gap-4 text-left">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#168BFF]/15 border border-[#168BFF]/30 flex items-center justify-center text-[#168BFF] text-lg sm:text-xl flex-shrink-0">
                  <i className={`bi ${item.icon}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#00D2FF] text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-mono font-bold">
                    {item.pillar}
                  </span>
                  <span className="text-white text-sm sm:text-base font-medium tracking-tight">
                    {item.name}
                  </span>
                </div>
              </div>

              {/* Right Column: Detail Badge */}
              <div className="sm:text-right">
                <span className="inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#030B17]/90 border border-[#168BFF]/20 text-[#C0C7D6] text-[11px] sm:text-xs font-mono">
                  {item.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
