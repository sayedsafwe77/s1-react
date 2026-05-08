import { useCallback, useEffect, useState } from "react";
import Child1 from "../components/Child1";
import Child2 from "../components/Child2";

export default function Parent() {
  console.log("Parent rendered");
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(0);

  const handleCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme}
      </button>
      <Child1 handleCount={handleCount} count={count}></Child1>
      <Child2></Child2>
    </>
  );
}
