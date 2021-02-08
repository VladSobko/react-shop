import React, { useEffect, useState } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";

import { history } from "./helpers/history";
import { Role } from "./helpers/role";
import { authenticationService } from "./services/authentication.service";
import { PrivateRoute } from "./components/PrivateRoute";
import AdminPage from "./components/Admin/AdminPage";
import LoginPage from "./LoginPage";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import SingleItem from "./components/SingleItem/SingleItem";
import "./App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    authenticationService.currentUser.subscribe(x => {
      setCurrentUser(x);
      setIsAdmin(x && x.role === Role.Admin);
    });
  }, []);

  const logout = () => {
    authenticationService.logout();
    history.push("/login");
  };

  return (
    <Router history={history}>
      <div>
        {currentUser && (
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
              {isAdmin && (
                <Link to="/admin" className="nav-item nav-link">
                  Admin
                </Link>
              )}
              <button onClick={logout} className="nav-item nav-link btn">
                Logout
              </button>
            </div>
          </nav>
        )}
        <div>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={isAdmin ? AdminPage : Products}
            />
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/product/:id" component={SingleItem} />
          </Switch>
          <PrivateRoute
            path="/admin"
            roles={[Role.Admin]}
            component={AdminPage}
          />
          <Route path="/login" component={LoginPage} />
        </div>
      </div>
    </Router>
  );
};

export default App;
