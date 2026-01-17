"use client";

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  delay?: number;
  duration?: number;
  easing?: string;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    delay = 0,
    duration = 800,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)'
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, delay]);

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    transition: `all ${duration}ms ${easing}`,
  };

  return { elementRef, isVisible, animationStyle };
};

export const useStaggeredAnimation = (itemCount: number, staggerDelay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate items one by one with stagger delay
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            }, i * staggerDelay);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [itemCount, staggerDelay]);

  const getItemStyle = (index: number) => ({
    opacity: visibleItems[index] ? 1 : 0,
    transform: visibleItems[index] ? 'translateY(0)' : 'translateY(50px)',
    transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
  });

  return { containerRef, getItemStyle, visibleItems };
};