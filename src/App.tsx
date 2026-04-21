import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Posts from "./components/Posts";
import { DEFAULT_LIMIT } from "./constants/basic";
import PaginationButtons from "./components/PaginationButtons";
import Navbar from "./components/Navbar";

function App() {
  const [noOfPags, setNoOfPags] = useState(0);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [skip, setSkip] = useState(0);

  const editLimit = (e) => {
    setLimit(e.target.value ? e.target.value : DEFAULT_LIMIT);
  };
  const changePage = (e) => {
    setSkip(limit * (e.target.textContent - 1));
  };
  const pageCount = (data) => {
    setNoOfPags(Math.ceil(data.total / limit));
  };
  return (
    <>
      <div className="posts-page">
        <input
          type="number"
          className="limit-input"
          onInput={editLimit}
          placeholder="Default limit 10"
        />
        <Posts limit={limit} skip={skip} pageCount={pageCount} />
        <PaginationButtons
          noOfPags={noOfPags}
          onClick={changePage}
          skip={skip}
          limit={limit}
        />
      </div>
    </>
  );
}

export default App;
