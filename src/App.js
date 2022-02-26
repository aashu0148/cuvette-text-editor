import React, { useState } from "react";
import "./App.css";

import Editor, { getPlaneTextFromEditorState } from "./Editor/Editor";

function App() {
  const [editorState, setEditorState] = useState("");

  const handleClick = () => {
    const text = getPlaneTextFromEditorState(editorState);
    console.log("text after clicking button", text);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <Editor
          placeholder="Type something"
          onChange={(state) => setEditorState(state)}
          // hiddenOptions={["ItAlIc", "header-one", "unordered-list-item"]}
        />
      </div>
      <button onClick={handleClick}>Get plain state</button>
    </div>
  );
}

export default App;
