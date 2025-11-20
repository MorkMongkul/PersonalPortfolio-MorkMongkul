import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { initGA4, trackPageView, trackSectionView } from '@/lib/analytics';

/**
 * Custom hook for analytics tracking
 */
export const useAnalytics = () => {
  const [location] = useLocation();

  // Initialize GA4 on mount
  useEffect(() => {
    initGA4();
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (location) {
      trackPageView(location);
    }
  }, [location]);

  return {
    trackSectionView,
  };
};

/**
 * Hook to track section visibility
 */
export const useSectionTracking = (sectionName: string) => {
  useEffect(() => {
    // Track section view when component mounts
    trackSectionView(sectionName);
  }, [sectionName]);
};

