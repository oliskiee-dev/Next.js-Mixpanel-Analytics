import { trackEvent, identifyUser } from '@/lib/mixpanel';

export const useMixpanel = () => {
  const track = (eventName: string, properties?: Record<string, any>) => {
    trackEvent(eventName, properties);
  };

  const identify = (userId: string, userProperties?: Record<string, any>) => {
    identifyUser(userId, userProperties);
  };

  return {
    track,
    identify
  };
};