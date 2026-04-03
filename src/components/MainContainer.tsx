import { PropsWithChildren, useEffect, useState } from "react";
import Career from "./Career";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import InteractiveGridBackground from "./ui/InteractiveGridBackground";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [isMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    
    // Auto-bind scroll triggers since the 3D loader was removed
    setTimeout(() => {
      import("./utils/GsapScroll").then((module) => {
        if (module.setAllTimeline) {
          module.setAllTimeline();
        }
      });
    }, 100);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <InteractiveGridBackground>
      <div className="container-main">
        <Cursor />
        <Navbar />
        {isDesktopView && !isMobile && children}
        <div className="container-main">
          <Landing />
          <Career />
          <Work />
        </div>
      </div>
    </InteractiveGridBackground>
  );
};

export default MainContainer;
