import "./App.css";
import GameTable from "./Solitaire/Components/GameTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenerateGameTable from "./Solitaire/Components/GenerateGameTable";
import LeaderBoard from "./Leadboards/LeaderBoard";
import SolitaireLeaderBoard from "./Leadboards/SolitaireLeaderBoard";

function App() {
  return (
    <div className="App">
      <Router>
        <body className="h-screen w-screen">
          <Routes>
            <Route path="/" element={<GenerateGameTable />} />
            <Route path="/solitaire" element={<GenerateGameTable />} />
            <Route path="/solitaire/:seed" element={<GameTable />} />
            <Route path="/leaderboard" element={<SolitaireLeaderBoard />} />
          </Routes>
        </body>
      </Router>
    </div>
  );
}

export default App;
