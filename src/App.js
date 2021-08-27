import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import Users from "./components/Users";
import { useState } from "react";

function App() {
  const [reviews, setReviews] = useState("");
  const [page, setPage] = useState(1);

  return (
    <Router>
      <div className="App">
        <Header />
        <Nav reviews={reviews} setReviews={setReviews} />
        <Switch>
          <Router path="/home">
            <Home />
          </Router>
          <Router path="/reviews">
            <Reviews
              reviews={reviews}
              setReviews={setReviews}
              page={page}
              setPage={setPage}
            />
          </Router>
          <Router path="/users">
            <Users />
          </Router>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
