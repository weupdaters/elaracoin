import React from 'react';
import { motion } from 'framer-motion';

const SECTION3_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4';

interface MetricItem {
  value: string;
  label: string;
  sub?: string;
}

const METRICS_DATA: MetricItem[] = [
  {
    value: '100B',
    label: 'Total Supply (Locked)',
    sub: 'Zero Mint • Renounced Issuer',
  },
  {
    value: '0.25%',
    label: 'Daily Holder Rewards',
    sub: 'Automated Daily Distribution',
  },
  {
    value: '25%',
    label: 'Presale Allocation',
    sub: '25 Billion Pool Reserved',
  },
];

export const MetricsSection: React.FC = () => {
  return (
    <section
      id="metrics"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#06152F] select-none"
    >
      {/* Background Video */}
      <video
        src={SECTION3_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
      />

      {/* Deep Space Navy overlay for contrast and theme consistency */}
      <div className="absolute inset-0 bg-[#06152F]/80 pointer-events-none" />

      {/* Ambient Electric Blue Glow */}
      <div
        className="absolute w-[600px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(22, 139, 255, 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-32 pb-32 px-6 flex flex-col items-center">
        {/* Subtitle in Electric Blue */}
        <motion.p
          className="text-[#168BFF] text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center font-semibold text-glow-electric"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          Tokenomics &amp; Performance
        </motion.p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 w-full text-center">
          {METRICS_DATA.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
            >
              <span className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none drop-shadow-[0_0_25px_rgba(22,139,255,0.4)]">
                {item.value}
              </span>
              <span className="text-white text-[15px] sm:text-[17px] mt-4 tracking-wide font-mono font-medium">
                {item.label}
              </span>
              {item.sub && (
                <span className="text-[#168BFF] text-[12px] sm:text-[13px] mt-1 tracking-wide font-mono opacity-90">
                  {item.sub}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
