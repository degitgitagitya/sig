import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Authentication from "./Contexts/Authentication";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Analisis from "./Pages/Analisis";
import Prediksi from "./Pages/Prediksi";
import NotFound from "./Pages/NotFound";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Authentication>
          <Switch>
            <Route exact path="/" render={() => <Login></Login>}></Route>
            <Route exact path="/home" render={() => <Home></Home>}></Route>
            <Route exact path="/analisis">
              <Analisis />
            </Route>
            <Route exact path="/prediksi">
              <Prediksi />
            </Route>
            <Route path="*" component={() => <NotFound />} />
          </Switch>
        </Authentication>
      </Router>
    );
  }
}
