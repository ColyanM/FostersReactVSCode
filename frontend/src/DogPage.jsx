import { useParams } from "react-router-dom";

function DogPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Dog Details Page</h1>
      <p>You clicked dog #{id}</p>
    </div>
  );
}

export default DogPage;
