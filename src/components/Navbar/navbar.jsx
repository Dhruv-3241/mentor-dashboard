import React from "react";
import "./navbar.css";
import logo from "../../assets/navbar/scalar_logo.png";
import icons1 from "../../assets/navbar/icons8-dashboard-50.png";
import icons2 from "../../assets/navbar/icons8-view-50.png";
import icons3 from "../../assets/navbar/icons8-add-30.png";

export const Navbar = ({ setView }) => {
  const handleView = (view) => {
    setView(view);
  };
  return (
    <nav className="Navbar">
      <div className="navcont">
        <img src={logo} alt="" />
          </div>
          <div className="navcont1">
              <h2> Mentor Dashboard</h2>
          </div>
      <div className="navcont2">
        <ul>
          <li className="links">
            <img src={icons1} className="linkimg" alt=""></img>
            <button className="hbtn" onClick={(e) => handleView("middle")}>
              Dashboard
            </button>
          </li>
          <li className="links">
            <img src={icons2} className="linkimg" alt=""></img>
            <button className="hbtn" onClick={(e) => handleView("view")}>
              View
            </button>
          </li>
          <li className="links">
            <img src={icons3} className="linkimg" alt=""></img>
            <button className="hbtn" onClick={(e) => handleView("add")}>
              Add
            </button>
          </li>
        </ul>
      </div>
      <div className="navcont3"></div>
    </nav>
  );
};
