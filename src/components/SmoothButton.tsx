'use client';

import { ReactNode } from 'react';
import { Button } from './ui/button';
import { useNavigation } from './NavigationProvider';

interface SmoothButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClick?: () => void;
}

export function SmoothButton({ 
  href, 
  children, 
  variant = 'default', 
  size = 'default', 
  className, 
  onClick 
}: SmoothButtonProps) {
  const { navigateTo } = useNavigation();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    
    navigateTo(href);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
} 