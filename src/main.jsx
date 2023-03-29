import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.scss";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import GetUserInfo from "./Components/GetUserInfo/GetUserInfo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
      <GetUserInfo />
    <Footer />
  </React.StrictMode>
);
