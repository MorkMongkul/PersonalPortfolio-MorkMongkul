import React, { createContext, useContext, useRef, useEffect, ReactNode } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

interface LocomotiveScrollContextType {
  scroll: LocomotiveScroll | null;
}

const LocomotiveScrollContext = createContext<LocomotiveScrollContextType>({
  scroll: null,
});

export const useLocomotiveScrollContext = () => {
  return useContext(LocomotiveScrollContext);
};

interface LocomotiveScrollProviderProps {
  children: ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const LocomotiveScrollProvider: React.FC<LocomotiveScrollProviderProps> = ({
  children,
  containerRef,
}) => {
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const [scrollInstance, setScrollInstance] = React.useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      console.log('🚂 Locomotive Scroll: Container not ready');
      return;
    }

    let scroll: LocomotiveScroll | null = null;
    const updateTimeouts: NodeJS.Timeout[] = [];

    console.log('🚂 Locomotive Scroll: Initializing...');

    // Initialize with delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      if (!containerRef.current) {
        console.error('🚂 Locomotive Scroll: Container disappeared');
        return;
      }

      try {
        // Create Locomotive Scroll instance with ultra-smooth settings
        scroll = new LocomotiveScroll({
          el: containerRef.current,
          smooth: true,
          multiplier: 1,
          class: 'is-revealed',
          getDirection: true,
          getSpeed: true,
          reloadOnContextChange: true,
          resetNativeScroll: true,
          lerp: 0.05, // Lower lerp = smoother (0.05 for ultra-smooth)
          smartphone: {
            smooth: true,
            breakpoint: 768,
          },
          tablet: {
            smooth: true,
            breakpoint: 1024,
          },
        });

        console.log('🚂 Locomotive Scroll: Instance created!', scroll);

        scrollRef.current = scroll;
        setScrollInstance(scroll);

        // Function to update scroll
        const updateScroll = () => {
          if (scroll) {
            scroll.update();
            console.log('🚂 Locomotive Scroll: Updated');
          }
        };

        // Initial update
        updateScroll();

        // Staggered updates for proper height calculation
        updateTimeouts.push(setTimeout(updateScroll, 100));
        updateTimeouts.push(setTimeout(updateScroll, 300));
        updateTimeouts.push(setTimeout(updateScroll, 600));
        updateTimeouts.push(setTimeout(updateScroll, 1000));

        // Update on window load
        const handleLoad = () => {
          console.log('🚂 Locomotive Scroll: Window loaded, updating...');
          updateScroll();
        };
        
        // Update on resize
        const handleResize = () => {
          updateScroll();
        };

        if (document.readyState === 'complete') {
          handleLoad();
        } else {
          window.addEventListener('load', handleLoad);
        }
        
        window.addEventListener('resize', handleResize);

        // Store handlers for cleanup
        (scrollRef.current as any)._handlers = {
          load: handleLoad,
          resize: handleResize,
        };

      } catch (error) {
        console.error('🚂 Locomotive Scroll: Initialization error', error);
      }
    }, 300);

    // Cleanup on unmount
    return () => {
      console.log('🚂 Locomotive Scroll: Cleaning up...');
      clearTimeout(initTimeout);
      updateTimeouts.forEach(timeout => clearTimeout(timeout));

      const handlers = (scrollRef.current as any)?._handlers;
      if (handlers) {
        window.removeEventListener('load', handlers.load);
        window.removeEventListener('resize', handlers.resize);
      }

      if (scroll) {
        try {
          scroll.destroy();
        } catch (error) {
          console.error('🚂 Locomotive Scroll: Destroy error', error);
        }
      }
      
      if (scrollRef.current) {
        try {
          scrollRef.current.destroy();
        } catch (error) {
          console.error('🚂 Locomotive Scroll: Destroy error', error);
        }
        scrollRef.current = null;
      }
      
      setScrollInstance(null);
    };
  }, [containerRef]);

  // Update scroll when content changes
  useEffect(() => {
    if (!scrollRef.current) return;

    const timeoutId = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.update();
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  });

  return (
    <LocomotiveScrollContext.Provider value={{ scroll: scrollInstance }}>
      {children}
    </LocomotiveScrollContext.Provider>
  );
};
