
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fade' | 'slide-up' | 'slide-down' | 'scale';
  delay?: number;
  duration?: number;
  showOnce?: boolean;
  style?: React.CSSProperties;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  className,
  animationType = 'fade',
  delay = 0,
  duration = 300,
  showOnce = false,
  style,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (showOnce) {
        setHasShown(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, showOnce]);

  // If we've already shown once and showOnce is true, render children without animation
  if (showOnce && hasShown) {
    return <>{children}</>;
  }

  const animationStyles = {
    fade: isVisible ? 'opacity-100' : 'opacity-0',
    'slide-up': isVisible 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-4',
    'slide-down': isVisible 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 -translate-y-4',
    'scale': isVisible 
      ? 'opacity-100 scale-100' 
      : 'opacity-0 scale-95',
  };

  return (
    <div 
      className={cn(
        'transition-all',
        animationStyles[animationType],
        className
      )}
      style={{ 
        transitionDuration: `${duration}ms`,
        ...style 
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
