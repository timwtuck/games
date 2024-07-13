import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GameTable from "./Solitaire/Components/GameTable";

function App() {
  return (
    <div className="App">
      <body className="h-screen w-screen">
        <GameTable />
      </body>
    </div>
  );
}

export default App;
