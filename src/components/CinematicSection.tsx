import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';

const SECTION2_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';

export const CinematicSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  const transform = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-[#06152F] select-none"
    >
      {/* Background Video */}
      <video
        src={SECTION2_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-80"
      />

      {/* Top gradient overlay */}
      <div
        className="absolute top-0 left-0 w-full h-[180px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, #06152F 0%, transparent 100%)',
        }}
      />

      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-[140px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, #06152F 0%, transparent 100%)',
        }}
      />

      {/* 3D Perspective Container */}
      <div
        className="relative z-20 max-w-5xl px-6 sm:px-12 w-full flex items-center justify-center"
        style={{ perspective: '400px' }}
      >
        <motion.p
          style={{
            transform,
            opacity,
            transformStyle: 'preserve-3d',
          }}
          className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none text-center drop-shadow-[0_4px_30px_rgba(6,21,47,0.9)]"
        >
          ELARA is a next-generation blockchain project built with a clear vision: to
          create a transparent, community-driven, and sustainable digital ecosystem.{' '}
          <span className="text-[#168BFF]">At ELARA,</span> we believe blockchain is
          not just about tokens — it’s about trust, freedom, and long-term value. Built on
          a fast and cost-efficient network, ELARA is more than a token — it’s a growing
          ecosystem powered by its community.
        </motion.p>
      </div>
    </section>
  );
};

export default CinematicSection;
