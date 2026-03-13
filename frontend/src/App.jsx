import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Pricing from "./pages/Pricing";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/pricing" element={<Pricing />} />

        <Route path="/about" element={<About />} />

      </Routes>

    </BrowserRouter>
  );

}

export default App;