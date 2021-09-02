import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import User from "./components/Users";
import { useState } from "react";
import RequireLogin from "./components/RequireLogin";
import SingleReview from "./components/SingleReview";

function App() {
  const [user, setUser] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  return (
    <BrowserRouter>
      <RequireLogin user={user} setUser={setUser}>
        <div className="App">
          <Header />
          <Nav user={user} setCurrentCategory={setCurrentCategory} />
          <Switch>
            <Route exact path="/reviews/:review_id">
              <SingleReview user={user} />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/reviews">
              <Reviews currentCategory={currentCategory} />
            </Route>
            <Route path="/user">
              <User user={user} setUser={setUser} />
            </Route>
          </Switch>
        </div>
      </RequireLogin>
    </BrowserRouter>
  );
}

export default App;
