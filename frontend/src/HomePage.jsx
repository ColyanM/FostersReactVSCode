import { useEffect, useState } from "react"; //hook for state and lifecycle
import { Link } from "react-router-dom"; //navigates without full page reload

function HomePage() {
  //list of dogs from the backend
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
        <div className="header-space"> </div>
        <h1 className = "header-title">Mauis's Memories</h1>
        <Link to="/about" className="about">About</Link>

        {/* <Link to="/add-dog" className="add-dog-button">+ Add Dog</Link> */}
        {/* Disabling for time being */}
        

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
