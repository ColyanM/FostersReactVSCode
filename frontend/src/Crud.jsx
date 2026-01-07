import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5052/api/dogs";

function Crud() {
  //dropdown of dogs
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [createName, setCreateName] = useState("");
  const [createPhotoUrl, setCreatePhotoUrl] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createGender, setCreateGender] = useState("");

  const [selectedUpdateId, setSelectedUpdateId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updatePhotoUrl, setUpdatePhotoUrl] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateGender, setUpdateGender] = useState("");

  const [selectedDeleteId, setSelectedDeleteId] = useState("");
//load dogs from API (refreshes after changes)
  function loadDogs() {
    setLoading(true);
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        setDogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadDogs();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();

    const newDog = {
      name: createName,
      photoUrl: createPhotoUrl,
      description: createDescription,
      gender: createGender
    };

    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDog)
    });

    if (res.ok) {
      setMessage("Dog created successfully.");
      setCreateName("");
      setCreatePhotoUrl("");
      setCreateDescription("");
      setCreateGender("");
      loadDogs();
    } else {
      setMessage("Error creating dog.");
    }
  }

  function handleUpdateSelect(id) {
    setSelectedUpdateId(id);
    const dog = dogs.find(d => d.id === Number(id));
    if (!dog) return;

    setUpdateName(dog.name);
    setUpdatePhotoUrl(dog.photoUrl);
    setUpdateDescription(dog.description);
    setUpdateGender(dog.gender);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!selectedUpdateId) return;

    const updatedDog = {
      name: updateName,
      photoUrl: updatePhotoUrl,
      description: updateDescription,
      gender: updateGender
    };

    const res = await fetch(`${API_BASE}/${selectedUpdateId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDog)
    });

    if (res.ok) {
      setMessage("Dog updated successfully.");
      loadDogs();
    } else {
      setMessage("Error updating dog.");
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    if (!selectedDeleteId) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this dog?");
    if (!confirmDelete) return;

    const res = await fetch(`${API_BASE}/${selectedDeleteId}`, {
      method: "DELETE"
    });

    if (res.ok) {
      setMessage("Dog deleted successfully.");
      setSelectedDeleteId("");
      loadDogs();
    } else {
      setMessage("Error deleting dog.");
    }
  }

  return (
    <div className="page">
      <h1>CRUD Admin</h1>

      {message && <p>{message}</p>}
      {loading && <p>Loading dogs...</p>}

      <h2>Create Dog</h2>
      <form onSubmit={handleCreate}>
        <input placeholder="Name" value={createName} onChange={e => setCreateName(e.target.value)} required />
        <input placeholder="Photo URL" value={createPhotoUrl} onChange={e => setCreatePhotoUrl(e.target.value)} required />
        <textarea placeholder="Description" value={createDescription} onChange={e => setCreateDescription(e.target.value)} required />
        <input placeholder="Gender" value={createGender} onChange={e => setCreateGender(e.target.value)} required />
        <button type="submit">Create</button>
      </form>

      <h2>Update Dog</h2>
      <select value={selectedUpdateId} onChange={e => handleUpdateSelect(e.target.value)}>
        <option value="">Select dog</option>
        {dogs.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      {selectedUpdateId && (
        <form onSubmit={handleUpdate}>
          <input value={updateName} onChange={e => setUpdateName(e.target.value)} required />
          <input value={updatePhotoUrl} onChange={e => setUpdatePhotoUrl(e.target.value)} required />
          <textarea value={updateDescription} onChange={e => setUpdateDescription(e.target.value)} required />
          <input value={updateGender} onChange={e => setUpdateGender(e.target.value)} required />
          <button type="submit">Update</button>
        </form>
      )}

      <h2>Delete Dog</h2>
      <form onSubmit={handleDelete}>
        <select value={selectedDeleteId} onChange={e => setSelectedDeleteId(e.target.value)}>
          <option value="">Select dog</option>
          {dogs.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default Crud;
