import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import User from "./components/Users";
import { useState, useEffect } from "react";
import RequireLogin from "./components/RequireLogin";
import { getUsers, getUserInfo } from "./components/api";

function App() {
  const [reviews, setReviews] = useState("");
  const [user, setUser] = useState(null);
  const [usersWithInfo, setUsersWithInfo] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [singleReview, setSingleReview] = useState(null);

  // console.log(user);

  useEffect(() => {
    const requestFunc = async () => {
      const request = await getUsers();

      const usersWithInfo = await Promise.all(
        request.users.map(async (user) => {
          const requestUserInfo = await getUserInfo(user.username);
          return requestUserInfo;
        })
      );

      setUsersWithInfo(usersWithInfo);
      setUsersLoading(false);
    };
    requestFunc();
  }, []);

  return (
    <Router>
      <RequireLogin
        usersLoading={usersLoading}
        usersWithInfo={usersWithInfo}
        user={user}
        setUser={setUser}
      >
        <div className="App">
          <Header />
          <Nav
            reviews={reviews}
            setReviews={setReviews}
            user={user}
            setCurrentCategory={setCurrentCategory}
            setSingleReview={setSingleReview}
          />
          <Switch>
            <Router path="/home">
              <Home />
            </Router>
            <Router path="/reviews">
              <Reviews
                reviews={reviews}
                setReviews={setReviews}
                currentCategory={currentCategory}
                singleReview={singleReview}
                setSingleReview={setSingleReview}
              />
            </Router>
            <Router path="/user">
              <User user={user} setUser={setUser} />
            </Router>
          </Switch>
        </div>
      </RequireLogin>
    </Router>
  );
}

export default App;
