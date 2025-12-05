import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import DogPage from "./DogPage";
import AddDogPage from "./AddDogPage";
import About from "./About";



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dogs/:id" element={<DogPage />} />
      <Route path="/add-dog" element={<AddDogPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
