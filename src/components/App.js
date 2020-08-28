import React from "react";

function App({ title, name }) {
  return (
    <>
      <div id="main">
        <h1>{title}</h1>
        <h2>{name}</h2>
      </div>
    </>
  );
}

export default App;
