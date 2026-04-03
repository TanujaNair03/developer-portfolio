import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const aboutText = config.about.description;

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <p className="landing-greeting">Hi, I'm Tanuja!</p>
        <div className="about-panel centered">
          <div className="about-box">
            <h3>About me</h3>
            <div className="about-body">
              <p className="about-body-copy">{aboutText}</p>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Landing;
