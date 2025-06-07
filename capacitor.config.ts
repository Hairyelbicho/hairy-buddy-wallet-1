
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b4a1c636712d4ca9ba2a6502078e208d',
  appName: 'hairy-buddy-wallet',
  webDir: 'dist',
  server: {
    url: 'https://b4a1c636-712d-4ca9-ba2a-6502078e208d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      androidxCore: '1.7.0',
      androidxAppcompat: '1.4.2',
      androidxWebkit: '1.4.0',
    }
  }
};

export default config;
