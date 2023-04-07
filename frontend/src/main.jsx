import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import EditorProvider from "./context/EditorContext";
import NavbarContextProvider from "./context/NavbarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EditorProvider>
      <NavbarContextProvider>
        <App />
      </NavbarContextProvider>
    </EditorProvider>
  </React.StrictMode>
);
