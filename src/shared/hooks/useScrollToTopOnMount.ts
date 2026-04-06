import { useEffect } from 'react';

type UseScrollToTopOnMountOptions = {
  hashTargetId?: string;
  hashBlock?: ScrollLogicalPosition;
};

export function useScrollToTopOnMount(
  options: UseScrollToTopOnMountOptions = {}
) {
  const { hashTargetId, hashBlock = 'start' } = options;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (hashTargetId && window.location.hash === `#${hashTargetId}`) {
      const element = document.getElementById(hashTargetId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: hashBlock });

        return;
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [hashBlock, hashTargetId]);
}
