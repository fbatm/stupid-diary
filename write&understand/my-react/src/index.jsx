import App from "./App";
import FunctionComponent from "./SomeFunctionComponent";
import ClassComponent from "./SomeClassComponent";

const container = document.querySelector("#root");

const updateValue = (e) => {
  rerender(e.target.value);
};

const rerender = (value) => {
  const element = (
    <div>
      <App />
      <FunctionComponent />
      <ClassComponent />
      <input onInput={updateValue} value={value} />
      <h2>{value}</h2>
    </div>
  );
  MyReact.render(element, container);
};
rerender("");
