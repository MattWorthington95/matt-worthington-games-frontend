import React from "react";
import { bubble as Menu } from "react-burger-menu";

import "../styles/Nav.css";
import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useApi";

function Nav({ setCurrentCategory, user }) {
  const { categories, catLoading } = useCategories();
  if (catLoading) return <p>Loading...</p>;

  return (
    <Menu>
      <ul>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
      </ul>
    </Menu>
  );
}

export default Nav;
