import mixpanel from 'mixpanel-browser';

export const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '';

/**
 * Initialize Mixpanel with enhanced autocapture functionality
 */
export const initMixpanel = () => {
  if (typeof window === 'undefined' || !MIXPANEL_TOKEN) {
    console.warn('Mixpanel not initialized: Missing token or running in SSR');
    return;
  }

  // Initialize Mixpanel with autocapture enabled
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: true, // Always enable debug mode to see tracking in console
    track_pageview: true,
    persistence: 'localStorage',
    ignore_dnt: true,
    
    // Enable autocapture
    autotrack: true,
    
    loaded: function(instance) {
      console.log('🔍 Mixpanel initialized with autocapture enabled');
      
      // Override track method to show console logs
      const originalTrack = mixpanel.track;
      mixpanel.track = function(event_name, properties) {
        console.log('📊 Mixpanel Event:', event_name, properties);
        return originalTrack.call(this, event_name, properties);
      };
      
      // Set up button event tracking
      const trackButtons = () => {
        // Find all buttons on the page
        const buttons = document.querySelectorAll('button');
        
        // Add click tracking to each button
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            // Get button text
            const buttonText = button.textContent?.trim() || 'Unknown Button';
            
            // Get custom data attributes
            const section = button.getAttribute('data-section') || 'Unknown Section';
            const action = button.getAttribute('data-action') || 'click';
            
            // Track the button click
            mixpanel.track('[Auto] Button Clicked', {
              button_text: buttonText,
              section: section,
              action: action,
              page: window.location.pathname
            });
            
            console.log('🔘 Autocapture Button Click Tracked:', buttonText, section, action);
          });
        });
        console.log(`✅ Event listeners attached to ${document.querySelectorAll('button').length} buttons`);
      };
      
      /* Track buttons on initial page load
      This call makes the buttons get tracked from the moment the page loads */
      trackButtons();
    }
  });

  return mixpanel;
};

/**
 * Track scroll depth manually
 * @param {string} pageId - ID of the page or section
 * @param {number} depth - Scroll depth percentage (0-100)
 */
export const trackScrollDepth = (pageId: string, depth: number) => {
  if (typeof window === 'undefined') return;
  
  if (!mixpanel) {
    console.warn('Mixpanel not initialized for scroll tracking');
    return;
  }
  
  mixpanel.track('Scroll Depth', {
    page_id: pageId,
    depth_percentage: depth,
    url: window.location.href,
    path: window.location.pathname,
    timestamp: new Date().toISOString()
  });
};

/**
 * Track form submission manually
 * @param {string} formId - ID or name of the form
 * @param {object} data - Form data (without sensitive information)
 */
export const trackFormSubmission = (formId: string, data?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  if (!mixpanel) {
    console.warn('Mixpanel not initialized for form tracking');
    return;
  }
  
  mixpanel.track('Form Submitted', {
    form_id: formId,
    url: window.location.href,
    path: window.location.pathname,
    timestamp: new Date().toISOString()
  });
};