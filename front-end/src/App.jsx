import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";

function App() {
  return (
    <div className="">
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
