"use client";

import React, { useEffect, useState, RefObject } from "react";

export interface MeteorsBeamProps {
  className?: string;
  containerRef: RefObject<any>;
  fromRef: RefObject<any>;
  toRef: RefObject<any>;
  curvature?: number;
  strokeWidth?: number;
  color?: string;
  meteorColor?: string;
  duration?: number;
  delay?: number;
  dashed?: boolean;
}

export const MeteorsBeam: React.FC<MeteorsBeamProps> = ({
  className = "",
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  strokeWidth = 2,
  color = "#0072ff",
  meteorColor = "#00f0ff",
  duration = 3,
  delay = 0,
  dashed = false,
}) => {
  const [coords, setCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [gradientId, setGradientId] = useState("");

  useEffect(() => {
    // Generate a unique gradient ID to avoid conflicts
    setGradientId(`beam-grad-${Math.random().toString(36).slice(2, 9)}`);
  }, []);

  useEffect(() => {
    const updateCoords = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const x1 = fromRect.left - containerRect.left + fromRect.width / 2;
      const y1 = fromRect.top - containerRect.top + fromRect.height / 2;
      const x2 = toRect.left - containerRect.left + toRect.width / 2;
      const y2 = toRect.top - containerRect.top + toRect.height / 2;

      setCoords({ x1, y1, x2, y2 });
    };

    updateCoords();

    // Use ResizeObserver for responsive recalculation
    let resizeObserver: ResizeObserver | null = null;
    if (typeof window !== "undefined" && window.ResizeObserver && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateCoords();
      });
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateCoords);
    return () => {
      window.removeEventListener("resize", updateCoords);
      if (resizeObserver && containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef, fromRef, toRef]);

  if (coords.x1 === 0 && coords.x2 === 0) return null;

  // Calculate Bezier Curve points
  const controlX = (coords.x1 + coords.x2) / 2;
  const controlY = (coords.y1 + coords.y2) / 2 - curvature;
  const pathD = `M ${coords.x1} ${coords.y1} Q ${controlX} ${controlY} ${coords.x2} ${coords.y2}`;

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="transparent" stopOpacity={0} />
          <stop offset="30%" stopColor={meteorColor} stopOpacity={1} />
          <stop offset="70%" stopColor={meteorColor} stopOpacity={1} />
          <stop offset="100%" stopColor="transparent" stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Static line (Connection path) */}
      <path
        d={pathD}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? "4 4" : undefined}
        opacity={dashed ? 0.25 : 0.35}
        fill="none"
      />

      {/* Animated laser beam (Meteor) */}
      {!dashed && (
        <>
          <path
            d={pathD}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth + 0.5}
            fill="none"
            strokeDasharray="60 200"
            className="meteor-beam-path"
            style={{
              animation: `lightswind-beam ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
          <style>{`
            @keyframes lightswind-beam {
              0% {
                stroke-dashoffset: 260;
              }
              100% {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </>
      )}
    </svg>
  );
};
