import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo">🧬 Commit DNA</div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Dashboard</a>
          <a href="#">About</a>
        </div>

        <button className="nav-btn">Analyze Repo</button>
      </div>
    </nav>
  );
}

export default Navbar;