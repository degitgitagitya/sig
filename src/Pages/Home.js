import React, { Component } from "react";

import SideBar from "../Components/SideBar";

import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <div className="content-container">
          <div className="content-icon-container">
            <i className="fas fa-home content-icon"></i>
          </div>
          <div className="content-text-container">
            <div className="content-title">
              /Beranda <span className="content-desc">Informasi General</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
