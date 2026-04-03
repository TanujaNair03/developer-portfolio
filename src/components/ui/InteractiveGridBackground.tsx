"use client";

import React, { useEffect, useRef, useState } from "react";
import "./styles/InteractiveGridBackground.css";

export interface InteractiveGridBackgroundProps
  extends React.HTMLProps<HTMLDivElement> {
  gridSize?: number;
  gridColor?: string;
  darkGridColor?: string;
  effectColor?: string;
  darkEffectColor?: string;
  trailLength?: number;
  width?: number;
  height?: number;
  idleSpeed?: number;
  glow?: boolean;
  glowRadius?: number;
  children?: React.ReactNode;
  showFade?: boolean;
  fadeIntensity?: number;
  idleRandomCount?: number; // ✅ how many random cells move during idle
}

const InteractiveGridBackground: React.FC<InteractiveGridBackgroundProps> = ({
  gridSize = 50,
  gridColor = "#b5aea4",
  darkGridColor = "#a79d92",
  effectColor = "rgba(233, 204, 177, 0.45)",
  darkEffectColor = "rgba(0, 0, 0, 0.35)",
  trailLength = 3,
  width,
  height,
  idleSpeed = 0.2,
  glow = true,
  glowRadius = 20,
  children,
  showFade = true,
  fadeIntensity = 20,
  idleRandomCount = 5,
  className,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light theme

  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const idleTargetsRef = useRef<{ x: number; y: number }[]>([]);
  const idlePositionsRef = useRef<{ x: number; y: number }[]>([]);
  const mouseActiveRef = useRef(false);
  const lastMouseTimeRef = useRef(Date.now());

  // Detect dark mode
  useEffect(() => {
    const updateDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    updateDarkMode();
    const observer = new MutationObserver(() => updateDarkMode());
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      // Since canvas is fixed, we can just use clientX/clientY relative to window if we want
      const rawX = e.clientX;
      const rawY = e.clientY;

      mouseActiveRef.current = true;
      lastMouseTimeRef.current = Date.now();

      const snappedX = Math.floor(rawX / gridSize);
      const snappedY = Math.floor(rawY / gridSize);

      const last = trailRef.current[0];
      if (!last || last.x !== snappedX || last.y !== snappedY) {
        trailRef.current.unshift({ x: snappedX, y: snappedY });
        if (trailRef.current.length > trailLength) trailRef.current.pop();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [gridSize, trailLength]);

  // Drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let canvasWidth = width || window.innerWidth;
    let canvasHeight = height || window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const handleResize = () => {
      if (!width) canvasWidth = window.innerWidth;
      if (!height) canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;

    const lineColor = isDarkMode ? darkGridColor : gridColor;
    const glowColor = isDarkMode ? darkEffectColor : effectColor;

    // Initialize idle positions
    idleTargetsRef.current = Array.from({ length: idleRandomCount }, () => ({
      x: Math.floor(Math.random() * (canvasWidth / gridSize)),
      y: Math.floor(Math.random() * (canvasHeight / gridSize)),
    }));
    idlePositionsRef.current = idleTargetsRef.current.map((p) => ({ ...p }));

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw grid lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvasWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }
      for (let y = 0; y <= canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
      }

      const cols = Math.floor(canvasWidth / gridSize);
      const rows = Math.floor(canvasHeight / gridSize);

      // Idle animation logic
      const idleThreshold = 2000;
      if (Date.now() - lastMouseTimeRef.current > idleThreshold) {
        mouseActiveRef.current = false;

        idlePositionsRef.current.forEach((pos, i) => {
          const target = idleTargetsRef.current[i];
          const dx = target.x - pos.x;
          const dy = target.y - pos.y;

          if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
            // new random target when reached
            idleTargetsRef.current[i] = {
              x: Math.floor(Math.random() * cols),
              y: Math.floor(Math.random() * rows),
            };
          } else {
            pos.x += dx * idleSpeed;
            pos.y += dy * idleSpeed;
          }

          const roundedX = Math.round(pos.x);
          const roundedY = Math.round(pos.y);
          const last = trailRef.current[0];
          if (!last || last.x !== roundedX || last.y !== roundedY) {
            trailRef.current.unshift({ x: roundedX, y: roundedY });
            if (trailRef.current.length > trailLength * idleRandomCount)
              trailRef.current.pop();
          }
        });
      }

      // Draw trail glow
      trailRef.current.forEach((cell, idx) => {
        const alpha = 1 - Math.min(1, idx * (1 / (trailLength + 1)));
        const rgbaColor = glowColor.replace(/[\d.]+\)$/g, `${alpha})`);

        ctx.fillStyle = rgbaColor;
        if (glow) {
          ctx.shadowColor = rgbaColor;
          ctx.shadowBlur = glowRadius;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillRect(cell.x * gridSize, cell.y * gridSize, gridSize, gridSize);
      });

      // reset shadow for next calls
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    gridSize,
    width,
    height,
    gridColor,
    darkGridColor,
    effectColor,
    darkEffectColor,
    isDarkMode,
    trailLength,
    idleSpeed,
    glow,
    glowRadius,
    idleRandomCount,
  ]);

  return (
    <div
      ref={containerRef}
      className={`interactive-grid-container ${className || ""}`}
      style={!className ? { width: width || "100%", height: height || "100%" } : undefined}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="interactive-grid-canvas"
      />

      {showFade && (
        <div
          className={`interactive-grid-fade ${isDarkMode ? "dark-bg" : "light-bg"}`}
          style={{
            maskImage: `radial-gradient(ellipse at center, transparent ${fadeIntensity}%, black)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, transparent ${fadeIntensity}%, black)`,
          }}
        />
      )}
      <div className="interactive-grid-content">{children}</div>
    </div>
  );
};

export default InteractiveGridBackground;
