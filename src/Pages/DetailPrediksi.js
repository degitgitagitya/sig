import React, { Component } from "react";

import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

export default class DetailPrediksi extends Component {
  state = {
    tableHead: [
      {
        Header: "Data Barang",
        columns: [
          {
            Header: "No",
            Cell: ({ row }) => <div>{row.index + 1}</div>,
          },
          {
            Header: "Prediksi Terpakai",
            accessor: "quantity",
            sortType: "basic",
          },
        ],
      },
    ],
    tableData: [],
    idBarang: "",
    kodeBarang: "",
    namaBarang: "",
    satuanBarang: "",
    hargaBarang: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const idBarang = params.get("id");
    const kodeBarang = params.get("kode");
    const namaBarang = params.get("nama");
    const satuanBarang = params.get("satuan");
    const hargaBarang = params.get("harga");

    fetch(
      `${process.env.REACT_APP_API_URL}/prediksi/${idBarang}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          tableData: result,
          idBarang: idBarang,
          kodeBarang: kodeBarang,
          namaBarang: namaBarang,
          satuanBarang: satuanBarang,
          hargaBarang: hargaBarang,
        });
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <Container
        title={"Detail Prediksi"}
        icon={"fa-search"}
        desc={"Melihat data hasil prediksi"}
      >
        {/* Content */}
        <div className="content-box">
          <div>Kode barang : {this.state.kodeBarang}</div>
          <div>Nama barang : {this.state.namaBarang}</div>
          <div>Satuan : {this.state.satuanBarang}</div>
          <div>Harga : {this.state.hargaBarang}</div>
          <br />
          <ReactTable
            head={this.state.tableHead}
            body={this.state.tableData}
          ></ReactTable>
        </div>
      </Container>
    );
  }
}
