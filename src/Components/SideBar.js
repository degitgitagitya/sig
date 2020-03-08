import React, { Component } from "react";

import NavLink from "../Components/NavLink";

import { AuthContext } from "../Contexts/Authentication";

import "./SideBar.css";

const DATA_MENU = [
  {
    no: 1,
    nama: "Beranda",
    icon: "fa-home",
    route: "/home"
  },
  {
    no: 2,
    nama: "Analisis",
    icon: "fa-chart-pie",
    route: "/analisis"
  },
  {
    no: 3,
    nama: "Prediksi",
    icon: "fa-search",
    route: "/prediksi"
  }
];

const MenuContent = props => {
  return (
    <NavLink href={props.data.route}>
      <div className="sidebar-content">
        <i className={`fas ${props.data.icon} sidebar-content-icon`}></i>
        {props.data.nama}
      </div>
    </NavLink>
  );
};

export default class SideBar extends Component {
  static contextType = AuthContext;
  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar-user">
          <div className="row">
            <div className="col-3">
              <div className="sidebar-icon-user">
                {this.context.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-12 sidebar-user-name">
                  {this.context.username}
                </div>
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
        {DATA_MENU.map(data => {
          return <MenuContent key={data.no} data={data}></MenuContent>;
        })}
        <hr className="sidebar-line" />
        <MenuContent
          data={{ route: "/", icon: "fa-sign-out-alt", nama: "Logout" }}
        ></MenuContent>
      </div>
    );
  }
}
