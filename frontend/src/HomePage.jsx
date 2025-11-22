import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5052/api/dogs")
      .then(response => response.json())
      .then(data => setDogs(data))
      .catch(err => console.error("Error fetching dogs:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Foster Dogs</h1>

      {/* Add Dog link at the top */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/add-dog">+ Add Dog</Link>
      </div>

      {dogs.length === 0 && <p>Loading...</p>}

      <div 
        className="dog-grid"
        style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px"
        }}
      >
        {dogs.map(dog => (
          <Link
            to={`/dogs/${dog.id}`}
            key={dog.id}
            className="dog-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img 
              src={dog.photoUrl} 
              alt={dog.name} 
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p style={{ textAlign: "center" }}>{dog.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
