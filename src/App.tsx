import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import UnderConstruction from "./pages/UnderConstruction";

function App() {
  return (
    <div className="">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<UnderConstruction />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;