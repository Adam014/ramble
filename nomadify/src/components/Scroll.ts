import { useState, useEffect } from 'react';

export default function ScrollingImage() {
  const [isImageFixed, setIsImageFixed] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = window.innerHeight / 5; // max scroll of the fixed image

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;

      if (currentPosition > maxScroll && isImageFixed) {
        setIsImageFixed(false);
        setScrollPosition(currentPosition);
      } else if (currentPosition <= maxScroll && !isImageFixed) {
        setIsImageFixed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isImageFixed]);

  return { isImageFixed, scrollPosition };
}