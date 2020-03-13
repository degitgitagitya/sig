import React, { Component } from "react";
import { Doughnut, Pie, Line, Radar } from "react-chartjs-2";
import { AuthContext } from "../Contexts/Authentication";

import SideBar from "../Components/SideBar";

import "./Home.css";

const DATA_CHART = [
  {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  }
];

class Analisis extends Component {
  static contextType = AuthContext;
  render() {
    return (
      <div>
        <SideBar />
        <div className="content-container">
          <div className="content-icon-container">
            <i className="fas fa-chart-pie content-icon"></i>
          </div>
          <div className="content-text-container">
            <div className="content-title">
              /Analisis <span className="content-desc">Visualisasi Data</span>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="content-box">
                <Doughnut data={DATA_CHART[0]} />
              </div>
            </div>
            <div className="col-6">
              <div className="content-box">
                <Pie data={DATA_CHART[0]} />
              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-8">
              <div className="content-box">
                <Line data={DATA_CHART[0]} />
              </div>
            </div>
            <div className="col-4">
              <div className="content-box">
                <Radar data={DATA_CHART[0]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Analisis;
