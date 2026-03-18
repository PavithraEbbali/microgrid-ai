import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import ChatbotWidget from "./components/ChatbotWidget";

function App() {
  const [chatbotAnalysis, setChatbotAnalysis] = useState({});
  const [chatbotWeather, setChatbotWeather] = useState({});

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              setChatbotAnalysis={setChatbotAnalysis}
              setChatbotWeather={setChatbotWeather}
            />
          }
        />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <ChatbotWidget
        analysis={chatbotAnalysis}
        weather={chatbotWeather}
      />
    </BrowserRouter>
  );
}

export default App;