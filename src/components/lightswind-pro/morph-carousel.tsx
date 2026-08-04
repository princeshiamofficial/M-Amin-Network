"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import NextImage from "next/image";

export interface MorphCarouselProps {
  className?: string;
  images?: string[];
  autoplay?: boolean;
  autoplayInterval?: number;
  aspectRatio?: string;
  showPagination?: boolean;
}

// Fallback procedural gradient color schemes (in case no images are supplied or fail to load)
const PROCEDURAL_GRADIENTS = [
  { c1: [0.03, 0.05, 0.15], c2: [0.0, 0.94, 1.0] }, // Cyber Cyan
  { c1: [0.03, 0.05, 0.15], c2: [0.0, 0.45, 1.0] }, // Cyber Blue
  { c1: [0.05, 0.03, 0.15], c2: [0.55, 0.0, 1.0] }, // Neon Purple
  { c1: [0.03, 0.08, 0.10], c2: [0.1, 0.9, 0.55] }, // BGP Green
];

const DEFAULT_HERO_SLIDES: string[] = [];

export const MorphCarousel: React.FC<MorphCarouselProps> = ({
  className = "",
  images = [],
  autoplay = true,
  autoplayInterval = 5000,
  aspectRatio = "aspect-video",
  showPagination = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionProgress = useRef(0);
  const targetProgress = useRef(0);
  const activeTextureIndex = useRef(0);
  const nextTextureIndex = useRef(0);

  const activeSlides = images && images.length > 0 ? images : DEFAULT_HERO_SLIDES;
  const imagesKey = JSON.stringify(activeSlides);
  const totalSlides = activeSlides.length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported in this browser.");
      return;
    }

    // Vertex Shader
    const vsSource = `
      attribute vec2 position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = position * 0.5 + 0.5;
        // Flip Y coordinates for WebGL texture orientation
        v_texCoord.y = 1.0 - v_texCoord.y;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: High-performance Noise-based Liquid Morph Shader
    const fsSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      
      uniform float u_progress;
      uniform float u_time;
      uniform int u_useTextures;
      
      uniform sampler2D u_texActive;
      uniform sampler2D u_texNext;
      
      uniform vec3 u_colorActive1;
      uniform vec3 u_colorActive2;
      uniform vec3 u_colorNext1;
      uniform vec3 u_colorNext2;

      // Pseudo-random noise function
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // Smooth noise interpolation
      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f); // Quintic easing
        
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      // Fractal Brownian Motion
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Rotate to reduce axial bias
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * smoothNoise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = v_texCoord;
        
        // Liquid distortion calculations (FBM turbulence)
        vec2 flow1 = vec2(
          fbm(uv * 4.0 + vec2(u_time * 0.1, u_time * 0.08)),
          fbm(uv * 4.0 - vec2(u_time * 0.07, u_time * 0.12))
        );
        
        vec2 flow2 = vec2(
          fbm(uv * 6.0 + vec2(u_time * 0.15, -u_time * 0.1)),
          fbm(uv * 6.0 + vec2(-u_time * 0.08, u_time * 0.13))
        );

        // Calculate warp vector scaled by progress curve (sine wave)
        float warpScale = sin(u_progress * 3.14159265);
        vec2 warpActive = flow1 * 0.12 * u_progress;
        vec2 warpNext = flow2 * 0.12 * (1.0 - u_progress);
        
        vec2 uvActive = uv + warpActive;
        vec2 uvNext = uv - warpNext;

        vec4 colActive;
        vec4 colNext;

        if (u_useTextures == 1) {
          colActive = texture2D(u_texActive, uvActive);
          colNext = texture2D(u_texNext, uvNext);
        } else {
          // Render highly premium procedural cyber grids and gradients
          float gridActive = step(0.98, fract(uvActive.x * 25.0)) + step(0.98, fract(uvActive.y * 25.0));
          float gridNext = step(0.98, fract(uvNext.x * 25.0)) + step(0.98, fract(uvNext.y * 25.0));

          vec3 gradActive = mix(u_colorActive1, u_colorActive2, uvActive.y + flow1.x * 0.3);
          gradActive += vec3(gridActive * 0.03); // add subtle high-tech grid overlay

          vec3 gradNext = mix(u_colorNext1, u_colorNext2, uvNext.y + flow2.y * 0.3);
          gradNext += vec3(gridNext * 0.03);

          colActive = vec4(gradActive, 1.0);
          colNext = vec4(gradNext, 1.0);
        }

        // Final morphing crossfade
        gl_FragColor = mix(colActive, colNext, u_progress);
      }
    `;

    // Helper: Compile Shader
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup Quad geometry
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Get Uniforms locations
    const uProgressLoc = gl.getUniformLocation(program, "u_progress");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uUseTexturesLoc = gl.getUniformLocation(program, "u_useTextures");
    
    // Gradient uniforms
    const uColorActive1Loc = gl.getUniformLocation(program, "u_colorActive1");
    const uColorActive2Loc = gl.getUniformLocation(program, "u_colorActive2");
    const uColorNext1Loc = gl.getUniformLocation(program, "u_colorNext1");
    const uColorNext2Loc = gl.getUniformLocation(program, "u_colorNext2");

    const uTexActiveLoc = gl.getUniformLocation(program, "u_texActive");
    const uTexNextLoc = gl.getUniformLocation(program, "u_texNext");

    // Enable WebGL alpha blending for transparent fallbacks
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Texture setup and loading
    const textures: WebGLTexture[] = [];
    const useTextures = activeSlides.length > 0;
    gl.uniform1i(uUseTexturesLoc, useTextures ? 1 : 0);

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const newWidth = Math.max(1, Math.floor(rect.width * dpr));
      const newHeight = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
      }
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(canvas);
    window.addEventListener("resize", resizeCanvas);

    // Define drawFrame prior to texture load callbacks
    let animationFrameId: number;
    let isVisible = true;
    const startTime = Date.now();

    const drawFrame = () => {
      if (!isVisible) return;

      const currentTime = (Date.now() - startTime) / 1000;

      if (isTransitioning) {
        const diff = targetProgress.current - transitionProgress.current;
        if (Math.abs(diff) < 0.005) {
          transitionProgress.current = targetProgress.current;
          setIsTransitioning(false);
          activeTextureIndex.current = nextTextureIndex.current;
          transitionProgress.current = 0;
          targetProgress.current = 0;
        } else {
          transitionProgress.current += diff * 0.08;
        }
      }

      gl.uniform1f(uProgressLoc, transitionProgress.current);
      gl.uniform1f(uTimeLoc, currentTime);

      if (useTextures) {
        if (textures[activeTextureIndex.current]) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, textures[activeTextureIndex.current]);
          gl.uniform1i(uTexActiveLoc, 0);
        }
        if (textures[nextTextureIndex.current]) {
          gl.activeTexture(gl.TEXTURE1);
          gl.bindTexture(gl.TEXTURE_2D, textures[nextTextureIndex.current]);
          gl.uniform1i(uTexNextLoc, 1);
        }
      } else {
        const currentGrad = PROCEDURAL_GRADIENTS[activeTextureIndex.current];
        const nextGrad = PROCEDURAL_GRADIENTS[nextTextureIndex.current];

        gl.uniform3fv(uColorActive1Loc, currentGrad.c1);
        gl.uniform3fv(uColorActive2Loc, currentGrad.c2);
        gl.uniform3fv(uColorNext1Loc, nextGrad.c1);
        gl.uniform3fv(uColorNext2Loc, nextGrad.c2);
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (isTransitioning) {
        animationFrameId = requestAnimationFrame(drawFrame);
      }
    };

    if (useTextures) {
      const loadTexture = (url: string) => {
        const tex = gl.createTexture();
        if (!tex) return null;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        
        // 1x1 transparent fallback pixel while loading so HTML NextImage shows through
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

        const img = new Image();
        const isRelative = url.startsWith("/");
        const isData = url.startsWith("data:");
        const isSameOrigin = typeof window !== "undefined" && (url.startsWith(window.location.origin) || url.startsWith("http://localhost") || url.startsWith("http://127.0.0.1"));
        if (!isData && !isRelative && !isSameOrigin) {
          img.crossOrigin = "anonymous";
        }

        const updateTexture = () => {
          try {
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            drawFrame();
          } catch (e) {
            console.warn("Failed to update WebGL texture:", e);
          }
        };

        img.onload = updateTexture;
        img.onerror = () => {
          console.warn("Failed to load WebGL texture for:", url);
        };
        img.src = url;

        if (img.complete && img.naturalWidth > 0) {
          updateTexture();
        }

        return tex;
      };

      activeSlides.forEach((url) => {
        const tex = loadTexture(url);
        if (tex) textures.push(tex);
      });
    }

    // Visibility handlers
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) drawFrame();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && !document.hidden;
      if (isVisible) drawFrame();
    }, { threshold: 0.01 });
    intersectionObserver.observe(canvas);

    drawFrame();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      resizeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      textures.forEach((tex) => {
        if (tex) gl.deleteTexture(tex);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesKey]);

  // Handle slide transitions
  const triggerTransition = useCallback((targetIndex: number) => {
    if (isTransitioning) return;
    nextTextureIndex.current = targetIndex;
    targetProgress.current = 1.0;
    setIsTransitioning(true);
    setActiveIndex(targetIndex);
  }, [isTransitioning]);

  // Autoplay hook
  useEffect(() => {
    if (!autoplay || isTransitioning) return;

    const timer = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      const nextIdx = (activeIndex + 1) % totalSlides;
      triggerTransition(nextIdx);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [autoplay, activeIndex, isTransitioning, totalSlides, activeSlides, autoplayInterval, triggerTransition]);

  const isCurrentGif = activeSlides[activeIndex] && activeSlides[activeIndex].toLowerCase().endsWith(".gif");

  return (
    <div className={`relative w-full h-full overflow-hidden ${aspectRatio} ${className}`}>
      {/* HTML Image Layer for 100% Reliable Image Rendering */}
      {activeSlides.map((src, idx) => (
        <div
          key={src + idx}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            activeIndex === idx ? "opacity-90 z-0" : "opacity-0 z-0"
          }`}
        >
          <NextImage
            src={src}
            alt={`Hero slide ${idx + 1}`}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover pointer-events-none"
          />
        </div>
      ))}

      {/* WebGL Morph Canvas on top for liquid animations */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full block pointer-events-none z-1 transition-opacity duration-500 ${
          isCurrentGif ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* HTML Image fallback for animated GIFs */}
      {(images || []).map((src, idx) => {
        const isGif = src.toLowerCase().endsWith(".gif");
        if (!isGif) return null;
        return (
          <div
            key={src + idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              activeIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <NextImage
              src={src}
              alt="Animated slide"
              fill
              unoptimized
              className="object-cover pointer-events-none"
            />
          </div>
        );
      })}
      
      {/* Background overlay matrix dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Slide Navigation Pagination */}
      {showPagination && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 px-4 py-2 rounded-full bg-brand-dark/50 border border-brand-border/40 backdrop-blur-md">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => triggerTransition(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "bg-brand-cyan scale-125 shadow-[0_0_8px_#00f0ff]"
                  : "bg-slate-500 hover:bg-slate-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

