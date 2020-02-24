import React, { Component } from "react";

import NavLink from "../Components/NavLink";

import "./Login.css";

export default class Login extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-4 login-container">
              <div className="login-title">LOGIN</div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                ></input>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-key"></i>
                  </div>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                ></input>
              </div>
              <div id="login-navlink">
                <NavLink href="/home">
                  <button className="btn btn-info form-control">Login</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
