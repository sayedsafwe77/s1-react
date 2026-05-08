import { memo } from "react";

function Child1({ handleCount, count }) {
  console.log("Child1 rendered");

  return (
    <>
      <h1>Child1 Page</h1>
      <button onClick={handleCount}>{count}</button>
    </>
  );
}
export default memo(Child1);
