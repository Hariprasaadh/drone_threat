
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = ''
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const countUp = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutExpo
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      
      countRef.current = progress === 1 ? end : easeOutExpo * end;
      setCount(countRef.current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(countUp);
      }
    };

    frameRef.current = requestAnimationFrame(countUp);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration]);

  const formattedCount = count.toFixed(decimals);

  return (
    <span>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

export default AnimatedCounter;
