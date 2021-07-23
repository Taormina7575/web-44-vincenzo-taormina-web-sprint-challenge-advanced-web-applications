import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import "./styles.scss";
import axiosWithAuth from "./helpers/axiosWithAuth";

function App() {
  const logout = () => {
    axiosWithAuth()
      .post("http://localhost:5000/api/logout")
      .then((res) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="#" onClick={logout}>
            logout
          </a>
        </header>
        <Switch>
          <PrivateRoute path="/bubbles">
            <BubblePage></BubblePage>
          </PrivateRoute>
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.
