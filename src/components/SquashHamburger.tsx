import React from 'react';
import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  isMobile?: boolean;
}

export const SquashHamburger: React.FC<SquashHamburgerProps> = ({
  isOpen,
  isMobile = false,
}) => {
  const containerW = isMobile ? 15 : 18;
  const containerH = isMobile ? 10 : 12;
  const barH = isMobile ? 1.2 : 1.5;
  const yOffset = (containerH - barH) / 2;

  const springTransition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  };

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer pointer-events-none"
      style={{ width: `${containerW}px`, height: `${containerH}px` }}
    >
      {/* Top Bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full"
        style={{ height: `${barH}px`, top: 0 }}
        animate={
          isOpen
            ? { y: yOffset, rotate: 45 }
            : { y: 0, rotate: 0 }
        }
        transition={springTransition}
      />

      {/* Middle Bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full"
        style={{ height: `${barH}px`, top: `${yOffset}px` }}
        animate={
          isOpen
            ? { opacity: 0, scale: 0 }
            : { opacity: 1, scale: 1 }
        }
        transition={springTransition}
      />

      {/* Bottom Bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full"
        style={{ height: `${barH}px`, bottom: 0 }}
        animate={
          isOpen
            ? { y: -yOffset, rotate: -45 }
            : { y: 0, rotate: 0 }
        }
        transition={springTransition}
      />
    </div>
  );
};

export default SquashHamburger;
