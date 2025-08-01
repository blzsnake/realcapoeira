import { useEffect, useState } from 'react';

export const useMount = (isOpen: boolean) => {
  const [mounted, setMounted] = useState(false);

  const onAnimationEnd = () => {
    if (!isOpen) {
      setMounted(false);
    }
  };

  useEffect(() => {
    if (isOpen && !mounted) {
      setMounted(true);
    }
  }, [isOpen, mounted]);

  return {
    mounted,
    onAnimationEnd,
  };
};
