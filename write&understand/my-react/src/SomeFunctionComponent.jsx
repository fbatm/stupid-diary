import { useState } from "./myReact";

export default function () {
  const [count, setCount] = useState(0);

  function onClickCountButton() {
    // setCount(count + 1);
    setCount((pre) => pre + 1);
  }

  return (
    <>
      <h2>here is a function component</h2>
      <button onClick={onClickCountButton}>click to count</button>
      <em>{count}</em>
    </>
  );
}
