'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Constants for cursor sizes and breakpoint
const DOT_SIZE = 8; // 2rem = 8px
const CIRCLE_SIZE = 40; // 10rem = 40px
const DESKTOP_BREAKPOINT = 1024;

export default function CustomCursor() {
  // State to track hover and desktop status
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Motion values for cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring animation for the circle (magnetic effect)
  const circleX = useSpring(cursorX, {
    stiffness: 250,
    damping: 30,
    mass: 0.5,
  });
  const circleY = useSpring(cursorY, {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  });

  const cursorRef = useRef<HTMLDivElement>(null);

  // Effect to check if the device is desktop
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches);
    };

    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);

    return () => window.removeEventListener('resize', checkIfDesktop);
  }, []);

  // Effect to handle cursor movement
  useEffect(() => {
    if (!isDesktop) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, isDesktop]);

  // Effect to handle hover states on interactive elements
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const hoverableElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select'
    );

    hoverableElements.forEach((elem) => {
      elem.addEventListener('mouseenter', handleMouseEnter);
      elem.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      hoverableElements.forEach((elem) => {
        elem.removeEventListener('mouseenter', handleMouseEnter);
        elem.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isDesktop]);

  // Don't render anything on non-desktop devices
  if (!isDesktop) return null;

  return (
    <>
      {/* Dot element (follows cursor exactly) */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {!isHovering && (
          <div
            className="rounded-full bg-neutral-800"
            style={{ width: DOT_SIZE, height: DOT_SIZE }}
          />
        )}
      </motion.div>

      {/* Circle element (follows with magnetic effect) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
        style={{
          x: circleX,
          y: circleY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className={`rounded-full ${
            isHovering
              ? 'bg-neutral-800 bg-opacity-50'
              : 'border border-neutral-800'
          }`}
          style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
          animate={{ scale: isHovering ? 0.8 : 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.5,
          }}
        />
      </motion.div>
    </>
  );
}