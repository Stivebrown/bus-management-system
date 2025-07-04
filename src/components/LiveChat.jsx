import React, { useEffect } from "react";

const LiveChat = () => {
  useEffect(() => {
    // Example: Tawk.to widget
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/64a7b2eccc26a871b02e4b2e/1h5g7k8k9"; // Example widget, replace with your own
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
};

export default LiveChat;
