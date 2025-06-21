'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LoadingBar } from './ui/loading-bar';

interface NavigationContextType {
  isNavigating: boolean;
  navigateTo: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Reset navigation state when pathname changes
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  const navigateTo = (path: string) => {
    if (path === pathname) return; // Don't navigate to the same page
    
    setIsNavigating(true);
    
    // Add a small delay to show the loading animation
    setTimeout(() => {
      router.push(path);
    }, 100);
  };

  return (
    <NavigationContext.Provider value={{ isNavigating, navigateTo }}>
      <LoadingBar />
      {children}
    </NavigationContext.Provider>
  );
} 