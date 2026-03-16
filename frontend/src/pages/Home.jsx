import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";
import { useNavigate } from "react-router-dom";

 
function Home() {
   const navigate = useNavigate();

  const handleAnalyze = () => {
    navigate("/result");
  };

  useEffect(() => {
    // your mouse effect code
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.setProperty('--mouse-x', `${x}%`);
      document.body.style.setProperty('--mouse-y', `${y}%`);
    };

    const handleCardGlow = (e) => {
      const cards = document.querySelectorAll(".card, .step-card");
      for (const card of cards) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleCardGlow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleCardGlow);
    };
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="hero">
        <div className="hero-text">
          <h1>Understand Your Developer DNA</h1>
          <p>
            Analyze commit patterns, coding behavior,
            bug fixing trends, and burnout risks from
            GitHub repositories.
          </p>
          <div className="repo-input">
            <input type="text" placeholder="Enter GitHub Repository URL" />
            <button className="analyze-btn" onClick={handleAnalyze}>
  Analyze Repository
</button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Powerful Insights</h2>
        <div className="feature-grid">
          <div className="card">
            <h3>📊 Commit Activity</h3>
            <p>Track when developers are most active.</p>
          </div>
          <div className="card">
            <h3>🐞 Bug Detection</h3>
            <p>Identify bug fixing patterns.</p>
          </div>
          <div className="card">
            <h3>🧬 Developer DNA</h3>
            <p>Discover coding personality traits.</p>
          </div>
          <div className="card">
            <h3>⚠ Burnout Indicator</h3>
            <p>Detect unhealthy work patterns.</p>
          </div>
        </div>
      </section>

      <section className="steps">
        <h2>How It Works</h2>
        <div className="step-grid">
          <div className="step-card">
            <h3>1️⃣ Enter Repository</h3>
            <p>Paste your GitHub repo URL.</p>
          </div>
          <div className="step-card active-step"> 
            <h3>2️⃣ Analyze Commits</h3>
            <p>Our engine analyzes commit history.</p>
          </div>
          <div className="step-card">
            <h3>3️⃣ Get Developer DNA</h3>
            <p>View coding behavior insights.</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <div>
          <h3>500+</h3>
          <p>Commits Analyzed</p>
        </div>
        <div>
          <h3>50+</h3>
          <p>Developers Profiled</p>
        </div>
        <div>
          <h3>10+</h3>
          <p>Metrics Generated</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;