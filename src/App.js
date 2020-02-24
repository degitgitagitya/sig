import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Analisis from "./Pages/Analisis";
import Prediksi from "./Pages/Prediksi";

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
        <Route exact path="/analisis">
          <Analisis />
        </Route>
        <Route exact path="/prediksi">
          <Prediksi />
        </Route>
      </Switch>
    </Router>
  );
}
