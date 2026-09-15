import React, { useState } from 'react';
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

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 w-full h-20 z-50 px-4 sm:px-6 md:px-8 flex items-center justify-between pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* ================= DESKTOP NAVBAR (hidden below sm) ================= */}
      <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
        {/* Logo Pill */}
        <motion.div
          className={`h-12 px-5 bg-[#06152F]/75 backdrop-blur-md border border-[#168BFF]/35 rounded-[14px] items-center gap-2.5 cursor-pointer select-none transition-all duration-200 shadow-[0_4px_20px_rgba(6,21,47,0.8)] ${
            menuOpen ? 'hidden md:flex' : 'flex'
          }`}
          whileHover={{
            scale: 1.02,
            backgroundColor: 'rgba(6, 21, 47, 0.9)',
            borderColor: '#168BFF',
            boxShadow: '0 0 20px rgba(22, 139, 255, 0.35)',
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/assets/elara-logo.png"
            alt="ELARA Logo"
            className="w-5 h-5 rounded-full object-cover border border-[#168BFF]/50"
          />
          <span className="text-[16px] font-medium tracking-tight text-white">
            ELARA
          </span>
        </motion.div>

        {/* Expanding Menu Pill */}
        <motion.div
          className="h-12 rounded-[14px] bg-[#06152F]/75 backdrop-blur-md border border-[#168BFF]/35 flex items-center overflow-hidden shadow-[0_4px_20px_rgba(6,21,47,0.8)]"
          animate={{ width: menuOpen ? 430 : 48 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          {/* Hamburger Button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center justify-center transition-all duration-200 cursor-pointer ${
              menuOpen
                ? 'w-9 h-9 rounded-[11px] bg-[#168BFF]/15 hover:bg-[#168BFF]/25 ml-1.5'
                : 'w-12 h-12 rounded-[14px] hover:bg-[#168BFF]/15'
            }`}
          >
            <SquashHamburger isOpen={menuOpen} isMobile={false} />
          </button>

          {/* Links when open */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="flex items-center gap-5 pl-4 pr-3 whitespace-nowrap"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  className="text-[15px] font-normal text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0 transition-colors"
                  onMouseEnter={() => setHoveredLink('about')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => scrollToId('about')}
                >
                  <ScrambleText text="About" isHovered={hoveredLink === 'about'} />
                </button>

                <button
                  type="button"
                  className="text-[15px] font-normal text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0 transition-colors"
                  onMouseEnter={() => setHoveredLink('metrics')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => scrollToId('metrics')}
                >
                  <ScrambleText text="Metrics" isHovered={hoveredLink === 'metrics'} />
                </button>

                <button
                  type="button"
                  className="text-[15px] font-normal text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0 transition-colors"
                  onMouseEnter={() => setHoveredLink('solution')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => scrollToId('solution')}
                >
                  <ScrambleText text="Solution" isHovered={hoveredLink === 'solution'} />
                </button>

                <button
                  type="button"
                  className="text-[15px] font-normal text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0 transition-colors"
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
      <div className="hidden sm:block pointer-events-auto">
        <motion.a
          href="https://t.me/elaratoken"
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-6 bg-gradient-to-r from-white via-[#E2E8F0] to-[#C0C7D6] border border-[#168BFF]/40 rounded-full flex items-center gap-2 text-[#06152F] cursor-pointer font-semibold text-[15px] select-none no-underline shadow-[0_0_20px_rgba(22,139,255,0.2)]"
          whileHover={{
            scale: 1.03,
            backgroundColor: '#ffffff',
            boxShadow: '0 0 25px rgba(22, 139, 255, 0.5)',
          }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setIsDownloadHovered(true)}
          onMouseLeave={() => setIsDownloadHovered(false)}
        >
          <i className="bi bi-apple text-[17px] text-[#168BFF] leading-none" />
          <ScrambleText text="Join Presale" isHovered={isDownloadHovered} />
        </motion.a>
      </div>

      {/* ================= MOBILE NAVBAR (visible below sm) ================= */}
      <div className="flex sm:hidden items-center justify-between w-full pointer-events-auto gap-2">
        {/* Mobile Logo Pill */}
        <motion.div
          className="h-9 bg-[#06152F]/80 backdrop-blur-md border border-[#168BFF]/35 rounded-[10px] flex items-center gap-2 cursor-pointer select-none overflow-hidden shadow-sm"
          animate={{
            width: menuOpen ? 0 : 'auto',
            opacity: menuOpen ? 0 : 1,
            paddingLeft: menuOpen ? 0 : 12,
            paddingRight: menuOpen ? 0 : 12,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="/assets/elara-logo.png" alt="ELARA" className="w-4 h-4 rounded-full" />
          <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">
            ELARA
          </span>
        </motion.div>

        {/* Mobile Menu Capsule */}
        <motion.div
          className="h-9 rounded-[10px] bg-[#06152F]/80 backdrop-blur-md border border-[#168BFF]/35 flex items-center overflow-hidden shadow-sm"
          animate={{
            width: menuOpen ? '100%' : 36,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <button
            type="button"
            aria-label="Toggle mobile navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center justify-center transition-all duration-200 cursor-pointer ${
              menuOpen
                ? 'w-7 h-7 rounded-[8px] bg-[#168BFF]/15 ml-1'
                : 'w-9 h-9 rounded-[10px]'
            }`}
          >
            <SquashHamburger isOpen={menuOpen} isMobile={true} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="flex items-center justify-around flex-1 px-3 whitespace-nowrap"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  className="text-[12px] font-normal text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0"
                  onClick={() => scrollToId('about')}
                >
                  About
                </button>
                <button
                  type="button"
                  className="text-[12px] font-normal text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0"
                  onClick={() => scrollToId('metrics')}
                >
                  Metrics
                </button>
                <button
                  type="button"
                  className="text-[12px] font-normal text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0"
                  onClick={() => scrollToId('solution')}
                >
                  Solution
                </button>
                <button
                  type="button"
                  className="text-[12px] font-normal text-[#C0C7D6] hover:text-[#168BFF] cursor-pointer bg-transparent border-none p-0"
                  onClick={() => scrollToId('vision')}
                >
                  Vision
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Download Button */}
        <motion.a
          href="https://t.me/elaratoken"
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-3.5 bg-gradient-to-r from-white to-[#C0C7D6] border border-[#168BFF]/30 rounded-full flex items-center gap-1.5 text-[#06152F] cursor-pointer font-semibold text-[13px] select-none no-underline whitespace-nowrap shadow-sm"
          animate={{
            opacity: menuOpen ? 0 : 1,
            width: menuOpen ? 0 : 'auto',
            paddingLeft: menuOpen ? 0 : 14,
            paddingRight: menuOpen ? 0 : 14,
            display: menuOpen ? 'none' : 'flex',
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <i className="bi bi-apple text-[14px] text-[#168BFF] leading-none" />
          <span>Presale</span>
        </motion.a>
      </div>
    </motion.header>
  );
};

export default Navbar;
