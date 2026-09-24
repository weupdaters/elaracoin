import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SquashHamburger from './SquashHamburger';
import ScrambleText from './ScrambleText';

interface NavbarProps {
  entranceComplete: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ entranceComplete }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isDownloadHovered, setIsDownloadHovered] = useState<boolean>(false);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToId = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <>
      <motion.nav
        className="w-full h-16 sm:h-20 px-3 sm:px-6 md:px-8 flex items-center justify-between pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* ================= DESKTOP NAVBAR (hidden below md) ================= */}
        <div className="hidden md:flex items-center gap-2 pointer-events-auto">
          {/* Logo Pill */}
          <motion.div
            className="h-11 sm:h-12 px-4 sm:px-5 bg-[#06152F]/80 backdrop-blur-md border border-[#168BFF]/35 rounded-[14px] flex items-center gap-2.5 cursor-pointer select-none transition-all duration-200 shadow-[0_4px_20px_rgba(6,21,47,0.8)]"
            whileHover={{
              scale: 1.02,
              backgroundColor: 'rgba(6, 21, 47, 0.95)',
              borderColor: '#168BFF',
              boxShadow: '0 0 20px rgba(22, 139, 255, 0.4)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/assets/elara-logo.png"
              alt="ELARA Logo"
              className="w-5 sm:w-6 h-5 sm:h-6 rounded-full object-cover border border-[#168BFF]/60"
            />
            <span className="text-[15px] sm:text-[16px] font-bold tracking-tight text-white">
              ELARA
            </span>
          </motion.div>

          {/* Expanding Menu Pill */}
          <motion.div
            className="h-11 sm:h-12 rounded-[14px] bg-[#06152F]/80 backdrop-blur-md border border-[#168BFF]/35 flex items-center overflow-hidden shadow-[0_4px_20px_rgba(6,21,47,0.8)]"
            animate={{ width: menuOpen ? 410 : 46 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            {/* Hamburger Button */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex items-center justify-center transition-all duration-200 cursor-pointer ${
                menuOpen
                  ? 'w-8 h-8 rounded-[10px] bg-[#168BFF]/20 hover:bg-[#168BFF]/30 ml-1.5'
                  : 'w-11 sm:w-12 h-11 sm:h-12 rounded-[14px] hover:bg-[#168BFF]/15'
              }`}
            >
              <SquashHamburger isOpen={menuOpen} isMobile={false} />
            </button>

            {/* Links when open */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="flex items-center gap-4 sm:gap-5 pl-3 sm:pl-4 pr-3 sm:pr-4 whitespace-nowrap"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    className="text-[13px] sm:text-[14px] font-mono text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0 transition-colors"
                    onMouseEnter={() => setHoveredLink('about')}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={() => scrollToId('about')}
                  >
                    <ScrambleText text="About" isHovered={hoveredLink === 'about'} />
                  </button>

                  <button
                    type="button"
                    className="text-[13px] sm:text-[14px] font-mono text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0 transition-colors"
                    onMouseEnter={() => setHoveredLink('metrics')}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={() => scrollToId('metrics')}
                  >
                    <ScrambleText text="Metrics" isHovered={hoveredLink === 'metrics'} />
                  </button>

                  <button
                    type="button"
                    className="text-[13px] sm:text-[14px] font-mono text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0 transition-colors"
                    onMouseEnter={() => setHoveredLink('solution')}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={() => scrollToId('solution')}
                  >
                    <ScrambleText text="Solution" isHovered={hoveredLink === 'solution'} />
                  </button>

                  <button
                    type="button"
                    className="text-[13px] sm:text-[14px] font-mono text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0 transition-colors"
                    onMouseEnter={() => setHoveredLink('vision')}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={() => scrollToId('vision')}
                  >
                    <ScrambleText text="Vision" isHovered={hoveredLink === 'vision'} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Desktop Download / Presale Button */}
        <div className="hidden md:flex items-center gap-3 pointer-events-auto">
          <div className="h-10 px-3 bg-[#06152F]/70 border border-[#168BFF]/30 rounded-full flex items-center gap-2 text-xs font-mono text-[#C0C7D6]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Stellar Mainnet</span>
          </div>

          <motion.a
            href="https://t.me/elaratoken"
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 sm:h-12 px-5 sm:px-6 bg-gradient-to-r from-white via-[#E2E8F0] to-[#C0C7D6] border border-[#168BFF]/40 rounded-full flex items-center gap-2 text-[#06152F] cursor-pointer font-bold text-xs sm:text-sm select-none no-underline shadow-[0_0_20px_rgba(22,139,255,0.25)] hover:shadow-[0_0_30px_rgba(22,139,255,0.5)]"
            whileHover={{
              scale: 1.03,
              backgroundColor: '#ffffff',
            }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => setIsDownloadHovered(true)}
            onMouseLeave={() => setIsDownloadHovered(false)}
          >
            <i className="bi bi-rocket-takeoff-fill text-[15px] sm:text-[16px] text-[#168BFF] leading-none" />
            <ScrambleText text="Join Presale" isHovered={isDownloadHovered} />
          </motion.a>
        </div>

        {/* ================= MOBILE NAVBAR (visible below md) ================= */}
        <div className="flex md:hidden items-center justify-between w-full pointer-events-auto gap-2">
          {/* Mobile Logo Pill */}
          <motion.div
            className="h-9 sm:h-10 px-2.5 sm:px-3 bg-[#06152F]/85 backdrop-blur-md border border-[#168BFF]/40 rounded-[11px] flex items-center gap-2 cursor-pointer select-none shadow-md"
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/assets/elara-logo.png" alt="ELARA" className="w-4 sm:w-5 h-4 sm:h-5 rounded-full object-cover" />
            <span className="text-[13px] sm:text-[14px] font-bold tracking-tight text-white">
              ELARA
            </span>
          </motion.div>

          {/* Right Mobile Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <motion.a
              href="https://t.me/elaratoken"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 sm:h-10 px-3 sm:px-3.5 bg-gradient-to-r from-white to-[#E2E8F0] border border-[#168BFF]/40 rounded-full flex items-center gap-1 text-[#06152F] cursor-pointer font-bold text-[11px] sm:text-[12px] select-none no-underline whitespace-nowrap shadow-[0_0_12px_rgba(22,139,255,0.2)]"
              whileTap={{ scale: 0.95 }}
            >
              <i className="bi bi-rocket-takeoff-fill text-[12px] text-[#168BFF] leading-none" />
              <span>Presale</span>
            </motion.a>

            {/* Mobile Hamburger Toggle */}
            <motion.button
              type="button"
              aria-label="Toggle mobile menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 sm:w-10 h-9 sm:h-10 rounded-[11px] bg-[#06152F]/85 backdrop-blur-md border border-[#168BFF]/40 flex items-center justify-center cursor-pointer shadow-md text-white"
              whileTap={{ scale: 0.92 }}
            >
              <SquashHamburger isOpen={menuOpen} isMobile={true} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ================= MOBILE EXPANDED MENU DRAWER ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden bg-[#030B17]/95 backdrop-blur-2xl flex flex-col justify-between p-5 sm:p-6 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Top Row: Brand & Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-[#168BFF]/20">
              <div className="flex items-center gap-2.5">
                <img src="/assets/elara-logo.png" alt="ELARA" className="w-7 h-7 rounded-full object-cover border border-[#168BFF]/50" />
                <div className="flex flex-col">
                  <span className="text-white font-bold text-base leading-tight">ELARA</span>
                  <span className="text-[#00D2FF] text-[10px] font-mono">Stellar &amp; Soroban</span>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 rounded-xl bg-[#06152F] border border-[#168BFF]/30 text-white flex items-center justify-center cursor-pointer hover:bg-[#168BFF]/20 transition-colors"
              >
                <i className="bi bi-x-lg text-sm" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-2.5 my-auto py-6">
              <span className="text-[#168BFF] text-[11px] font-mono tracking-widest uppercase mb-1">
                Navigation
              </span>

              <button
                type="button"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#06152F]/70 border border-[#168BFF]/25 text-left text-white font-mono text-sm hover:border-[#168BFF] hover:bg-[#168BFF]/15 transition-all cursor-pointer"
                onClick={() => scrollToId('about')}
              >
                <div className="flex items-center gap-3">
                  <i className="bi bi-globe-americas text-[#168BFF]" />
                  <span>About ELARA</span>
                </div>
                <i className="bi bi-chevron-right text-xs text-[#00D2FF]" />
              </button>

              <button
                type="button"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#06152F]/70 border border-[#168BFF]/25 text-left text-white font-mono text-sm hover:border-[#168BFF] hover:bg-[#168BFF]/15 transition-all cursor-pointer"
                onClick={() => scrollToId('metrics')}
              >
                <div className="flex items-center gap-3">
                  <i className="bi bi-graph-up-arrow text-[#168BFF]" />
                  <span>Tokenomics &amp; Metrics</span>
                </div>
                <i className="bi bi-chevron-right text-xs text-[#00D2FF]" />
              </button>

              <button
                type="button"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#06152F]/70 border border-[#168BFF]/25 text-left text-white font-mono text-sm hover:border-[#168BFF] hover:bg-[#168BFF]/15 transition-all cursor-pointer"
                onClick={() => scrollToId('solution')}
              >
                <div className="flex items-center gap-3">
                  <i className="bi bi-cpu text-[#168BFF]" />
                  <span>Problem &amp; Solution</span>
                </div>
                <i className="bi bi-chevron-right text-xs text-[#00D2FF]" />
              </button>

              <button
                type="button"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#06152F]/70 border border-[#168BFF]/25 text-left text-white font-mono text-sm hover:border-[#168BFF] hover:bg-[#168BFF]/15 transition-all cursor-pointer"
                onClick={() => scrollToId('vision')}
              >
                <div className="flex items-center gap-3">
                  <i className="bi bi-compass text-[#168BFF]" />
                  <span>Vision &amp; 3 Pillars</span>
                </div>
                <i className="bi bi-chevron-right text-xs text-[#00D2FF]" />
              </button>
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="flex flex-col gap-3 pt-4 border-t border-[#168BFF]/20">
              <a
                href="https://t.me/elaratoken"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#168BFF] hover:bg-[#168BFF]/90 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(22,139,255,0.4)] no-underline transition-all"
              >
                <i className="bi bi-telegram text-base" />
                <span>Join Presale &amp; Telegram</span>
              </a>

              <div className="flex items-center justify-center gap-4 text-xs font-mono text-[#C0C7D6] pt-1">
                <a
                  href="https://twitter.com/elara_token"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#168BFF] no-underline text-[#C0C7D6]"
                >
                  <i className="bi bi-twitter-x mr-1" />
                  Twitter
                </a>
                <span>•</span>
                <a
                  href="/elerea/.well-known/stellar.toml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#168BFF] no-underline text-[#C0C7D6]"
                >
                  <i className="bi bi-file-earmark-code mr-1" />
                  stellar.toml
                </a>
                <span>•</span>
                <a
                  href="https://stellar.expert/explorer/public/asset/ELARA-GB3WVZRQB2MXRFD4J3JV3OZH5K6V7WPKIKVMONOKXN3QV2QTVHNMAGVG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#168BFF] no-underline text-[#C0C7D6]"
                >
                  Explorer ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
