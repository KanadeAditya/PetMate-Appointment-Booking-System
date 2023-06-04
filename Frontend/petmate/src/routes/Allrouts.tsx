import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import LoginSignup from "../compo/LoginSignup";
import DrLogin from "../components/DrLogin";
// import { faHourglass1 } from "@fortawesome/free-solid-svg-icons";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<h1>about</h1>} />
      <Route path="/services" element={<h1>Services</h1>} />
      <Route path="/contact" element={<h1>contact</h1>} />
      <Route path="/signup" element={<LoginSignup />} />
      <Route path="/login" element={<h1>login</h1>} />
      <Route path="/doctor/signup" element={<DrLogin />}/>
      </Routes>
  );
}
