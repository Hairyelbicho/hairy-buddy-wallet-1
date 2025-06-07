
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

interface PlatformInfo {
  isMobile: boolean;
  isWeb: boolean;
  isExtension: boolean;
  platform: 'web' | 'android' | 'ios' | 'extension';
}

export const usePlatform = (): PlatformInfo => {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    isMobile: false,
    isWeb: true,
    isExtension: false,
    platform: 'web'
  });

  useEffect(() => {
    const detectPlatform = () => {
      const isCapacitor = Capacitor.isNativePlatform();
      const isExtension = !!(window as any).chrome?.extension || !!(window as any).browser?.extension;
      const platform = Capacitor.getPlatform();
      
      setPlatformInfo({
        isMobile: isCapacitor,
        isWeb: !isCapacitor && !isExtension,
        isExtension,
        platform: isExtension ? 'extension' : platform as 'web' | 'android' | 'ios'
      });
    };

    detectPlatform();
  }, []);

  return platformInfo;
};
