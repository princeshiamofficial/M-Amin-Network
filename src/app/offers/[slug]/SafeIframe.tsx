"use client";
import React, { useRef, useEffect } from "react";

interface SafeIframeProps {
  html: string;
}

export default function SafeIframe({ html }: SafeIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleResize = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc && doc.body) {
        const height = Math.max(
          doc.body.scrollHeight,
          doc.body.offsetHeight,
          doc.documentElement.clientHeight,
          doc.documentElement.scrollHeight,
          doc.documentElement.offsetHeight
        );
        iframe.style.height = height + "px";
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    handleResize();
  }, [html]);

  const handleLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      const iframe = e.currentTarget;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc && doc.body) {
        const observer = new ResizeObserver(() => {
          const h = Math.max(
            doc.body.scrollHeight,
            doc.body.offsetHeight,
            doc.documentElement.clientHeight,
            doc.documentElement.scrollHeight,
            doc.documentElement.offsetHeight
          );
          iframe.style.height = h + "px";
        });
        observer.observe(doc.body);
        
        const initialHeight = Math.max(
          doc.body.scrollHeight,
          doc.body.offsetHeight,
          doc.documentElement.clientHeight,
          doc.documentElement.scrollHeight,
          doc.documentElement.offsetHeight
        );
        iframe.style.height = initialHeight + "px";
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full">
      <iframe
        ref={iframeRef}
        title="Campaign Details HTML Content"
        srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><base target="_parent"/><style>html,body{overflow:hidden;margin:0;padding:0;background-color:transparent;}body{font-family:sans-serif;font-size:15px;color:#4b5563;line-height:1.625;}</style></head><body>${html}</body></html>`}
        className="w-full border-none bg-transparent overflow-hidden"
        style={{ height: "100px" }}
        scrolling="no"
        onLoad={handleLoad}
      />
    </div>
  );
}
