import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Authentication from "./Contexts/Authentication";
import { ProtectedRoute } from "./Components/ProtectedRoute";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Analisis from "./Pages/Analisis";
import Prediksi from "./Pages/Prediksi";
import NotFound from "./Pages/NotFound";
import DetailBarang from "./Pages/DetailBarang";
import DetailPrediksi from "./Pages/DetailPrediksi";

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
            <DetailBarang
              exact
              path="/detail-barang"
              component={DetailBarang}
            ></DetailBarang>
            <DetailPrediksi
              exact
              path="/detail-prediksi"
              component={DetailPrediksi}
            ></DetailPrediksi>
            <Route path="*" component={() => <NotFound />} />
          </Switch>
        </Authentication>
      </Router>
    );
  }
}
