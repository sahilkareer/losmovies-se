"use client";


import { useState, useEffect } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(isStandalone);

    if (!isStandalone) {
      // Listen for the `beforeinstallprompt` event
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault();
        setDeferredPrompt(e); // Save the event to trigger later
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null); // Clear the deferred prompt
      });
    }
  };

  // If the app is already installed, hide or disable the button
  if (isInstalled || !deferredPrompt) {
    return null; // Optionally return null to hide the button completely
  }

  return (
    <>
        <div className='cursor-pointer md:hidden rounded-sm mx-1 py-3 hover:text-c-primary bg-[#2b2b2b] pl-5 w-[97%] font-texts text-xl font-semibold transition duration-200'>
            <button onClick={handleInstallClick} disabled={!deferredPrompt} className="cursor-pointer">
                Install App
            </button>
        </div>
        <button onClick={handleInstallClick} disabled={!deferredPrompt} className="cursor-pointer max-md:hidden">
            Install App
        </button>
    </>
  );
}
