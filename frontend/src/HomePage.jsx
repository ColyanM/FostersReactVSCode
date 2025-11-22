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
    <div>
      <h1>Foster Dogs</h1>

      {dogs.length === 0 && <p>Loading...</p>}

      <div className="dog-grid">
        {dogs.map(dog => (
          <Link 
            to={`/dogs/${dog.id}`} 
            key={dog.id} 
            className="dog-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src={dog.photoUrl} alt={dog.name} />
            <p>{dog.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
