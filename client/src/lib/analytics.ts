/**
 * Analytics utilities for GA4 and Vercel Analytics
 */

// GA4 Measurement ID - should be set as environment variable
export const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';

/**
 * Initialize GA4
 */
export const initGA4 = () => {
  if (!GA4_MEASUREMENT_ID || typeof window === 'undefined') {
    return;
  }

  // Check if GA4 is already initialized
  if (window.gtag) {
    return;
  }

  // Load gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA4_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
  });
};

/**
 * Track page view in GA4
 */
export const trackPageView = (path: string) => {
  if (!GA4_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('config', GA4_MEASUREMENT_ID, {
    page_path: path,
  });
};

/**
 * Track custom event in GA4
 */
export const trackEvent = (
  eventName: string,
  eventParams?: {
    [key: string]: string | number | boolean;
  }
) => {
  if (!GA4_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, eventParams);
};

/**
 * Track section view (for portfolio sections)
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
};

/**
 * Track download event
 */
export const trackDownload = (fileName: string) => {
  trackEvent('file_download', {
    file_name: fileName,
  });
};

/**
 * Track external link click
 */
export const trackExternalLink = (url: string, linkName: string) => {
  trackEvent('external_link_click', {
    link_url: url,
    link_name: linkName,
  });
};

/**
 * Track contact form interaction
 */
export const trackContactInteraction = (action: string) => {
  trackEvent('contact_interaction', {
    action: action,
  });
};

// TypeScript declarations for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

