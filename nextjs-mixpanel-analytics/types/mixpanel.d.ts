import 'mixpanel-browser';

declare module 'mixpanel-browser' {
  interface Config {
    autotrack?: boolean;
  }
}