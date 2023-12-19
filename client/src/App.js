import "./App.css";
import NavBar from "./components/Navbar";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/screens/Home";
import Participants from "./components/screens/Participants";

const Routing = () => {
  return (
    <Routes>
      <Route path="/Form" element={<Home />} />
      <Route path="/Participants" element={<Participants />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
