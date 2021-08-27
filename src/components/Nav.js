import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <div className="navbar">
        <span>
          <Link to="/home">Home</Link>
        </span>
        <span>
          <Link to="/reviews">Reviews</Link>
        </span>
        <div className="dropdown">
          <button className="dropbtn">
            Categories
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <span>
              <Link to="/reviews/cat1">Cat1</Link>
            </span>
            <span>
              <Link to="/reviews/cat2">Cat2</Link>
            </span>
            <span>
              <Link to="/reviews/cat3">Cat3</Link>
            </span>
          </div>
        </div>
        <span>
          <Link to="/users">Users</Link>
        </span>
      </div>
    </div>
  );
}

export default Nav;
