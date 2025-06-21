'use client';

import { ReactNode, MouseEvent } from 'react';
import { useNavigation } from './NavigationProvider';

interface SmoothLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SmoothLink({ href, children, className, onClick }: SmoothLinkProps) {
  const { navigateTo } = useNavigation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (onClick) {
      onClick();
    }
    
    navigateTo(href);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
} 