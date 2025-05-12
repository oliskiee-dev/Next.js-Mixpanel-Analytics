'use client';

import { useEffect, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { initMixpanel } from "@/lib/mixpanel";
import mixpanel from 'mixpanel-browser';

export function MixpanelProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();

  // Initialize Mixpanel once on mount
  useEffect(() => {
    const mp = initMixpanel();
    
    // Track the initial page view
    if (mp && pathname) {
      mp.track('Page View', {
        page: pathname,
        url: window.location.href,
        referrer: document.referrer
      });
    }
    
    // Also expose mixpanel to window for debugging and better autocapture
    if (typeof window !== 'undefined') {
      (window as any).mixpanel = mixpanel;
    }
  }, []);
  
  // Track page views when pathname changes
  useEffect(() => {
    if (pathname && mixpanel) {
      mixpanel.track('Page View', {
        page: pathname,
        url: window.location.href,
        referrer: document.referrer
      });
    }
  }, [pathname]);

  return <>{children}</>;
}