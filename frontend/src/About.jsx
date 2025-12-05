import { Link } from "react-router-dom";

function About() {
  return (
    <div className="page">
      <div className="about-header">
        <Link to="/" className="back-link">← Home</Link>
        <h1>About</h1>
        <div className="header-space"></div>
      </div>

      <p>This site shows our foster dogs and their profiles.</p>
    </div>
  );
}

export default About;