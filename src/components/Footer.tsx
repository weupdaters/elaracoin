import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText';

const SECTION5_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095844_9f270a48-a006-4df0-b2b5-31c3bf68bb45.mp4';

export const Footer: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <footer className="relative w-full min-h-[560px] lg:h-[80vh] flex flex-col lg:flex-row bg-[#030B17] border-t border-[#168BFF]/25 overflow-hidden select-none">
      {/* Left Column: Full-Height Video */}
      <div className="w-full lg:w-1/2 h-[340px] lg:h-full relative overflow-hidden">
        <video
          src={SECTION5_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-85"
        />
        {/* Right fade gradient on desktop */}
        <div
          className="hidden lg:block absolute inset-y-0 right-0 w-32 pointer-events-none"
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
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative z-10">
        {/* Top Area: Logo + Copy */}
        <div className="flex flex-col gap-6 max-w-lg">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3.5">
            <img
              src="/assets/elara-logo.png"
              alt="ELARA Logo"
              className="w-11 h-11 rounded-full object-cover border-2 border-[#168BFF] shadow-[0_0_20px_rgba(22,139,255,0.7)]"
            />
            <div className="flex flex-col">
              <span className="text-white text-2xl font-bold tracking-tight">ELARA</span>
              <span className="text-[#168BFF] text-xs font-mono tracking-widest uppercase">
                Decentralized Ecosystem
              </span>
            </div>
          </div>

          {/* Copy Paragraph */}
          <p className="text-[#C0C7D6] text-[14px] sm:text-[15px] leading-relaxed">
            ELARA is driven by its community. Through decentralized governance, users have
            a voice in key decisions, helping shape the future of the platform. Active
            participation is rewarded with 0.25% daily returns, ensuring that value is
            shared among those who contribute to the network’s growth. Join our growing
            community and be part of the next evolution in blockchain technology.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.a
              href="https://t.me/elaratoken"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-7 rounded-full bg-gradient-to-r from-white via-[#E2E8F0] to-[#C0C7D6] border border-[#168BFF]/40 text-[#06152F] font-bold text-sm flex items-center gap-2.5 shadow-[0_0_25px_rgba(22,139,255,0.35)] transition-all no-underline cursor-pointer"
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
                className="w-11 h-11 rounded-full bg-[#06152F] hover:bg-[#168BFF]/20 border border-[#168BFF]/40 text-[#168BFF] hover:text-white flex items-center justify-center transition-all no-underline shadow-sm"
              >
                <i className="bi bi-twitter-x text-lg" />
              </a>

              <a
                href="mailto:contact@elerea.com"
                aria-label="Email Us"
                className="w-11 h-11 rounded-full bg-[#06152F] hover:bg-[#168BFF]/20 border border-[#168BFF]/40 text-[#168BFF] hover:text-white flex items-center justify-center transition-all no-underline shadow-sm"
              >
                <i className="bi bi-envelope-fill text-lg" />
              </a>

              <a
                href="/elerea/.well-known/stellar.toml"
                target="_blank"
                rel="noopener noreferrer"
                title="stellar.toml (SEP-0001)"
                className="h-11 px-3.5 rounded-full bg-[#06152F] hover:bg-[#168BFF]/20 border border-[#168BFF]/40 text-[#C0C7D6] hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all no-underline"
              >
                <i className="bi bi-file-earmark-code text-sm text-[#168BFF]" />
                <span>toml</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-10 mt-10 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#C0C7D6]/60">
          <div>&copy; 2026 ELARA Ecosystem. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a
              href="https://stellar.expert/explorer/testnet/asset/ELARA-GCXS3E6W2UGTBKUXINHK4CI7J4OHNZEL4IGNUILMEOBGRAEONVJ5WZF6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#168BFF] hover:underline"
            >
              StellarExpert Explorer
            </a>
            <span>•</span>
            <span>Supply: 100B Locked</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
