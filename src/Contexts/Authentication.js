import React, { createContext, Component } from "react";

export const AuthContext = createContext();

export default class Authentication extends Component {
  state = {
    isAuth: true,
    username: "detya",
  };

  changeAuthToFalse = () => {
    this.setState({
      isAuth: false,
      username: "",
    });
  };

  changeAuthToTrue = (username) => {
    this.setState({
      isAuth: true,
      username: username,
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          changeAuthToFalse: this.changeAuthToFalse,
          changeAuthToTrue: this.changeAuthToTrue,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
