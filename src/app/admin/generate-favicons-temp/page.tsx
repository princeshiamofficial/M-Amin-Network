"use client";

import React, { useEffect, useState } from "react";

export default function GenerateFaviconsTemp() {
  const [status, setStatus] = useState<string[]>([]);

  useEffect(() => {
    const generate = async () => {
      const log = (msg: string) => setStatus((prev) => [...prev, msg]);
      log("Starting favicon generation...");

      const img = new Image();
      img.src = "/xlogo.png";
      img.crossOrigin = "anonymous";

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("Failed to load /xlogo.png"));
      });

      log("Loaded /xlogo.png successfully.");

      const targets = [
        { name: "favicon.ico", size: 32 }, // Browser standard favicon
        { name: "favicon-16x16.png", size: 16 },
        { name: "favicon-32x32.png", size: 32 },
        { name: "apple-touch-icon.png", size: 180 }, // Apple devices
        { name: "android-chrome-192x192.png", size: 192 }, // Android standard
        { name: "android-chrome-512x512.png", size: 512 }, // Android splash
      ];

      for (const target of targets) {
        log(`Generating ${target.name} (${target.size}x${target.size})...`);
        const canvas = document.createElement("canvas");
        canvas.width = target.size;
        canvas.height = target.size;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          log(`Failed to get canvas context for ${target.name}`);
          continue;
        }

        // Draw image resized
        ctx.drawImage(img, 0, 0, target.size, target.size);

        // Export to data URL
        const dataUrl = canvas.toDataURL("image/png");

        // Send to API
        try {
          const res = await fetch("/api/save-favicon", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: target.name,
              base64: dataUrl,
            }),
          });
          const result = await res.json();
          if (result.success) {
            log(`Successfully saved ${target.name}!`);
          } else {
            log(`Error saving ${target.name}: ${result.error}`);
          }
        } catch (e: any) {
          log(`Network error saving ${target.name}: ${e.message}`);
        }
      }

      log("Favicon generation process completed!");
    };

    generate();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", background: "#111", color: "#eee", minHeight: "100vh" }}>
      <h1>Favicon Generator (Temporary)</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
        {status.map((msg, index) => (
          <div key={index} style={{ padding: "8px 12px", background: "#222", borderLeft: "4px solid #00bcd4", borderRadius: 4 }}>
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
