import React from 'react';

const MQ = {
  MAX: (size: number) => `(max-width: ${size}px)` as const,
  MIN: (size: number) => `(min-width: ${size}px)` as const,
  isPhone: `(min-width: 320px)`,
  isTablet: '(min-width: 768px)',
  isDesktop: `(min-width: 1024px)`,
};

type QueryInput = string | ((m: typeof MQ) => string);

export const useMediaQuery = (queryInput: QueryInput) => {
  const query = typeof queryInput === 'string' ? queryInput : queryInput(MQ);
  const [matches, setMatches] = React.useState(() => window.matchMedia(query).matches);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};
