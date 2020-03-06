import React, { Component } from "react";

import SideBar from "../Components/SideBar";
import ReactTable from "../Components/ReactTable";

import { AuthContext } from "../Contexts/Authentication";
import { withRouter } from "react-router-dom";

import "./Home.css";
import "./Prediksi.css";

class Prediksi extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }

  state = {
    tableHead: [],
    tableData: []
  };

  componentDidMount() {
    fetch(`http://127.0.0.1:5000/barangs/${this.context.username}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let dataTemp = [];

        data.map((data, index) => {
          let x = {
            no: index + 1,
            kode: data.kode,
            nama: data.nama,
            lokasi: data.lokasi
          };

          dataTemp.push(x);
        });

        this.setState({
          tableHead: [
            {
              Header: "Data Barang",
              columns: [
                {
                  Header: "No",
                  accessor: "no",
                  sortType: "basic"
                },
                {
                  Header: "Kode Barang",
                  accessor: "kode",
                  sortType: "basic"
                },
                {
                  Header: "Nama",
                  accessor: "nama",
                  sortType: "basic"
                },
                {
                  Header: "Lokasi",
                  accessor: "lokasi",
                  sortType: "basic"
                }
              ]
            }
          ],
          tableData: dataTemp
        });

        console.log(data);
      });
  }

  render() {
    {
      if (this.context.isAuth === false) {
        this.props.history.push("/");
      }
    }
    return (
      <div>
        <SideBar />
        <div className="content-container">
          <div className="content-icon-container">
            <i className="fas fa-search content-icon"></i>
          </div>
          <div className="content-text-container">
            <div className="content-title">
              /Prediksi{" "}
              <span className="content-desc">Halaman Untuk Mengatur Data</span>
            </div>
          </div>
          <div className="content-box">
            <div className="prediksi-button-container">
              <button className="prediksi-button">
                <i className="fas fa-plus prediksi-button-icon"></i>Tambah
                Barang
              </button>
            </div>
            <ReactTable
              head={this.state.tableHead}
              body={this.state.tableData}
            ></ReactTable>
            <div className="prediksi-button-container-bottom">
              <button className="prediksi-button-bottom">
                <i className="fas fa-angle-double-right prediksi-button-icon"></i>
                Prediksi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Prediksi);
