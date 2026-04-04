"use client";

import { Link } from "react-router-dom";
import { config } from "../config";
import CodeHoverCard from "../components/ui/CodeHoverCard";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all my projects and creations</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div
            className="myworks-card"
            key={project.id}
            data-cursor="disable"
            onClick={() => {
              if (project.link) {
                window.open(project.link, "_blank");
              }
            }}
            style={{ cursor: project.link ? "pointer" : "default" }}
          >
            <div className="myworks-card-number">0{index + 1}</div>
            <CodeHoverCard
              className="myworks-hover-card"
              href={project.link}
              borderRadius={28}
              minHeight={260}
            >
              <div className="myworks-card-info">
                <h3>{project.title}</h3>
                <p className="myworks-card-category">{project.category}</p>
              </div>
            </CodeHoverCard>
            <div className="myworks-card-tools">
              <h4>Tools and features</h4>
              <p>{project.technologies}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
