import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";

import Reviews from "./components/Reviews";
import User from "./components/Users";
import { useState, useEffect } from "react";
import RequireLogin from "./components/RequireLogin";
import SingleReview from "./components/SingleReview";
import { getDefaultUser } from "./api";

function App() {
  const [user, setUser] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    const requestFunc = async () => {
      const { user: request } = await getDefaultUser();
      setUser(request);
    };
    requestFunc();
  }, []);

  return (
    <BrowserRouter>
      <RequireLogin user={user} setUser={setUser}>
        <div className="App">
          <Header user={user} />
          <Nav user={user} setCurrentCategory={setCurrentCategory} />
          <Switch>
            <Route exact path="/reviews/:review_id">
              <SingleReview user={user} />
            </Route>
            <Route exact path="/reviews">
              <Reviews currentCategory={currentCategory} />
            </Route>
            <Route exact path="/user">
              <User user={user} setUser={setUser} />
            </Route>
            <Redirect exact from="/" to="/reviews" />
            <Route path="/">
              <p>Page doesn't exist</p>
            </Route>
          </Switch>
        </div>
      </RequireLogin>
    </BrowserRouter>
  );
}

export default App;
