import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import DogPage from "./DogPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dogs/:id" element={<DogPage />} />
    </Routes>
  );
}

export default App;
