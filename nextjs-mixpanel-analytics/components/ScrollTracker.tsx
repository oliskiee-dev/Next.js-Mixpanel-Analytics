'use client';

import { useEffect, useState } from 'react';
import mixpanel from 'mixpanel-browser';

// Scroll depth thresholds to track (in percentage)
const SCROLL_THRESHOLDS = [25, 50, 75, 90, 100];

interface ScrollTrackerProps {
  pageId?: string;
}

export default function ScrollTracker({ pageId = 'main-page' }: ScrollTrackerProps) {
  const [trackedThresholds, setTrackedThresholds] = useState<number[]>([]);
  
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Track scroll depth
    const handleScroll = () => {
      // Calculate current scroll depth percentage
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      // Calculate scroll percentage
      const scrollable = documentHeight - windowHeight;
      const scrolled = Math.floor((scrollTop / scrollable) * 100);
      
      // Check if we've crossed any thresholds
      SCROLL_THRESHOLDS.forEach(threshold => {
        // If we've reached a threshold and haven't tracked it yet
        if (scrolled >= threshold && !trackedThresholds.includes(threshold)) {
          // Track this threshold in Mixpanel
          if (mixpanel && typeof mixpanel.track === 'function') {
            mixpanel.track('Scroll Depth', {
              page_id: pageId,
              depth_percentage: threshold,
              url: window.location.href,
              path: window.location.pathname
            });
          }
          
          // Add to tracked thresholds
          setTrackedThresholds(prev => [...prev, threshold]);
          
          console.log(`Tracked scroll depth: ${threshold}%`);
        }
      });
    };
    
    // Throttle scroll event to improve performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [pageId, trackedThresholds]);
  
  // This component doesn't render anything
  return null;
}