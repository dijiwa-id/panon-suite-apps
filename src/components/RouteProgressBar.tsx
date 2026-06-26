import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

export const RouteProgressBar: React.FC = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start progress bar animation on route change
    setIsVisible(true);
    setProgress(15); // Instant jump to 15%

    // Fast initial climb
    const fastTimer = setTimeout(() => {
      setProgress(45);
    }, 100);

    // Dynamic ticking from 45% to 92% to simulate real progress
    const tickInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 92) {
          clearInterval(tickInterval);
          return 92;
        }
        // Decelerating growth rate
        const remaining = 95 - prev;
        const step = Math.max(0.5, remaining * 0.15 * Math.random());
        return Math.min(92, prev + step);
      });
    }, 180);

    // Finish simulation with transition to 100%
    const completionTimer = setTimeout(() => {
      clearInterval(tickInterval);
      setProgress(100);
      
      // Fade out progress bar after it hits 100%
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 250);

      return () => clearTimeout(hideTimer);
    }, 450); // Adjust duration for standard responsive feel

    return () => {
      clearTimeout(fastTimer);
      clearInterval(tickInterval);
      clearTimeout(completionTimer);
    };
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[2.5px] w-full bg-transparent">
          <motion.div
            initial={{ width: '0%', opacity: 1 }}
            animate={{ 
              width: `${progress}%`,
              opacity: 1
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.15, ease: 'easeOut' }
            }}
            transition={{ 
              type: 'tween',
              ease: 'easeOut',
              duration: progress === 100 ? 0.2 : 0.4
            }}
            className="h-full bg-gradient-to-r from-[#52C5F3]/80 via-[#52C5F3] to-[#52C5F3] relative"
            style={{
              boxShadow: '0 1px 10px rgba(82, 197, 243, 0.6), 0 0 4px rgba(82, 197, 243, 0.4)'
            }}
          >
            {/* Soft pulsing glow accent on the head of the progress bar */}
            <div 
              className="absolute right-0 top-0 h-full w-[100px] opacity-100"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4))',
                boxShadow: '0 0 8px 1px #52C5F3'
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
