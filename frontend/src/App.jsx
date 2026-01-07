import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import DogPage from "./DogPage";
//import AddDogPage from "./AddDogPage"; used hidden crud
import About from "./About";
import Crud from "./Crud";



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dogs/:id" element={<DogPage />} />
      {/* <Route path="/add-dog" element={<AddDogPage />} /> */}
      <Route path="/about" element={<About />} />
      <Route path="/Crud" element={<Crud />} />
    </Routes>
  );
}

export default App;
