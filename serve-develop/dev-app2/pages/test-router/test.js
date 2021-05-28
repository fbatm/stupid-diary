import { useState } from "react";

export default function testFunctionComponent() {
  const [state, setstate] = useState("");

  function onChangeInput(e) {
    setstate(e.target.value);
  }

  return (
    <>
      <h1>here is the test page</h1>
      <input value={state} onChange={onChangeInput} />
    </>
  );
}
