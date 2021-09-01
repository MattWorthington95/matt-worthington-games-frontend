import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import User from "./components/Users";
import { useState } from "react";
import RequireLogin from "./components/RequireLogin";

function App() {
  const [user, setUser] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [singleReview, setSingleReview] = useState(null);

  return (
    <Router>
      <RequireLogin user={user} setUser={setUser}>
        <div className="App">
          <Header />
          <Nav
            user={user}
            setCurrentCategory={setCurrentCategory}
            setSingleReview={setSingleReview}
          />

          <Switch>
            <Router path="/home">
              <Home />
            </Router>

            <Router exact path="/reviews">
              <Reviews
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
// <Router path="/reviews?">
//               <p>category</p>
//             </Router>
//             <Router path="/reviews/:review_id">
//               <p>hello!</p>
//             </Router>
