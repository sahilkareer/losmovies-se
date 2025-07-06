"use client";
import { useEffect } from "react";

const CleverCoreScript = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.id = "CleverCoreLoader90330";
    script.src = "https://cdn-adtech.com/d2ee018dd6d6c1bb81f11b68753889b7.js";
    script.async = true;
    script.type = "text/javascript";
    script.setAttribute("data-target", window.name || document.body.id);
    script.setAttribute("data-callback", "put-your-callback-function-here");
    script.setAttribute("data-callback-url-click", "put-your-click-macro-here");
    script.setAttribute("data-callback-url-view", "put-your-view-macro-here");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No visible UI, just injecting the script
};

export default CleverCoreScript;
