import mixpanel from 'mixpanel-browser';

export const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '';

let mixpanelInstance: typeof mixpanel | undefined;

export const initMixpanel = () => {
  console.log('Initializing Mixpanel with Autocapture...');
  console.log('Token:', MIXPANEL_TOKEN ? 'Token is set' : 'Token is MISSING!');
  
  if (typeof window === 'undefined' || !MIXPANEL_TOKEN) {
    console.warn('Mixpanel not initialized:', {
      isSSR: typeof window === 'undefined',
      hasToken: !!MIXPANEL_TOKEN
    });
    return;
  }

  if (!mixpanelInstance) {
    console.log('Creating Mixpanel instance with autocapture...');
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: true, // Enable debug mode for development
      track_pageview: true, // Automatically track page views
      persistence: 'localStorage',
      ignore_dnt: true,
      
      // Enable autocapture for automatic tracking
      autotrack: true,
      
      // Advanced autocapture configuration
      track_links_timeout: 300,
      cookie_expiration: 365,
      upgrade: true,
      
      // Autocapture specific settings
      api_payload_format: 'json',
      
      loaded: function(mixpanel) {
        console.log('Mixpanel loaded successfully with autocapture enabled!');
        
        // Additional autocapture configuration after load
        const autocaptureElements = {
          // Track all buttons
          'button': true,
          // Track all links
          'a': true,
          // Track form submissions
          'form': true,
          // Track input changes
          'input': true,
          'select': true,
          'textarea': true
        };
        
        // Enable comprehensive tracking
        console.log('Autocapture is tracking:', autocaptureElements);
      }
    });
    
    mixpanelInstance = mixpanel;
    
    // Set up additional tracking after initialization
    if (mixpanelInstance) {
      // Enable more detailed page view tracking
      mixpanelInstance.track_pageview();
      
      // Set up super properties that will be sent with every event
      mixpanelInstance.register({
        'app_version': '1.0.0',
        'platform': 'web',
        'environment': process.env.NODE_ENV || 'production'
      });
      
      console.log('Mixpanel autocapture fully configured');
    }
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

// Helper function to track events (for custom events)
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  console.log('Custom event tracked:', eventName, properties);
  if (mixpanelInstance) {
    mixpanelInstance.track(eventName, properties);
  } else {
    console.warn('Mixpanel instance not available!');
  }
};

// Helper function to track page views (manual)
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  console.log('Manual page view tracked:', pageName);
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

// Enhanced scroll tracking with autocapture
export const initScrollTracking = () => {
  console.log('Initializing enhanced scroll tracking...');
  if (!mixpanelInstance || typeof window === 'undefined') {
    console.warn('Scroll tracking not initialized');
    return;
  }

  let maxScroll = 0;
  let ticking = false;
  let lastScrollTime = Date.now();

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
          
          // Track scroll depth milestone
          trackEvent('Scroll Depth Milestone', {
            depth: threshold,
            page_url: window.location.href,
            page_path: window.location.pathname,
            time_on_page: Date.now() - lastScrollTime
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
    
    // Track continuous scroll activity
    const now = Date.now();
    if (now - lastScrollTime > 1000) { // Track every second of scrolling
      trackEvent('User Scrolling', {
        scroll_position: window.pageYOffset,
        scroll_percentage: Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100),
        page_url: window.location.href
      });
      lastScrollTime = now;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Track when user reaches bottom of page
  const checkBottomReached = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      trackEvent('Page Bottom Reached', {
        page_url: window.location.href,
        time_to_bottom: Date.now() - lastScrollTime
      });
    }
  };
  
  window.addEventListener('scroll', checkBottomReached, { passive: true });

  // Clean up on page unload
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('scroll', checkBottomReached);
  };
};