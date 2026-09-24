import React from 'react';
import { motion } from 'framer-motion';

const METRICS_BG_IMAGE = '/assets/elara-metrics-bg.jpg';

interface MetricItem {
  value: string;
  label: string;
  sub: string;
  icon: string;
  badge: string;
  badgeColor: string;
}

const METRICS_DATA: MetricItem[] = [
  {
    value: '100B',
    label: 'Total Supply',
    sub: 'Permanently capped on-chain. Zero new minting & renounced.',
    icon: 'bi-lock-fill',
    badge: '100% LOCKED',
    badgeColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
  },
  {
    value: '0.25%',
    label: 'Daily Holder Rewards',
    sub: '91.25% APY distributed automatically to every holder wallet.',
    icon: 'bi-gift-fill',
    badge: 'AUTOMATED DAILY',
    badgeColor: 'text-[#00D2FF] bg-[#00D2FF]/15 border-[#00D2FF]/30',
  },
  {
    value: '25B',
    label: 'Presale Allocation',
    sub: '25% reserved pool for early community contributors.',
    icon: 'bi-rocket-takeoff-fill',
    badge: '25% RESERVED',
    badgeColor: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
  },
  {
    value: 'SAC',
    label: 'Soroban Smart Contract',
    sub: 'Stellar Asset Contract wrapper live on Protocol 20+.',
    icon: 'bi-cpu-fill',
    badge: 'PROTOCOL 20+',
    badgeColor: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
  },
];

export const MetricsSection: React.FC = () => {
  return (
    <section
      id="metrics"
      className="relative w-full min-h-screen py-20 sm:py-28 md:py-32 overflow-hidden flex items-center justify-center bg-[#06152F] select-none"
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
          src={METRICS_BG_IMAGE}
          alt="ELARA Holographic Tokenomics Core"
          className="w-full h-full object-cover object-center opacity-65"
        />

        {/* Deep Space Navy overlay for contrast and theme consistency */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(6, 21, 47, 0.78) 0%, rgba(3, 11, 23, 0.95) 100%)',
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

      {/* Ambient Electric Blue Glow */}
      <div
        className="absolute w-[300px] sm:w-[600px] h-[200px] sm:h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none opacity-30 z-10"
        style={{
          background: 'radial-gradient(circle, rgba(22, 139, 255, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-3.5 sm:px-6 md:px-12 flex flex-col items-center">
        {/* Header Block */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#168BFF]/20 border border-[#168BFF]/40 text-[#00D2FF] text-[11px] sm:text-xs font-mono font-semibold mb-3 sm:mb-4 shadow-[0_0_15px_rgba(22,139,255,0.3)]">
            <i className="bi bi-graph-up-arrow" />
            <span>TOKENOMICS &amp; PERFORMANCE</span>
          </div>

          <h2 className="text-white font-light text-[clamp(26px,5.5vw,52px)] leading-tight tracking-[-0.03em]">
            Engineered for <span className="text-[#168BFF] font-medium">Scarcity &amp; Yield</span>
          </h2>
          <p className="text-[#C0C7D6] text-xs sm:text-sm mt-2 sm:mt-3 font-mono">
            Every metric is mathematically fixed and enforced on the Stellar ledger.
          </p>
        </motion.div>

        {/* Metrics Grid: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {METRICS_DATA.map((item, index) => (
            <motion.div
              key={item.label}
              className="group relative flex flex-col justify-between p-5 sm:p-6 md:p-7 rounded-2xl bg-[#06152F]/75 backdrop-blur-xl border border-[#168BFF]/25 hover:border-[#168BFF] hover:shadow-[0_0_35px_rgba(22,139,255,0.35)] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
            >
              {/* Top Row: Icon + Badge */}
              <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#168BFF]/15 border border-[#168BFF]/30 flex items-center justify-center text-[#168BFF] text-base sm:text-lg group-hover:bg-[#168BFF] group-hover:text-white transition-colors duration-300">
                  <i className={`bi ${item.icon}`} />
                </div>
                <span className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              {/* Metric Value */}
              <div className="mb-2 sm:mb-3">
                <span className="text-white text-[clamp(34px,5vw,50px)] font-light tracking-[-0.03em] leading-none drop-shadow-[0_0_20px_rgba(22,139,255,0.4)] group-hover:text-[#00D2FF] transition-colors">
                  {item.value}
                </span>
              </div>

              {/* Label & Description */}
              <div>
                <h3 className="text-white text-sm sm:text-base font-medium tracking-tight mb-1">
                  {item.label}
                </h3>
                <p className="text-[#C0C7D6]/80 text-[11px] sm:text-xs leading-relaxed font-mono">
                  {item.sub}
                </p>
              </div>

              {/* Bottom Subtle Glowing accent bar */}
              <div className="mt-4 sm:mt-5 w-full h-[2px] bg-gradient-to-r from-transparent via-[#168BFF]/40 to-transparent group-hover:via-[#00D2FF] transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
