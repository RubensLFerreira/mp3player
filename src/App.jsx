import { Routes, Route } from "react-router-dom";
// import Player from "./components/Player";
// import Description from "./components/Description";
import Testando from './components/Testando'

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Player />} /> */}
        {/* <Route path="/description" element={<Description />} /> */}
        <Route path='/' element={<Testando />} />
      </Routes>
    </div>
  );
}

export default App;
