import React from 'react';
import './result.css';

const ResultPage = () => {
  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo"><strong>Commit DNA</strong></div>
        <div className="nav-links">
          <button>Home</button>
          <button>Dashboard</button>
          <button>About</button>
        </div>
      </nav>

      {/* Main Insights Card */}
      <div className="main-card">
        <h2 className="card-header">Developer DNA Core: Insights & Activity</h2>
        
        <div className="stats-grid">
          {/* Left: Profile Info */}
          <div className="profile-info">
            <h1>Ankit</h1>
            <p>Developer Name</p>
            <div className="total-commits">320</div>
            <p>Total Commits</p>
          </div>

          {/* Right: Commit Behavior */}
          <div className="commit-behavior">
            <h3>Commit Behavior</h3>
            <div className="behavior-grid">
              <div className="stat-item"><span>Bugs:</span> <strong>8.7%</strong></div>
              <div className="stat-item"><span>Feature:</span> <strong>5.1%</strong></div>
              <div className="stat-item"><span>Bug Rate:</span> <strong>8.7%</strong></div>
              <div className="stat-item"><span>Features:</span> <strong>51%</strong></div>
              <div className="stat-item"><span>Refactor Rate:</span> <strong>5.2%</strong></div>
              <div className="stat-item"><span>Ease:</span> <strong>5.2%</strong></div>
            </div>
            <div className="weekend-tag">Weekend Coding (15%)</div>
          </div>
        </div>
      </div>

      {/* Bottom Layout */}
      <div className="bottom-grid">
        <div className="sub-card">
          <h3>Primary Dev Language: <span className="highlight-text">Javascript</span></h3>
          <p>Focus Area: <strong>UI/UX</strong></p>
          <p>Code Velocity: <span style={{color: 'green'}}>High</span></p>
        </div>
        
        <div className="sub-card">
          <h3>Recent Activity Trend</h3>
          <div style={{height: '100px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8'}}>
            [Chart Area - Daily vs Weekly]
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;