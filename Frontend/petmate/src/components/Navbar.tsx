import React, { CSSProperties } from "react";
// import style from "../styles/HomeNav.module.css"
// import Style from "../styles/Nav.module.css";
 import style from "./Nav.module.css"
 import { Link } from "react-router-dom";
//  import {Helmet} from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
 
  return (
    
  
    <nav style={style.nav as CSSProperties}>
      <input type="checkbox" id={style.check}  />
      <label htmlFor={style.check} className={style.checkbtn}>
        {/* <i className="fas fa-bars"></i> */}
        <FontAwesomeIcon icon={faBars} />
      </label>
      <label className={style.logo} id={style.zoomIn}>PETMATE</label>
      <ul >
        <li id={style.zoomIn}>
        <Link to="/" className={style.active}>Home</Link>
        </li>
        <li id={style.zoomIn} >
        <Link to="/about">About</Link>
          {/* <a href="#">about</a> */}
        </li>
        <li id={style.zoomIn} >
        <Link to="/services">Services</Link>
          {/* <a href="#">servises</a> */}
        </li>
        <li id={style.zoomIn} >
        <Link to="/contact">Contact</Link>
          {/* <a href="#">contact</a> */}
        </li>
        <li id={style.zoomIn} >
        <Link to="/signup">Signup</Link>
          {/* <a href="#">signup</a> */}
        </li>
        <li id={style.zoomIn} >
        <Link to="/login">Login</Link>
          {/* <a href="#">login</a> */}
        </li>
      </ul>
    </nav>
    
  );
}

export default Navbar;
