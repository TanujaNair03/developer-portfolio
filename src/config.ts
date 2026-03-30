export const config = {
    developer: {
        name: "Tanuja",
        fullName: "Tanuja Nair",
        title: "Data Scientist & AI Engineer",
        description: "B.Sc. Data Science & Applications | IIT Madras. I enjoy building end-to-end ML systems, agentic AI workflows, analytics products, and data-driven tools that solve real business problems."
    },
    social: {
        github: "TanujaNair03",
        email: "tanuja.nair13@gmail.com",
        location: "India"
    },
    about: {
        title: "About Me",
        description: "I recently graduated from IIT Madras, and was ranked in the Top 1% (6/800+) in Business Data Management Capstone and Top 2% (15/1300+) in my ML Project. I enjoy building end-to-end ML systems, agentic AI workflows, analytics products, and data-driven tools that solve real business problems. My core focus lies in Agentic AI, Applied Machine Learning, Computer Vision, MLOps, and Decision-focused Analytics."
    },
    experiences: [
        {
            position: "Data Science Intern",
            company: "Nestlé",
            period: "Nov 2024 - Oct 2025",
            location: "Chennai, India",
            description: "Engineered an automated fraud detection pipeline and built a 'Cost to Serve' BI dashboard.",
            responsibilities: [
                "Engineered an automated fraud detection pipeline for a large-scale dataset covering 9,00,000+ pan-India outlets identifying root causes of fraudulent activity to drive operational improvement.",
                "Built a 'Cost to Serve' Power BI dashboard to sales & strategy stakeholders, identifying granular cost optimisations signed off by the National Sales Controller for implementation.",
                "Developed a regression-based ML model to analyse promotion effectiveness and deliver actionable discount optimisation strategies across large-scale sales data."
            ],
            technologies: ["Python", "Power BI", "SQL", "Machine Learning", "Pipeline Development"]
        },
        {
            position: "Machine Learning Intern",
            company: "Ford Motor Company",
            period: "Aug 2022 - Feb 2023",
            location: "Chennai, India",
            description: "Built an end-to-end ML model for early identification of vehicle recall events.",
            responsibilities: [
                "Built an end-to-end ML model on US market product data for early identification of vehicle recall events, with robust data quality checks and statistical validation.",
                "Performed statistical analysis to identify key patterns in consumer behaviour, delivering actionable recommendations that directly optimised sales-channel strategy."
            ],
            technologies: ["Python", "Machine Learning", "Statistical Analysis", "Data Quality"]
        },
        {
            position: "Python Development Intern",
            company: "Learn With Leaders",
            period: "Sep 2021 - Feb 2022",
            location: "Chennai, India",
            description: "Developed automated data preprocessing modules and backend logic for an assessment tool.",
            responsibilities: [
                "Developed a standardised data preprocessing module in Python, automating cleaning tasks across all company projects and reducing manual effort by an average of 170 minutes per project.",
                "Engineered backend logic for a voice-interactive assessment tool using Google Cloud NLP, automating English proficiency grading for 1,000+ global users."
            ],
            technologies: ["Python", "Google Cloud NLP", "Automation", "Backend Logic"]
        }
    ],
    projects: [
        {
            id: 1,
            title: "Claims Adjudication Agent",
            category: "Agentic AI",
            technologies: "LangGraph, LangChain, FastAPI, Gemini 2.5 Flash, Streamlit",
            image: "/images/proj_1_claims.png",
            description: "Production-grade agentic medical claims engine with fraud detection, semantic clinical review, and live deployment.",
            link: "https://github.com/TanujaNair03/Claims_Adjucation_Agent"
        },
        {
            id: 2,
            title: "Agentic CX Support Router",
            category: "Agentic AI",
            technologies: "LangGraph, LangChain, ChromaDB, Gemini, Streamlit, pytest",
            image: "/images/proj_2_router.png",
            description: "Intent-routing workflow with RAG-powered FAQ retrieval, structured human-escalation payloads, heuristic fallback for quota failures, and pytest-validated routing logic.",
            link: "https://github.com/TanujaNair03/Customer-Experience-Agent"
        },
        {
            id: 3,
            title: "Production MLOps Pipeline",
            category: "MLOps",
            technologies: "FastAPI, GKE, Docker, GitHub Actions, Fairlearn, SHAP",
            image: "/images/proj_3_mlops.png",
            description: "Production ML system with CI/CD, HPA auto-scaling (1–3 pods), SHAP explainability, fairlearn bias auditing, Prometheus observability, and KS-test drift detection.",
            link: "https://github.com/TanujaNair03/Heart_Disease_Prediction-MLOps"
        },
        {
            id: 4,
            title: "Cricket Player Tracking",
            category: "Computer Vision",
            technologies: "YOLOv11, ByteTrack, OpenCV, Homography",
            image: "/images/proj_4_cricket.png",
            description: "Fine-tuned player detection with persistent multi-object tracking and 3D-to-2D spatial projection onto a bird's-eye field view.",
            link: "https://github.com/TanujaNair03/Cricket-Player-Tracking-Projection"
        },
        {
            id: 5,
            title: "Vision-Assist",
            category: "Computer Vision",
            technologies: "YOLOv8, ByteTrack, gTTS, OpenCV",
            image: "/images/proj_5_vision.png",
            description: "Navigation aid for the visually impaired fine-tuned on COCO + custom YouTube frames dataset; real-time multi-object tracking with distance estimation and spoken navigation cues.",
            link: "https://github.com/TanujaNair03/VisionAssist"
        },
        {
            id: 6,
            title: "Gemini RAG Chatbot",
            category: "Agentic AI",
            technologies: "LangChain, Gemini API, Streamlit, RAG",
            image: "/images/proj_6_rag.png",
            description: "Multi-mode chatbot using Google Gemini & Retrieval-Augmented Generation (RAG).",
            link: "https://github.com/TanujaNair03/gemini-rag-chatbot"
        },
        {
            id: 7,
            title: "HoneyComb Agents",
            category: "Agentic AI",
            technologies: "Python, Hive, LLM Agents",
            image: "/images/proj_7_honeycomb.png",
            description: "A growing collection of focused mini AI agents for HoneyComb-style bounties with structured outputs and Hive-based packaging.",
            link: "https://github.com/TanujaNair03/honeycomb-agents"
        },

        {
            id: 12,
            title: "Iris CI/CD Pipeline",
            category: "MLOps",
            technologies: "GitHub Actions, Docker, DVC",
            image: "/images/proj_8_iris.png",
            description: "Complete MLOps workflow with automated stress testing on GKE.",
            link: "https://github.com/TanujaNair03/mlops-course"
        },
        {
            id: 13,
            title: "SAVVY Finance",
            category: "Full Stack",
            technologies: "Vue.js, Flask, Redis",
            image: "/images/proj_9_savvy.png",
            description: "AI-powered financial literacy app for kids with automated progress reports.",
            link: "https://github.com/TanujaNair03/SAVVY"
        },
        {
            id: 14,
            title: "Sorted App",
            category: "Full Stack",
            technologies: "Flask, JavaScript, SQLite",
            image: "/images/proj_10_sorted.png",
            description: "Full-stack app connecting customers with service professionals.",
            link: "https://github.com/TanujaNair03/Sorted"
        }
    ],
    contact: {
        email: "tanuja.nair13@gmail.com",
        github: "https://github.com/TanujaNair03",
        linkedin: "https://www.linkedin.com/in/tanuja-nair-b36154210/",
        twitter: "",
        facebook: "",
        instagram: ""
    },
    skills: {
        develop: {
            title: "DATA SCIENTIST",
            description: "Building ML systems & AI solutions",
            details: "Specialised in Agentic AI, Computer Vision, and End-to-end Machine Learning pipelines. Experienced with Deep Learning and Recommendation Systems.",
            tools: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "NLP", "YOLOv8", "LangChain", "LangGraph", "ChromaDB", "Gemini 2.5"]
        },
        design: {
            title: "DATA & MLOPS",
            description: "Cloud infrastructure & visualization",
            details: "Deploying highly scalable models using Kubernetes and Docker. Managing data engineering with Cloud providers and designing meaningful Power BI dashboards.",
            tools: ["FastAPI", "Docker", "Kubernetes", "GCP", "Azure", "Power BI", "Tableau", "Streamlit", "SQL", "PySpark", "CI/CD"]
        }
    }
};


