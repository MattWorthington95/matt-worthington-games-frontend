import React, { useEffect, useState } from "react";
import "../styles/Nav.css";
import { Link } from "react-router-dom";
import { getCategories } from "./api";
import { useCategories } from "../hooks/useApi";

function Nav({ user, setCurrentCategory, setSingleReview }) {
  const { categories, setCategories, catLoading } = useCategories();

  if (catLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="navbar">
        <span>
          <Link to="/home">Home</Link>
        </span>
        <span
          onClick={() => {
            setCurrentCategory(null);
            setSingleReview(false);
          }}
        >
          <Link to="/reviews">Reviews</Link>
        </span>
        <div className="dropdown">
          <button className="dropbtn">
            Categories
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category.slug}>
                    <span
                      onClick={() => {
                        setCurrentCategory(category.slug);
                        setSingleReview(false);
                      }}
                    >
                      <Link to={`/reviews?category=${category.slug}`}>
                        {category.slug}
                      </Link>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <span id="nav-user-name">
          <Link to="/user" id="nav-user-name">
            <img
              id="nav-user-image"
              src={user.avatar_url}
              alt="little user avatar on nav bar"
            />
            &nbsp;&nbsp;{user.username}
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Nav;
