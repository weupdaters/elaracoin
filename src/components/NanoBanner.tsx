import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NanoBannerProps {
  onDismiss?: () => void;
}

export const NanoBanner: React.FC<NanoBannerProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          aria-label="Announcement"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-full bg-gradient-to-r from-[#030B17] via-[#06152F] to-[#030B17] border-b border-[#168BFF]/30 text-white select-none overflow-hidden pointer-events-auto shadow-md"
        >
          {/* Subtle electric blue top line glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#168BFF] to-transparent opacity-70" />

          <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-4 text-xs">
            {/* Left: Live Status Badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#168BFF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D2FF]" />
              </span>
              <span className="font-mono uppercase font-bold tracking-wider text-[9px] sm:text-xs text-[#00D2FF] bg-[#168BFF]/15 px-1.5 sm:px-2 py-0.5 rounded border border-[#168BFF]/30 whitespace-nowrap">
                Stellar &amp; Soroban
              </span>
            </div>

            {/* Center: Announcement Message */}
            <div className="flex-1 text-center font-mono text-[10px] sm:text-xs text-[#C0C7D6] truncate px-1">
              <span className="hidden md:inline text-white font-semibold">
                ELARA PROTOCOL:
              </span>{' '}
              <span className="text-white">100B Locked</span> •{' '}
              <span className="text-emerald-400 font-semibold">0.25% Daily</span>
              <span className="hidden sm:inline"> • 25% Presale Active</span>
            </div>

            {/* Right: Action CTA & Close Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <a
                href="https://t.me/elaratoken"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#168BFF] hover:bg-[#168BFF]/90 text-white font-semibold text-[10px] sm:text-xs transition-all shadow-[0_0_12px_rgba(22,139,255,0.4)] hover:shadow-[0_0_20px_rgba(22,139,255,0.7)] no-underline whitespace-nowrap"
              >
                <span>Join</span>
                <span className="hidden xs:inline">Presale</span>
                <i className="bi bi-arrow-up-right text-[9px]" />
              </a>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Dismiss banner"
                className="text-[#C0C7D6] hover:text-white p-0.5 sm:p-1 rounded hover:bg-white/10 transition-colors cursor-pointer border-none bg-transparent"
              >
                <i className="bi bi-x-lg text-[10px] sm:text-xs" />
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default NanoBanner;
