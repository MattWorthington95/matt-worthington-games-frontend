import React from "react";
import "../styles/Header.css";

function Header({ user }) {
  return (
    <div>
      <h1>Matt Worthington's Wonderful Gaming Review Emporium </h1>
      <p>Welcome to the website {user.username}, Enjoy your stay!</p>
    </div>
  );
}

export default Header;
