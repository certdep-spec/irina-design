import { useEffect, useRef, useState, MutableRefObject } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Custom hook to detect when an element is in view and apply reveal animations
 * @param options - IntersectionObserver options
 * @returns [ref, isVisible] - Ref to attach to element and visibility state
 */
export function useScrollReveal(
  options: ScrollRevealOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
): [MutableRefObject<HTMLElement | null>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      options
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options, options.threshold, options.rootMargin]);

  return [ref, isVisible];
}
