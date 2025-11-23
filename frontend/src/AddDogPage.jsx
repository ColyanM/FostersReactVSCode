import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDogPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const newDog = { name, photoUrl, description };

    const response = await fetch("http://localhost:5052/api/dogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDog)
    });
    console.log("status:", response.status);

    if (response.ok) {
      navigate("/"); // Navigates back to the homepage
    } else {
      alert("Something went wrong adding the dog.");
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1>Add a New Dog</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input
          type="text"
          placeholder="Dog Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Photo URL"
          value={photoUrl}
          onChange={e => setPhotoUrl(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          rows="4"
        />

        <button type="submit">Add Dog</button>
      </form>
    </div>
  );
}

export default AddDogPage;
