import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Owner from './Pages/owner';
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/owner" element={<Owner />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
