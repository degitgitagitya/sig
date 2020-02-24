import React, { Component } from "react";

import "./SideBar.css";

export default class SideBar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar-user">
          <div className="row">
            <div className="col-3">
              <div className="sidebar-icon-user">D</div>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-12 sidebar-user-name">Detya</div>
              </div>
              <div className="row">
                <div className="col-12 sidebar-user-status">
                  <i className="fas fa-circle sidebar-user-status-icon"></i>
                  Online
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="sidebar-line" />
        <div className="sidebar-content">
          <i className="fas fa-home sidebar-content-icon"></i>Beranda
        </div>
        <div className="sidebar-content">
          <i className="fas fa-chart-pie sidebar-content-icon"></i>Analisis
        </div>
        <div className="sidebar-content">
          <i className="fas fa-search sidebar-content-icon"></i>Prediksi
        </div>
        <hr className="sidebar-line" />
        <div className="sidebar-content">
          <i className="fas fa-sign-out-alt sidebar-content-icon"></i>Logout
        </div>
      </div>
    );
  }
}
