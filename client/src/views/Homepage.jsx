import React from "react";
import "./Homepage.css";
import "./App.css";
import logo from '../assets/logo.png'

const Homepage = () => {
    return (
        <div>
          <div className="header-2">
            <img className="image-1-4" src={logo} alt="Logo" />
            <span className="subtitulo">The Golden Feather</span>
          </div>

        </div>
      );
    };

export default Homepage