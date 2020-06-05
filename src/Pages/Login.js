import React, { Component } from "react";
import { AuthContext } from "../Contexts/Authentication";
import { withRouter } from "react-router-dom";

import "./Login.css";

class Login extends Component {
  static contextType = AuthContext;

  state = {
    inputUsername: "",
    inputPassword: "",
    error: false,
    errorMsg: "",
  };

  setModalShow = (x) => {
    this.setState({
      modalShow: x,
    });
  };

  onChangeUsername = (event) => {
    this.setState({
      inputUsername: event.target.value,
    });
  };

  onChangePassword = (event) => {
    this.setState({
      inputPassword: event.target.value,
    });
  };

  handleClickLogin = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/auth/${this.state.inputUsername}/${this.state.inputPassword}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (Object.entries(data).length === 0 && data.constructor === Object) {
          this.toggleError("Wrong Username / Password");
        } else {
          this.context.changeAuthToTrue(this.state.inputUsername);
          this.props.history.push("/home");
        }
      });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleClickLogin();
    }
  };

  toggleError = (msg) => {
    this.setState({
      error: true,
      errorMsg: msg,
    });
  };

  checkInput = () => {
    if (this.state.inputPassword === "" || this.state.inputUsername === "") {
      return false;
    } else {
      return true;
    }
  };

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
                  value={this.state.inputUsername}
                  onChange={this.onChangeUsername}
                  className="form-control"
                  placeholder="Username"
                  onKeyPress={this.handleKeyPress}
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
                  value={this.state.inputPassword}
                  onChange={this.onChangePassword}
                  className="form-control"
                  placeholder="Password"
                  onKeyPress={this.handleKeyPress}
                ></input>
              </div>
              {this.state.error ? (
                <div className="login-error text-left">
                  {this.state.errorMsg}
                </div>
              ) : (
                <br></br>
              )}
              <div className="login-navlink">
                <button
                  onClick={() => {
                    if (this.checkInput() === true) {
                      this.handleClickLogin(this.props);
                    } else {
                      this.toggleError("Fill Username & Password");
                    }
                  }}
                  className="btn btn-info form-control"
                >
                  Login
                </button>
                <div className="d-flex justify-content-center mt-3">
                  <div>Belum Memiliki Akun?</div>
                </div>
                <button
                  onClick={() => {
                    this.props.history.push("/register");
                  }}
                  className="btn btn-outline-info form-control mt-3"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
