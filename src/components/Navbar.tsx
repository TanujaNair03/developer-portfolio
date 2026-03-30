import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import { config } from "../config";
import "./styles/Navbar.css";
import { FaGithub } from "react-icons/fa6";
import { ShimmerButton } from "./ui/ShimmerButton";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.stop();
    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    let links = document.querySelectorAll(".header ul a.scroll-link");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section && lenis) {
            const target = document.querySelector(section) as HTMLElement;
            if (target) {
              lenis.scrollTo(target, {
                offset: 0,
                duration: 1.5,
              });
            }
          }
        }
      });
    });

    window.addEventListener("resize", () => {
      lenis?.resize();
    });

    return () => {
      lenis?.destroy();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Tanuja
        </a>
        <a
          href={`mailto:${config.social.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {config.social.email}
        </a>
        <ul className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <li>
            <a data-href="#career" href="#career" className="scroll-link">
              <HoverLinks text="EXPERIENCE" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work" className="scroll-link">
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li>
            <a 
              href={config.contact.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#fff', textDecoration: 'none' }}
              data-cursor="pointer"
            >
              <FaGithub />
            </a>
          </li>
          <li>
            <a 
              href={config.contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              data-cursor="pointer"
              style={{ textDecoration: 'none' }}
            >
              <ShimmerButton>Hire Me</ShimmerButton>
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
