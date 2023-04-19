import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Routes, Route, Navigate} from "react-router-dom";
import "./App.css";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import GetUserData from "./Components/GetUserInfo/GetUserData";
import Diet from "./Pages/Diet/Diet";
import Coach from "./Pages/Coach/Coach"
import Exercises from "./Pages/Exercises/Exercises";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Profile from "./Pages/Profile/Profile";

function App() {

  const [views, setViews]=useState([])
  

  const viewsLogged = [
    {
      name: "Profile",
      path: "/Profile",
      component: Profile,
    },
    {
      name: "Home",
      path: "/",
      component: GetUserData,
    },
    {
      name: "Diet",
      path: "/diet",
      component: Diet,
    },
    {
      name: "Coach",
      path: "/coach",
      component: Coach
    },
    {
      name: "Chest",
      path: "/Chest",
      component: Exercises
    },
    {
      name: "Back ***",
      path: "/Back",
      component: Exercises
    },
    {
      name: "Biceps",
      path: "/Biceps",
      component: Exercises
    },
    {
      name: "Triceps",
      path: "/Triceps",
      component: Exercises
    },
    {
      name: "Abdominals",
      path: "/Abdominals",
      component: Exercises
    },
    {
      name: "Shoulders",
      path: "/Shoulders",
      component: Exercises
    },
    {
      name: "Glutes",
      path: "/Glutes",
      component: Exercises
    }
  ];

  const viewsNotLogged = [
    
    {
      name: "SignIn",
      path: "/SignIn",
      component: SignIn,
    },
    {
      name: "SignUp",
      path: "/SignUp",
      component: SignUp,
    }
  ];

  const getUsername=()=>{
    const localUsername = localStorage.getItem('username');
    return localUsername ? JSON.parse(localUsername) : '';
  }

  const[username, setUsername] = useState(getUsername);

  useEffect(()=>{
    localStorage.setItem('username', JSON.stringify(username));
    console.log(localStorage.getItem('username'))
  })

  return (
    <>
      <Header />
      {username!=''? 
      <Routes>
        {viewsLogged.map((view) => (
          <Route key={view.name}  path={view.path} element={view.component()} />
        ))}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>:
      <Routes>
      {viewsNotLogged.map((view) => (
        <Route key={view.name}  path={view.path} element={view.component()} />
      ))}
      <Route path="*" element={<Navigate replace to="/SignIn" />} />
    </Routes>}
      <Footer />
    </>
  );
}

export default App;
