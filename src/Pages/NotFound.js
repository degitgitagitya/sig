import React, { Component } from "react";

import NavLink from "../Components/NavLink";

import "./NotFound.css";

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h1>Oops!</h1>
            </div>
            <h2>404 - Page not found</h2>
            <p>
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
            </p>
            <NavLink href="/">
              <div>Go To Homepage</div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
