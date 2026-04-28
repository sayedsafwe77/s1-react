import React, { useState } from "react";
import "./App.css";
import Posts from "./components/Posts";
import { DEFAULT_LIMIT } from "./constants/basic";
import PaginationButtons from "./components/PaginationButtons";
import type { TodoResponse } from "./types/basic";

function App() {
  const [noOfPags, setNoOfPags] = useState(0);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [skip, setSkip] = useState(0);

  const editLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(e.target.value ? +e.target.value : DEFAULT_LIMIT);
  };
  const changePage = (e: React.MouseEvent) => {
    const btnText = parseInt(
      (e.target as HTMLButtonElement).textContent ?? "1"
    );
    setSkip(limit * (btnText - 1));
  };
  const pageCount = (data: TodoResponse) => {
    setNoOfPags(Math.ceil(data.total / limit));
  };
  return (
    <>
      <div className="posts-page">
        <input
          type="number"
          className="limit-input"
          onChange={editLimit}
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
