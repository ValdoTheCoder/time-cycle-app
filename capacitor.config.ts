import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.intervaltimer',
  appName: 'Interval Timer',
  webDir: 'dist',
  server: {
    url: 'https://b17ceb30-36f5-4dea-82b7-1ae964ee2ad9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
