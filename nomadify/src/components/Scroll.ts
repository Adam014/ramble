import { useState, useEffect } from 'react';

export default function ScrollingImage() {
  // State variables
  const [isImageFixed, setIsImageFixed] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Calculate the maximum scroll position for fixing the image
  const maxScroll = typeof window !== 'undefined' ? window.innerHeight / 5 : 0;

  // Event handler for the scroll event
  const handleScroll = () => {
    const currentPosition = typeof window !== 'undefined' ? window.scrollY : 0;

    // Check if the scroll position exceeds the maximum and the image is still fixed
    if (currentPosition > maxScroll && isImageFixed) {
      setIsImageFixed(false);
      setScrollPosition(currentPosition);
    }
    // Check if the scroll position is within the maximum and the image is not fixed
    else if (currentPosition <= maxScroll && !isImageFixed) {
      setIsImageFixed(true);
    }
  };

  // Effect to attach and detach the scroll event listener
  useEffect(() => {
    // Only attach event listeners if the window object is available
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);

      // Detach event listener when the component is unmounted or isImageFixed changes
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isImageFixed]);

  // Return the state variables for external use
  return { isImageFixed, scrollPosition };
}
