// NavigationEvents.js
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteTransitions() {
  const pathname = usePathname();

  const lastPathname = useRef(''); // Track the previous path


  useEffect(() => {
    // const url = `${pathname}?${searchParams}`;

     // Detect if the navigation is a "back" action
     if (lastPathname.current && lastPathname.current !== pathname) {
        document.documentElement.classList.add('back-transition'); // Add the class to <html>
      }
  
      // Start the transition and clear class afterward
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          // Custom DOM updates can go here
        })
        
        document.documentElement.classList.remove('back-transition'); // Clean up
      }
  
    lastPathname.current = pathname; // Update last pathname
  
  }, [pathname]);

  return null;
}

