import React, { Component } from "react";

import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";
import { CSVReader } from "react-papaparse";

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
    csvData: null,
    errMsg: "",
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
          rmseFixed: "",
          rmseRolling: "",
        });
      })
      .catch((error) => console.log("error", error));
  };

  fetchSecondaryData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/prediksi-new/${this.state.idBarang}`,
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
          jumlahBarang: total,
        });
      })
      .catch((error) => console.log("error", error));
  };

  // Parser Method

  handleOnDrop = (data) => {
    let newData = [];
    data.forEach((row) => {
      newData.push(row.data);
    });

    this.setState({
      csvData: newData,
    });
  };

  handleOnError = (err, file, inputElem, reason) => {
    this.setState({
      errMsg: err,
    });
  };

  handleOnRemoveFile = (data) => {
    this.setState({
      csvData: data,
    });
  };

  handleUpload = () => {
    if (this.state.csvData === null) {
      this.setState({ errMsg: "Masukan CSV terlebih dahulu" });
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({ data: this.state.csvData });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_API_URL}/rmse/${this.state.idBarang}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            rmseFixed: result.rmse_fixed,
            rmseRolling: result.rmse_rolling,
          });
        })
        .catch((error) => this.fetchData());
    }
  };

  downloadCSV = () => {
    window.open(`${process.env.REACT_APP_API_URL}/file/rmse`, "_blank");
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
          <div className="d-flex">
            <button onClick={this.fetchData} className="btn btn-success mr-2">
              Fixed AR
            </button>
            <button
              onClick={this.fetchSecondaryData}
              className="btn btn-secondary"
            >
              Rolling AR
            </button>
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
          <div className="d-flex align-items-center">
            <button
              onClick={() => {
                this.handleUpload();
              }}
              className="btn btn-info mr-2"
            >
              Check RMSE
            </button>
            <div className="text-danger mr-2">{this.state.errMsg}</div>
            <button onClick={this.downloadCSV} className="btn btn-dark">
              Download Contoh CSV
            </button>
          </div>
          <br />
          <div>RMSE Fixed: {this.state.rmseFixed}</div>
          <div>RMSE Rolling: {this.state.rmseRolling}</div>
          <br />
          <CSVReader
            config={{
              header: true,
              skipEmptyLines: true,
              fastMode: true,
            }}
            onDrop={this.handleOnDrop}
            onError={this.handleOnError}
            addRemoveButton
            onRemoveFile={this.handleOnRemoveFile}
          >
            <span>Drop CSV file here or click to upload to check RMSE.</span>
          </CSVReader>
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
