import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

function Home() {
  return (
    <>
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
            <input
              type="text"
              placeholder="Enter GitHub Repository URL"
            />

            <button>Analyze Repository</button>
          </div>
        </div>

      </section>

      {/* FEATURES */}

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

      {/* HOW IT WORKS */}

      <section className="steps">

        <h2>How It Works</h2>

        <div className="step-grid">

          <div>
            <h3>1️⃣ Enter Repository</h3>
            <p>Paste your GitHub repo URL.</p>
          </div>

          <div>
            <h3>2️⃣ Analyze Commits</h3>
            <p>Our engine analyzes commit history.</p>
          </div>

          <div>
            <h3>3️⃣ Get Developer DNA</h3>
            <p>View coding behavior insights.</p>
          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="stats">

        <div>
          <h2>500+</h2>
          <p>Commits Analyzed</p>
        </div>

        <div>
          <h2>50+</h2>
          <p>Developers Profiled</p>
        </div>

        <div>
          <h2>10+</h2>
          <p>Metrics Generated</p>
        </div>

      </section>

      <Footer />

    </>
  );
}

export default Home;