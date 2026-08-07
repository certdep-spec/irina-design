import { useEffect, useRef, useState, useMemo } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

const DEFAULT_OPTIONS: ScrollRevealOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = DEFAULT_OPTIONS
): [React.MutableRefObject<T | null>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);
  const memoizedOptions = useMemo(() => options, [options.threshold, options.rootMargin]); // eslint-disable-line react-hooks/exhaustive-deps

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
      memoizedOptions
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [memoizedOptions]);

  return [ref, isVisible];
}
