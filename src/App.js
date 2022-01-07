import React from "react";
import "./App.css";

import Editor from "./Editor/Editor";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Editor
          placeholder="Type something"
          // hiddenOptions={["ItAlIc", "header-one", "unordered-list-item"]}
        />
      </div>
    </div>
  );
}

export default App;
