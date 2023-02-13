import { Routes, Route } from "react-router-dom";
import Player from "./components/Player";
import Description from "./components/Description";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Player />} />
        <Route path="/description" element={<Description />} />
      </Routes>
    </div>
  );
}

export default App;