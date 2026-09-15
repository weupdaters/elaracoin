import React from 'react';
import { motion } from 'framer-motion';

interface LayerCard {
  layer: string;
  name: string;
  detail: string;
}

const LAYERS: LayerCard[] = [
  {
    layer: 'Pillar 1',
    name: 'Secure & Scalable Infrastructure',
    detail: 'Fixed 100B Locked Supply • Renounced',
  },
  {
    layer: 'Pillar 2',
    name: 'Rewarding Active Supporters',
    detail: '0.25% Daily Rewards to Every Holder',
  },
  {
    layer: 'Pillar 3',
    name: 'Open & Transparent Community',
    detail: '25% Presale Allocation • Soroban SAC',
  },
];

export const ArchitectureSection: React.FC = () => {
  return (
    <section
      id="vision"
      className="relative w-full min-h-screen bg-[#06152F] flex items-center justify-center select-none overflow-hidden"
    >
      {/* Ambient background navy-to-dark gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #06152F 0%, #030B17 100%)',
        }}
      />

      {/* Subtle Electric Blue Aura */}
      <div
        className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #168BFF 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-32 flex flex-col items-center text-center">
        {/* Heading block */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
          <p className="text-[#168BFF] text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8 font-semibold text-glow-electric">
            Vision &amp; Mission
          </p>

          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-8">
            Three pillars. Zero compromise.
          </h2>

          <p className="text-[#C0C7D6] text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            Our Vision is to build a decentralized ecosystem that empowers individuals
            and redefines how communities interact with digital assets. Combining
            innovation, security, and real utility in one unified platform.
          </p>
        </motion.div>

        {/* Layer cards */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-4 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
        >
          {LAYERS.map((item) => (
            <div
              key={item.layer}
              className="w-full max-w-lg h-auto py-4 border border-[#168BFF]/30 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 bg-[#030B17]/70 backdrop-blur-sm hover:border-[#168BFF] hover:shadow-[0_0_25px_rgba(22,139,255,0.35)] transition-all duration-300 gap-2"
            >
              <div className="flex flex-col sm:text-left">
                <span className="text-[#168BFF] text-[11px] tracking-[0.15em] uppercase font-mono font-medium">
                  {item.layer}
                </span>
                <span className="text-white text-[15px] sm:text-[17px] font-light">
                  {item.name}
                </span>
              </div>
              <span className="text-[#C0C7D6]/70 text-[11px] font-mono sm:text-right">
                {item.detail}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
