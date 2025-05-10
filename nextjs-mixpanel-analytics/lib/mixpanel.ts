import mixpanel from 'mixpanel-browser';

export const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '';

let mixpanelInstance: typeof mixpanel | undefined;

export const initMixpanel = () => {
  console.log('Initializing Mixpanel...');
  console.log('Token:', MIXPANEL_TOKEN ? 'Token is set' : 'Token is MISSING!');
  
  if (typeof window === 'undefined' || !MIXPANEL_TOKEN) {
    console.warn('Mixpanel not initialized:', {
      isSSR: typeof window === 'undefined',
      hasToken: !!MIXPANEL_TOKEN
    });
    return;
  }

  if (!mixpanelInstance) {
    console.log('Creating Mixpanel instance...');
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: true, // Enable debug mode
      track_pageview: true, // Automatically track page views
      persistence: 'localStorage',
      ignore_dnt: true,
      autotrack: true, // Enable autotrack here
      // Remove the EU server if you're using US servers
      // api_host: 'https://api-eu.mixpanel.com',
      loaded: function() {
        console.log('Mixpanel loaded successfully!');
        // Autotrack is already enabled in the config above
      }
    });
    mixpanelInstance = mixpanel;
  }

  return mixpanelInstance;
};

// Helper function to identify users
export const identifyUser = (userId: string, userProperties?: Record<string, any>) => {
  console.log('Identifying user:', userId);
  if (mixpanelInstance && userId) {
    mixpanelInstance.identify(userId);
    if (userProperties) {
      mixpanelInstance.people.set(userProperties);
    }
  }
};

// Helper function to track events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  console.log('Tracking event:', eventName, properties);
  if (mixpanelInstance) {
    mixpanelInstance.track(eventName, properties);
  } else {
    console.warn('Mixpanel instance not available!');
  }
};

// Helper function to track page views
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  console.log('Tracking page view:', pageName);
  if (mixpanelInstance) {
    mixpanelInstance.track('Page Viewed', {
      page_name: pageName,
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer,
      ...properties
    });
  } else {
    console.warn('Mixpanel instance not available for page view!');
  }
};

// Helper function to track scroll depth
export const initScrollTracking = () => {
  console.log('Initializing scroll tracking...');
  if (!mixpanelInstance || typeof window === 'undefined') {
    console.warn('Scroll tracking not initialized');
    return;
  }

  let maxScroll = 0;
  let ticking = false;

  const scrollThresholds = [25, 50, 75, 90, 100];
  const trackedThresholds = new Set<number>();

  const updateScrollDepth = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackableHeight = documentHeight - windowHeight;
    const scrollPercentage = trackableHeight > 0 ? Math.round((scrollTop / trackableHeight) * 100) : 0;

    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage;

      scrollThresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          trackEvent('Scroll Depth', {
            depth: threshold,
            page_url: window.location.href,
            page_path: window.location.pathname
          });
        }
      });
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollDepth);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Clean up on page unload
  return () => {
    window.removeEventListener('scroll', onScroll);
  };
};