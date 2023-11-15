import { useState, useEffect } from 'react';

export default function ScrollingImage() {
  const [isImageFixed, setIsImageFixed] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = typeof window !== 'undefined' ? window.innerHeight / 5 : 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = typeof window !== 'undefined' ? window.scrollY : 0;

      if (currentPosition > maxScroll && isImageFixed) {
        setIsImageFixed(false);
        setScrollPosition(currentPosition);
      } else if (currentPosition <= maxScroll && !isImageFixed) {
        setIsImageFixed(true);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isImageFixed]);

  return { isImageFixed, scrollPosition };
}
