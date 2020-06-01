import React, { Component } from "react";
import ReactModal from "react-modal";
import { CSVReader } from "react-papaparse";

import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

import { AuthContext } from "../Contexts/Authentication";

import "./Home.css";
import "./Prediksi.css";

export default class Prediksi extends Component {
  static contextType = AuthContext;

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
            Header: "Kode Barang",
            accessor: "kode",
            sortType: "basic",
          },
          {
            Header: "Nama",
            accessor: "nama",
            sortType: "basic",
          },
          {
            Header: "Satuan",
            accessor: "satuan",
            sortType: "basic",
          },
          {
            Header: "Harga Per Satuan",
            accessor: "harga",
            sortType: "basic",
          },
          {
            Header: "Action",
            accessor: "id",
            Cell: ({ row }) => (
              <div>
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => {
                    this.handleDeleteButton(row.original.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => {
                    this.openModalEdit(row.original);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    this.props.history.push(
                      `/detail-barang?id=${row.original.id}`
                    );
                  }}
                  className="btn btn-success mr-2"
                >
                  Detail Barang
                </button>
                <button
                  onClick={() => {
                    const { id, kode, nama, satuan, harga } = row.original;
                    this.props.history.push(
                      `/detail-prediksi?id=${id}&kode=${kode}&nama=${nama}&satuan=${satuan}&harga=${harga}`
                    );
                  }}
                  className="btn btn-info"
                >
                  Detail Prediksi
                </button>
              </div>
            ),
          },
        ],
      },
    ],
    tableData: [],
    showModal: false,
    edit: false,
    tempId: "",
    tempKode: "",
    tempNama: "",
    tempSatuan: "",
    tempHarga: "",
    errMsg: "",
    csvData: null,
  };

  onChangeId = (event) => {
    this.setState({
      tempId: event.target.value,
    });
  };

  onChangeKode = (event) => {
    this.setState({
      tempKode: event.target.value,
    });
  };

  onChangeNama = (event) => {
    this.setState({
      tempNama: event.target.value,
    });
  };

  onChangeSatuan = (event) => {
    this.setState({
      tempSatuan: event.target.value,
    });
  };

  onChangeHarga = (event) => {
    this.setState({
      tempHarga: event.target.value,
    });
  };

  openModalAdd = () => {
    this.setState({
      showModal: true,
      edit: false,
    });
  };

  openModalEdit = (data) => {
    this.setState({
      showModal: true,
      edit: true,
      tempId: data.id,
      tempKode: data.kode,
      tempNama: data.nama,
      tempSatuan: data.satuan,
      tempHarga: data.harga,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      tempId: "",
      tempKode: "",
      tempNama: "",
      tempSatuan: "",
      tempHarga: "",
    });
  };

  handleAddButton = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      kode: this.state.tempKode,
      nama: this.state.tempNama,
      satuan: this.state.tempSatuan,
      username: this.context.username,
      harga: this.state.tempHarga,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/barang`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchData();
      })
      .catch((error) => console.log("error", error));
  };

  handleDeleteButton = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/barang/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.fetchData())
      .catch((error) => console.log("error", error));
  };

  handleEditButton = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      kode: this.state.tempKode,
      nama: this.state.tempNama,
      satuan: this.state.tempSatuan,
      username: this.context.username,
      harga: this.state.tempHarga,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/barang/${this.state.tempId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => this.fetchData())
      .catch((error) => console.log("error", error));
  };

  handlePrediksiButton = () => {
    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/prediksi-all/${this.context.username}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => this.fetchData())
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/barangs/${this.context.username}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          tableData: data,
          showModal: false,
          tempId: "",
          tempKode: "",
          tempNama: "",
          tempSatuan: "",
          tempHarga: "",
          errMsg: "",
          csvData: null,
        });
      });
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
        `${process.env.REACT_APP_API_URL}/barang/upload/${this.context.username}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            tableData: result,
          });
        })
        .catch((error) => this.fetchData());
    }
  };

  downloadCSV = () => {
    window.open(`${process.env.REACT_APP_API_URL}/file/barang`, "_blank");
  };

  handleDeleteAll = () => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/barang/delete-all/${this.context.username}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          tableData: result,
        });
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <Container
        title={"Prediksi"}
        icon={"fa-search"}
        desc={"Halaman untuk mengatur barang"}
      >
        {/* Modal */}

        <ReactModal
          isOpen={this.state.showModal}
          className="modal-custom"
          overlayClassName="modal-overlay-custom"
        >
          {/* Content Modal */}

          {this.state.edit ? <h3>Edit Data</h3> : <h3>Tambah Data</h3>}

          <hr />

          <div className="mb-3">
            <div>Kode Barang</div>
            <input
              onChange={this.onChangeKode}
              value={this.state.tempKode}
              className="form-control w-100"
              type="text"
            />
          </div>

          <div className="mb-3">
            <div>Nama</div>
            <input
              onChange={this.onChangeNama}
              value={this.state.tempNama}
              className="form-control w-100"
              type="text"
            />
          </div>

          <div className="mb-3">
            <div>Satuan</div>
            <input
              onChange={this.onChangeSatuan}
              value={this.state.tempSatuan}
              className="form-control"
              type="text"
            />
          </div>

          <div className="mb-3">
            <div>Harga</div>
            <input
              onChange={this.onChangeHarga}
              value={this.state.tempHarga}
              className="form-control"
              type="number"
            />
          </div>

          {/* Button Modal */}

          <div className="d-flex justify-content-end">
            {this.state.edit ? (
              <button
                onClick={this.handleEditButton}
                className="btn btn-warning"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={this.handleAddButton}
                className="btn btn-success"
              >
                Tambahkan
              </button>
            )}
            <button onClick={this.closeModal} className="ml-2 btn btn-danger">
              Cancel
            </button>
          </div>
        </ReactModal>

        <div className="content-box">
          <div className="d-flex mb-3">
            <button className="prediksi-button" onClick={this.openModalAdd}>
              <i className="fas fa-plus prediksi-button-icon"></i>Tambah Barang
            </button>
            <button onClick={this.downloadCSV} className="ml-3 btn btn-dark">
              <i className="fas fa-download prediksi-button-icon"></i> Download
              Contoh CSV
            </button>
            <button
              onClick={this.handleUpload}
              className="btn btn-success ml-3"
            >
              <i className="fas fa-upload prediksi-button-icon"></i>
              Upload From CSV
            </button>
            <div className="ml-3 text-danger">{this.state.errMsg}</div>
          </div>
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
            <span>Drop CSV file here or click to upload.</span>
          </CSVReader>
          <br />

          <div className="d-flex">
            <button onClick={this.handleDeleteAll} className="btn btn-danger">
              <i className="fas fa-trash prediksi-button-icon"></i> Delete All
            </button>
          </div>

          <br />
          <ReactTable
            head={this.state.tableHead}
            body={this.state.tableData}
          ></ReactTable>
          <div className="d-flex mt-3 justify-content-end">
            <button
              onClick={this.handlePrediksiButton}
              className="prediksi-button"
            >
              <i className="fas fa-angle-double-right prediksi-button-icon"></i>
              Prediksi
            </button>
          </div>
        </div>
      </Container>
    );
  }
}
