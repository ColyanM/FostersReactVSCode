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
    <div className="page">

      <div className="header-bar">
        <Link to="/about" className="about">+ About</Link>
        <h1>Mauis's Memories</h1>
        <Link to="/add-dog" className="add-dog-button">+ Add Dog</Link>
        

      </div>
      <div className="dog-grid">
        {dogs.map(dog => (
          <Link
            to={`/dogs/${dog.id}`}
            key={dog.id}
            className="dog-card"
          >
            <img
              src={dog.photoUrl}
              alt={dog.name}
            />
            <p>{dog.name}</p>
          </Link>
        ))}
      </div>

    </div>
  );

}

export default HomePage;
