import React, { Component } from "react";

import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

export default class DetailPrediksi extends Component {
  state = {
    tableHead: [
      {
        Header: "Data Prediksi Harian",
        columns: [
          {
            Header: "Hari Ke",
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
    jumlahBarang: "",
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
        let total = 0;
        result.forEach((data) => {
          total = total + data.quantity;
        });
        this.setState({
          tableData: result,
          idBarang: idBarang,
          kodeBarang: kodeBarang,
          namaBarang: namaBarang,
          satuanBarang: satuanBarang,
          hargaBarang: hargaBarang,
          jumlahBarang: total,
        });
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    const totalBelanja =
      Math.round(this.state.jumlahBarang) * this.state.hargaBarang;
    return (
      <Container
        title={"Detail Prediksi"}
        icon={"fa-search"}
        desc={"Melihat data hasil prediksi"}
      >
        {/* Content */}
        <div className="content-box">
          <div>
            <span className="font-weight-bold"> Kode barang </span>:{" "}
            {this.state.kodeBarang}
          </div>
          <div>
            <span className="font-weight-bold"> Nama barang </span>:{" "}
            {this.state.namaBarang}
          </div>
          <div>
            <span className="font-weight-bold"> Satuan </span>:{" "}
            {this.state.satuanBarang}
          </div>
          <div>
            <span className="font-weight-bold"> Harga </span>: Rp.{" "}
            {this.state.hargaBarang} ,-
          </div>
          <hr />
          <div>
            Jumlah yang harus dibeli pada pembelanjaan selanjutnya adalah{" "}
            <span className="font-weight-bold">
              {Math.round(this.state.jumlahBarang)} {this.state.satuanBarang}
            </span>
          </div>
          <div>
            Dengan harga{" "}
            <span className="font-weight-bold">
              Rp.{" "}
              {totalBelanja
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
              ,-
            </span>
          </div>
          <hr />
          <ReactTable
            head={this.state.tableHead}
            body={this.state.tableData}
          ></ReactTable>
        </div>
      </Container>
    );
  }
}
