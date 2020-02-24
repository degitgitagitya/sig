import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
