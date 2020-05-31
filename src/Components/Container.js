import React from "react";

import SideBar from "./SideBar";

const Container = (props) => {
  const { children, title, desc, icon } = props;
  return (
    <div>
      <SideBar />
      <div className="content-container">
        <div className="content-icon-container">
          <i className={`fas ${icon} content-icon`}></i>
        </div>
        <div className="content-text-container">
          <div className="content-title">
            /{title} <span className="content-desc">{desc}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Container;
