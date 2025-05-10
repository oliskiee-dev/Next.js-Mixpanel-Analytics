'use client';

import { useEffect, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { initMixpanel, trackPageView, initScrollTracking } from "@/lib/mixpanel";

export function MixpanelProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();

  // Initialize Mixpanel once on mount
  useEffect(() => {
    initMixpanel();
  }, []);

  // Track page views when pathname changes
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  // Initialize scroll tracking
  useEffect(() => {
    const cleanup = initScrollTracking();
    return cleanup;
  }, []);

  return <>{children}</>;
}