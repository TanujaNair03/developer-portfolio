import { PropsWithChildren, useEffect, useRef } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (videoRef.current && videoRef.current.duration) {
        const percentage = e.clientX / window.innerWidth;
        targetTime = percentage * videoRef.current.duration;
      }
    };

    const animateVideo = () => {
      if (videoRef.current) {
        // Add a slight lerp for super smooth head movement easing
        const current = videoRef.current.currentTime;
        // If the difference is big enough, move towards target
        if (Math.abs(current - targetTime) > 0.01) {
          videoRef.current.currentTime = current + (targetTime - current) * 0.2;
        }
      }
      animationFrameId = requestAnimationFrame(animateVideo);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animateVideo);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>

          <div className="hero-avatar">
            <video 
              ref={videoRef}
              src="/images/memoji.mov"
              muted
              playsInline
              preload="auto"
              style={{ 
                height: '100%', 
                width: 'auto', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 40px rgba(194, 164, 255, 0.4))'
              }}
            />
          </div>

          <div className="landing-info">
            <h3>An</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">ML Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Data Scientist</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
