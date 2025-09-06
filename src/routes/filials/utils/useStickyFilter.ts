import { useEffect, useState } from 'react';
import { debounce } from '~shared/utils/debounce';

export const useStickyFilter = () => {
  const [position, switchPosition] = useState('relative');
  useEffect(() => {
    const $elem = document.getElementById('#filterScrollMarker');
    const scrollHandler = debounce(() => {
      if (!$elem) {
        return;
      }
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { top } = $elem?.getBoundingClientRect();
      if (top < 150 && position === 'relative') {
        switchPosition('Fixed');
      }
      if (top > 150 && position === 'Fixed') {
        switchPosition('relative');
      }
    }, 10);
    if ($elem) {
      window.addEventListener('scroll', scrollHandler);
    }

    return () => window.removeEventListener('scroll', scrollHandler);
  });

  return position;
};
