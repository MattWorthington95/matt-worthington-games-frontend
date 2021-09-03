import React from "react";
import { slide as Menu } from "react-burger-menu";
import "../styles/TestHamburgerMenu.css";
import { Link } from "react-router-dom";

const showSettings = (event) => {
  event.preventDefault();
};

function TestHamburgerMenu({ categories, setCurrentCategory, user }) {
  return (
    <Menu>
      <ul>
        <li>
          <Link to="/home" id="home" className="menu-item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/reviews" id="reviews" className="menu-item">
            Reviews
          </Link>
        </li>
        {categories.map((category) => {
          return (
            <li key={category.slug}>
              <Link
                onClick={() => {
                  setCurrentCategory(category.slug);
                }}
                to={`/reviews?category=${category.slug}`}
                className="menu-item"
              >
                {category.slug}
              </Link>
            </li>
          );
        })}
        <Link to="/user" id="nav-user-name" className="menu-item">
          <img
            id="nav-user-image"
            src={user.avatar_url}
            alt="little user avatar on nav bar"
          />
          &nbsp;&nbsp;{user.username}
        </Link>
      </ul>
    </Menu>
  );
}

export default TestHamburgerMenu;
