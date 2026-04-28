import { Link } from "react-router";
import "./App.css";

function App() {
  return (
    <main className="home">
      <section className="hero">
        <h1>Welcome</h1>
        <p>
          A small CRUD demo with authentication, MongoDB and React Router data
          APIs.
        </p>
        <Link className="cta" to="/posts">
          Browse posts
        </Link>
      </section>
    </main>
  );
}

export default App;
