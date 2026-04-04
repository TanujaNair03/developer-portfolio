"use client";

import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { FaGithub } from "react-icons/fa";

export interface CodeHoverCardProps {
  href?: string;
  className?: string;
  borderRadius?: number;
  maskRadius?: number;
  minHeight?: number;
  randomCharacters?: string;
  animationDuration?: number;
  children?: React.ReactNode;
}

const DEFAULT_CHARSET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const CodeHoverCard: React.FC<CodeHoverCardProps> = ({
  href,
  className,
  borderRadius = 28,
  maskRadius = 260,
  minHeight = 260,
  randomCharacters = DEFAULT_CHARSET,
  animationDuration = 0.4,
  children,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [randomText, setRandomText] = useState("");
  const cardRef = useRef<HTMLDivElement | null>(null);

  const generateRandomString = (rows = 30, lineLength = 60) => {
    const lines: string[] = [];
    for (let row = 0; row < rows; row += 1) {
      const lineChars = Array.from({ length: lineLength }, () =>
        randomCharacters[Math.floor(Math.random() * randomCharacters.length)]
      ).join("");
      lines.push(lineChars);
    }
    return lines.join("\n");
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = Math.max(10, event.clientX - rect.left);
    const y = Math.max(10, event.clientY - rect.top);
    setPosition({ x, y });
    setRandomText(generateRandomString());
  };

  const handleCardClick = () => {
    if (href) {
      window.open(href, "_blank");
    }
  };

  const maskStyle = {
    maskImage: `radial-gradient(${maskRadius}px circle at ${position.x}px ${position.y}px, #000 20%, rgba(0,0,0,0.25), transparent)`,
    WebkitMaskImage: `radial-gradient(${maskRadius}px circle at ${position.x}px ${position.y}px, #000 20%, rgba(0,0,0,0.25), transparent)`,
    transition: `mask-position ${animationDuration}s ease, -webkit-mask-position ${animationDuration}s ease`,
  };

  return (
    <div className={cn("code-hover-card", className)}>
      <div
        ref={cardRef}
        className="code-hover-core"
        style={{ borderRadius, minHeight }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRandomText("")}
        onClick={handleCardClick}
      >
        <div className="code-hover-icon">
          <FaGithub size={36} />
        </div>

        <div className="code-hover-overlay" style={{ ...maskStyle }}>
          {randomText}
        </div>
      </div>

      {children && <div className="code-hover-info">{children}</div>}
    </div>
  );
};

export default CodeHoverCard;
