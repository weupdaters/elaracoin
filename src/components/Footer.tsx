import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText';

const FOOTER_BG_IMAGE = '/assets/elara-footer-bg.jpg';

export const Footer: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <footer className="relative w-full flex flex-col lg:flex-row bg-[#030B17] border-t border-[#168BFF]/30 overflow-hidden select-none">
      {/* Left Column: Orbital Station Graphic generated with Nano Banana */}
      <div className="w-full lg:w-1/2 h-[220px] sm:h-[320px] lg:min-h-[560px] relative overflow-hidden flex-shrink-0">
        <img
          src={FOOTER_BG_IMAGE}
          alt="ELARA Orbital Command Station"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-85"
        />

        {/* HUD Telemetry Overlay on Image */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex flex-col gap-1 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded bg-[#06152F]/85 backdrop-blur-md border border-[#168BFF]/40 text-[#00D2FF] text-[10px] font-mono">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00D2FF]" />
            </span>
            <span>ELARA ORBITAL COMMAND // PROTOCOL V1</span>
          </div>
          <span className="text-[10px] font-mono text-[#C0C7D6]/70 pl-1 hidden sm:inline">
            STELLAR ASSET: 100B SUPPLY FIXED
          </span>
        </div>

        {/* Right fade gradient on desktop */}
        <div
          className="hidden lg:block absolute inset-y-0 right-0 w-36 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent 0%, #030B17 100%)',
          }}
        />
        {/* Bottom fade gradient on mobile */}
        <div
          className="lg:hidden absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #030B17 100%)',
          }}
        />
      </div>

      {/* Right Column: ELARA Content & Links */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-5 sm:p-8 lg:p-14 relative z-10">
        {/* Top Area: Logo + Copy */}
        <div className="flex flex-col gap-4 sm:gap-6 max-w-lg">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/elara-logo.png"
              alt="ELARA Logo"
              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-[#168BFF] shadow-[0_0_20px_rgba(22,139,255,0.7)]"
            />
            <div className="flex flex-col">
              <span className="text-white text-xl sm:text-2xl font-bold tracking-tight">ELARA</span>
              <span className="text-[#00D2FF] text-[10px] sm:text-[11px] font-mono tracking-widest uppercase">
                Decentralized Ecosystem
              </span>
            </div>
          </div>

          {/* Copy Paragraph */}
          <p className="text-[#C0C7D6] text-[13px] sm:text-[14px] leading-relaxed font-mono">
            ELARA is driven by its community. Through decentralized governance and smart
            contracts, holders shape the future. Active participation is rewarded with
            0.25% daily automated yield, ensuring long-term value distribution across the network.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1 pointer-events-auto">
            <motion.a
              href="https://t.me/elaratoken"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 sm:h-12 px-5 sm:px-6 rounded-full bg-gradient-to-r from-white via-[#E2E8F0] to-[#C0C7D6] border border-[#168BFF]/40 text-[#06152F] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(22,139,255,0.35)] transition-all no-underline cursor-pointer"
              whileHover={{
                scale: 1.03,
                backgroundColor: '#ffffff',
                boxShadow: '0 0 30px rgba(22, 139, 255, 0.6)',
              }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <i className="bi bi-telegram text-base text-[#168BFF]" />
              <ScrambleText text="Join Presale & Telegram" isHovered={isHovered} />
            </motion.a>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com/elara_token"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-[#06152F] hover:bg-[#168BFF]/25 border border-[#168BFF]/40 text-[#168BFF] hover:text-white flex items-center justify-center transition-all no-underline shadow-sm"
              >
                <i className="bi bi-twitter-x text-sm sm:text-base" />
              </a>

              <a
                href="mailto:contact@elerea.com"
                aria-label="Email Us"
                className="w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-[#06152F] hover:bg-[#168BFF]/25 border border-[#168BFF]/40 text-[#168BFF] hover:text-white flex items-center justify-center transition-all no-underline shadow-sm"
              >
                <i className="bi bi-envelope-fill text-sm sm:text-base" />
              </a>

              <a
                href="/elerea/.well-known/stellar.toml"
                target="_blank"
                rel="noopener noreferrer"
                title="stellar.toml (SEP-0001)"
                className="h-10 sm:h-11 px-3 rounded-full bg-[#06152F] hover:bg-[#168BFF]/25 border border-[#168BFF]/40 text-[#C0C7D6] hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all no-underline"
              >
                <i className="bi bi-file-earmark-code text-sm text-[#00D2FF]" />
                <span>toml</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 text-xs font-mono text-[#C0C7D6]/70">
          <div>&copy; 2026 ELARA Ecosystem. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="https://stellar.expert/explorer/public/asset/ELARA-GB3WVZRQB2MXRFD4J3JV3OZH5K6V7WPKIKVMONOKXN3QV2QTVHNMAGVG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00D2FF] hover:underline"
            >
              StellarExpert Explorer ↗
            </a>
            <span>•</span>
            <span>100B Locked</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
