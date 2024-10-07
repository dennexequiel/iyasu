import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

interface ScrollOptions {
  elementId: string;
  offset?: number;
}

export const useScrollTo = (defaultOffset: number = 0) => {
  const router = useRouter();

  const scrollToElement = useCallback(
    ({ elementId, offset = defaultOffset }: ScrollOptions): boolean => {
      const element = document.getElementById(elementId);
      if (element) {
        const navbar = document.querySelector('nav');
        const navbarOffset = navbar ? navbar.offsetHeight : 0;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        return true;
      }
      return false;
    },
    [defaultOffset]
  );

  const scrollTo = useCallback(
    (elementId: string, offset?: number) => {
      if (!scrollToElement({ elementId, offset })) {
        router.push(`/#${elementId}`);
      }
    },
    [scrollToElement, router]
  );

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the '#' from the hash
      if (hash) {
        scrollToElement({ elementId: hash });
      }
    };

    handleHashChange(); // Check hash on initial load
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [scrollToElement]);

  return scrollTo;
};
