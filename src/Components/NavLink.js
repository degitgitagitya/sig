import React from "react";
import { withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";

const NavLink = props => {
  const { href, history, children } = props;
  return (
    <Nav.Link
      href={href}
      onClick={e => {
        e.preventDefault();
        history.push(href);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}
    >
      {children}
    </Nav.Link>
  );
};

export default withRouter(NavLink);
