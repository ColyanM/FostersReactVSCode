import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DogPage.css";

function DogPage() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5052/api/dogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setDog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading dog:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!dog) return <p>Dog not found.</p>;

  const extraPhotos = dog.photos || [];

  return (
    <div className="dog-page-container">
      <div className="dog-header">
        <h1 className="dog-title">{dog.name}</h1>
        <Link to="/" className="dog-back-link">
          ← Back to Home
        </Link>
      </div>

      <p className="dog-description">{dog.description}</p>

      {extraPhotos.length > 0 && (
        <>
          <h2 className="dog-photo-section-title">
            More photos of {dog.name}
          </h2>

          <div className="dog-photo-grid">
            {extraPhotos.map(photo => (
              <div className="dog-photo-card" key={photo.id}>
                <img
                  src={photo.url}
                  alt={photo.caption || dog.name}
                />
                {photo.caption && (
                  <p className="dog-photo-caption">{photo.caption}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DogPage;
