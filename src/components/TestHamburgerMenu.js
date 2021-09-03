import React from "react";
import { bubble as Menu } from "react-burger-menu";
import "../styles/TestHamburgerMenu.css";
import { Link } from "react-router-dom";

function TestHamburgerMenu({ categories, setCurrentCategory, user }) {
  return (
    <Menu>
      <ul>
        <li id="reviews">
          <Link
            to="/reviews"
            className="menu-item"
            onClick={() => {
              setCurrentCategory(null);
            }}
          >
            All Reviews
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
        <li id="user-page">
          <Link to="/user" id="nav-user-name" className="menu-item">
            <img
              id="nav-user-image"
              src={user.avatar_url}
              alt="little user avatar on nav bar"
            />
            &nbsp;&nbsp;{user.username}
          </Link>
        </li>
      </ul>
    </Menu>
  );
}

export default TestHamburgerMenu;
