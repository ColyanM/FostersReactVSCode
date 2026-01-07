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

      <div className="about-photo-grid">
        <img
          src="/assets/Maui-1.jpeg"
        />
        <img
          src="/assets/Maui-2.JPG"
        /><img
          src="/assets/Maui-3.JPG"
        /><img
          src="/assets/Maui-4.jpg"
        /><img
          src="/assets/Maui-5.JPG"
          style={{ objectPosition: "bottom" }}
        /><img
          src="/assets/Maui-6.jpg"
        />
      </div>
    </div>
  );
}

export default About;