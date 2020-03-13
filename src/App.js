import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Authentication from "./Contexts/Authentication";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Analisis from "./Pages/Analisis";
import Prediksi from "./Pages/Prediksi";
import NotFound from "./Pages/NotFound";
import { ProtectedRoute } from "./Components/ProtectedRoute";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Authentication>
          <Switch>
            <Route exact path="/" render={() => <Login></Login>}></Route>
            <ProtectedRoute
              exact
              path="/home"
              component={Home}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/analisis"
              component={Analisis}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/prediksi"
              component={Prediksi}
            ></ProtectedRoute>
            <Route path="*" component={() => <NotFound />} />
          </Switch>
        </Authentication>
      </Router>
    );
  }
}
