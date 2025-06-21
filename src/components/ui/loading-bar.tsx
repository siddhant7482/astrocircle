'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);

    // Simulate loading progress
    const timer = setTimeout(() => {
      setProgress(30);
    }, 100);

    const timer2 = setTimeout(() => {
      setProgress(60);
    }, 300);

    const timer3 = setTimeout(() => {
      setProgress(90);
    }, 500);

    const timer4 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    }, 700);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      {/* Background track */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      {/* Loading bar with cosmic gradient */}
      <div 
        className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 shadow-lg transition-all duration-500 ease-out relative overflow-hidden"
        style={{ width: `${progress}%` }}
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-0 right-1/3 w-0.5 h-0.5 bg-purple-200 rounded-full animate-ping delay-300 opacity-60"></div>
        <div className="absolute top-0 left-2/3 w-0.5 h-0.5 bg-blue-200 rounded-full animate-ping delay-500 opacity-80"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-blue-400/50 blur-sm"></div>
      </div>
      
      {/* Cosmic particles floating above */}
      <div className="absolute -top-2 left-1/4 w-1 h-1 bg-purple-300 rounded-full animate-float opacity-60"></div>
      <div className="absolute -top-3 right-1/4 w-0.5 h-0.5 bg-blue-300 rounded-full animate-float-delayed opacity-50"></div>
      <div className="absolute -top-2 left-3/4 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-float-slow opacity-70"></div>
    </div>
  );
} 