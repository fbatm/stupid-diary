import MyReact from "./myReact";
import App from "./App";

const container = document.querySelector("#root");

const updateValue = (e) => {
  rerender(e.target.value);
};

const rerender = (value) => {
  const element = (
    <div>
      <App />
      <input onInput={updateValue} value={value} />
      <h2>{value}</h2>
    </div>
  );
  MyReact.render(element, container);
};
rerender("");
