import "../styles/Nav.css";
import { Link } from "react-router-dom";

import { useCategories, useMediaQuery } from "../hooks/useApi";
// import { useMediaQuery } from "../useMediaQuery";
import TestHamburgerMenu from "./TestHamburgerMenu";

function Nav({ user, setCurrentCategory }) {
  const { categories, catLoading } = useCategories();

  if (catLoading) return <p>Loading...</p>;

  return (
    <TestHamburgerMenu
      categories={categories}
      setCurrentCategory={setCurrentCategory}
      user={user}
    />
  );

  return (
    <div>
      <div className="navbar">
        <span>
          <Link to="/home">Home</Link>
        </span>
        <span
          onClick={() => {
            setCurrentCategory(null);
          }}
        >
          <Link to="/reviews">Reviews</Link>
        </span>
        <span>
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
        </span>
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
