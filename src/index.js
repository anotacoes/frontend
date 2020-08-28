import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <App
      title="Perguntaram ao dalai lama"
      name="Cavalo"
    />
  </React.StrictMode>,
  document.getElementById("root")
);

