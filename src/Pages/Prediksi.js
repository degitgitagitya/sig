import React, { Component } from "react";

import SideBar from "../Components/SideBar";
import ReactTable from "../Components/ReactTable";

import "./Home.css";
import "./Prediksi.css";

const DATA_HEAD = [
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
        Header: "Jumlah Stock Awal",
        accessor: "beli",
        sortType: "basic"
      },
      {
        Header: "Jumlah Terjual",
        accessor: "jual",
        sortType: "basic"
      }
    ]
  }
];

const DATA_TABLE = [
  {
    no: 1,
    kode: "B001",
    nama: "Alvin",
    beli: 10,
    jual: 5
  },
  {
    no: 1,
    kode: "B001",
    nama: "Alvin",
    beli: 10,
    jual: 5
  },
  {
    no: 1,
    kode: "B001",
    nama: "Alvin",
    beli: 10,
    jual: 5
  },
  {
    no: 1,
    kode: "B001",
    nama: "Alvin",
    beli: 10,
    jual: 5
  },
  {
    no: 1,
    kode: "B001",
    nama: "Alvin",
    beli: 10,
    jual: 5
  },
  {
    no: 1,
    kode: "B001",
    nama: "Alvin",
    beli: 10,
    jual: 5
  },
  {
    no: 1,
    kode: "B001",
    nama: "Alvin",
    beli: 10,
    jual: 5
  },
  {
    no: 1,
    kode: "B001",
    nama: "Alvin",
    beli: 10,
    jual: 5
  },
  {
    no: 1,
    kode: "B001",
    nama: "Alvin",
    beli: 10,
    jual: 5
  },
  {
    no: 1,
    kode: "B001",
    nama: "Alvin",
    beli: 10,
    jual: 5
  },
  {
    no: 1,
    kode: "B001",
    nama: "Alvin",
    beli: 10,
    jual: 5
  }
];

export default class Prediksi extends Component {
  render() {
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
              head={DATA_HEAD}
              body={DATA_TABLE.concat(DATA_TABLE)}
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
