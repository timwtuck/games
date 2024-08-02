import "./App.css";
import GameTable from "./Solitaire/Components/GameTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <body className="h-screen w-screen">
          <Routes>
            <Route path="/" element={<GameTable />} />
            <Route path="/solitaire" element={<GameTable />} />
          </Routes>
        </body>
      </Router>
    </div>
  );
}

export default App;
