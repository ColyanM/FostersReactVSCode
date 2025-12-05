import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function DogPage() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {//takes the dogs ID to pull their information from the db
    fetch(`http://localhost:5052/api/dogs/${id}`)
      .then(response => response.json())
      .then(data => {
        setDog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching dog:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!dog) return <p>Dog not found.</p>;

return (
  <div
    style={{
      maxWidth: "800px",
      margin: "50px auto",
      padding: "20px",
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    }}
  >
    <h1 style={{ fontSize: "48px", marginBottom: "30px" }}>{dog.name}</h1>

    <img
      src={dog.photoUrl}
      alt={dog.name}
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "auto",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
      }}
    />

    <p
      style={{
        marginTop: "30px",
        fontSize: "20px",
        lineHeight: "1.6",
        color: "#333"
      }}
    >
      {dog.description}
    </p>

    <div style={{ marginTop: "40px" }}>
      <Link to="/" style={{ fontSize: "18px", textDecoration: "none", color: "#4a4aff" }}>
        ← Back to Home
      </Link>
    </div>
  </div>
);

}

export default DogPage;
