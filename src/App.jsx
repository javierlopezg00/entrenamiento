import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import GetUserInfo from "./Components/GetUserInfo/GetUserInfo";
import Diet from "./Pages/Diet/Diet";

function App() {
  const views = [
    {
      name: "Home",
      path: "/",
      component: GetUserInfo,
    },
    {
      name: "Diet",
      path: "/diet",
      component: Diet,
    },
  ];

  return (
    <>
      <Header />
      <Routes>
        {views.map((view) => (
          <Route key={view.name} path={view.path} element={view.component()} />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
