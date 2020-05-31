import React, { Component } from "react";
import ReactModal from "react-modal";
import { CSVReader } from "react-papaparse";

import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

export default class DetailBarang extends Component {
  state = {
    head: [
      {
        Header: "Data Barang",
        columns: [
          {
            Header: "No",
            Cell: ({ row }) => <div>{row.index + 1}</div>,
          },
          {
            Header: "Tanggal",
            accessor: "tanggal",
            sortType: "basic",
            Cell: ({ row }) => <div>{row.original.tanggal.slice(0, 10)}</div>,
          },
          {
            Header: "Quantity",
            accessor: "quantity",
            sortType: "basic",
          },
          {
            Header: "Action",
            accessor: "id",
            Cell: ({ row }) => (
              <div>
                <button
                  onClick={() => {
                    this.openModalEdit(row.original);
                  }}
                  className="btn btn-warning"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    this.handleDeleteButton(row.original.id);
                  }}
                  className="btn btn-danger ml-2"
                >
                  Delete
                </button>
              </div>
            ),
          },
        ],
      },
    ],
    body: [],
    showModal: false,
    id: "",
    idBarang: "",
    tanggal: "",
    quantity: "",
    edit: false,
    csvData: null,
    errMsg: "",
  };

  onChangeTanggal = (event) => {
    this.setState({
      tanggal: event.target.value,
    });
  };

  onChangeQuantity = (event) => {
    this.setState({
      quantity: event.target.value,
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
      id: data.id,
      tanggal: data.tanggal.slice(0, 10),
      quantity: data.quantity,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      tanggal: "",
      quantity: "",
    });
  };

  handleAddButton = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id_barang: this.state.idBarang,
      tanggal: this.state.tanggal,
      quantity: this.state.quantity,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/detail-barang`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.fetchData())
      .catch((error) => console.log("error", error));
  };

  handleEditButton = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id_barang: this.state.idBarang,
      quantity: this.state.quantity,
      tanggal: this.state.tanggal,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/detail-barang/${this.state.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => this.fetchData())
      .catch((error) => console.log("error", error));
  };

  handleDeleteButton = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/detail-barang/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => this.fetchData())
      .catch((error) => console.log("error", error));
  };

  fetchData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const idBarang = params.get("id");

    fetch(
      `${process.env.REACT_APP_API_URL}/detail-barang/${idBarang}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          body: result,
          idBarang: idBarang,
          showModal: false,
          tanggal: "",
          quantity: "",
        });
      })
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchData();
  }

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
        `${process.env.REACT_APP_API_URL}/detail-barang/upload/${this.state.idBarang}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            body: result,
          });
        })
        .catch((error) => this.fetchData());
    }
  };

  handleDeleteAll = () => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/detail-barang/delete-all/${this.state.idBarang}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        this.setState({
          body: result,
        })
      )
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <Container
        title={"Detail Barang"}
        icon={"fa-search"}
        desc={"Halaman untuk mengatur data pada barang"}
      >
        {/* Moodal */}

        <ReactModal
          isOpen={this.state.showModal}
          className="modal-custom"
          overlayClassName="modal-overlay-custom"
        >
          {/* Content Modal */}
          {this.state.edit ? <h3>Edit Data</h3> : <h3>Tambah Data</h3>}
          <hr />
          <div className="mb-3">
            <div>Tanggal</div>
            <input
              onChange={this.onChangeTanggal}
              value={this.state.tanggal}
              className="form-control w-50"
              type="date"
            />
          </div>
          <div className="mb-3">
            <div>Quantity</div>
            <input
              onChange={this.onChangeQuantity}
              value={this.state.quantity}
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

        {/* Content */}

        <div className="content-box">
          {/* Content Button */}

          <div className="align-items-center d-flex mb-3">
            <button onClick={this.openModalAdd} className="prediksi-button">
              <i className="fas fa-plus prediksi-button-icon"></i>Tambah Data
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

          {/* Content Table */}

          <ReactTable
            head={this.state.head}
            body={this.state.body}
          ></ReactTable>
        </div>
      </Container>
    );
  }
}
