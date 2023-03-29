import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import GetUserInfo from "./Components/GetUserInfo/GetUserInfo";
import Diet from "./Pages/Diet/Diet";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GetUserInfo />} />
        <Route path="/diet" element={<Diet />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
