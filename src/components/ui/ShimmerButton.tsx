import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import "./styles/ShimmerButton.css";

export interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  backgroundColor?: string;
}

export const ShimmerButton = ({
  children,
  className,
  shimmerColor = "rgba(255, 255, 255, 0.2)",
  shimmerSize = "50%",
  backgroundColor = "transparent",
}: ShimmerButtonProps) => {
  return (
    <button
      className={cn("shimmer-btn-group", className)}
      style={{
        backgroundColor,
      }}
    >
      {/* Moving Shimmer Overlay */}
      <motion.div
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "linear",
        }}
        className="shimmer-overlay"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
          width: shimmerSize,
          opacity: 0.8,
        }}
      />
      
      {/* Persistent Glow */}
      <div className="shimmer-persistent-glow" />
      
      <span className="shimmer-content">
        {children}
      </span>
      
      {/* Animated Border Reveal */}
      <div className="shimmer-border-reveal" />
    </button>
  );
};
