import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import SideBar from "../Components/SideBar";
import ReactTable from "../Components/ReactTable";

import { AuthContext } from "../Contexts/Authentication";

import "./Home.css";
import "./Prediksi.css";

class ModalEnd extends Component {
  state = {
    inputKode: "",
    inputBarang: "",
    inputLokasi: ""
  };

  changeAllState = (kode, barang, lokasi) => {
    this.setState({
      inputKode: kode,
      inputBarang: barang,
      inputLokasi: lokasi
    });
  };

  changeKode = event => {
    this.setState({
      inputKode: event.target.value
    });
  };

  changeBarang = event => {
    this.setState({
      inputBarang: event.target.value
    });
  };

  changeLokasi = event => {
    this.setState({
      inputLokasi: event.target.value
    });
  };

  onClickEdit = (id, kode, nama, lokasi, username) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      kode: kode,
      nama: nama,
      lokasi: lokasi,
      username: username
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`http://127.0.0.1:5000/barang/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => this.props.onHide())
      .catch(error => console.log("error", error));
  };

  onClickAdd = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      kode: this.state.inputKode,
      nama: this.state.inputBarang,
      lokasi: this.state.inputLokasi,
      username: this.props.username
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:5000/barang", requestOptions)
      .then(response => response.text())
      .then(result => {
        this.setState({
          inputKode: "",
          inputBarang: "",
          inputLokasi: ""
        });
        this.props.onHide();
      })
      .catch(error => console.log("error", error));
  };

  handleKeyPressPrediksi = (event, check) => {
    if (event.key === "Enter") {
      if (check === "edit") {
        this.onClickEdit(
          this.props.idbarang,
          this.state.inputKode,
          this.state.inputBarang,
          this.state.inputLokasi,
          this.props.username
        );
      } else {
        this.onClickAdd();
      }
    }
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-secondary">
          <Modal.Title
            className="text-light"
            id="contained-modal-title-vcenter"
          >
            {this.props.isedit === "true" ? "Edit Barang" : "Tambah Barang"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="kode">Kode Barang</label>
          <input
            id="kode"
            type="text"
            className="form-control mb-3"
            placeholder="Kode Barang"
            onChange={this.changeKode}
            value={this.state.inputKode}
            onKeyPress={e => {
              let x = "";
              if (this.props.isedit === "true") {
                x = "edit";
              }

              this.handleKeyPressPrediksi(e, x);
            }}
          />
          <label htmlFor="nama">Nama Barang</label>
          <input
            id="nama"
            type="text"
            className="form-control mb-3"
            placeholder="Nama Barang"
            onChange={this.changeBarang}
            value={this.state.inputBarang}
            onKeyPress={e => {
              let x = "";
              if (this.props.isedit === "true") {
                x = "edit";
              }

              this.handleKeyPressPrediksi(e, x);
            }}
          />
          <label htmlFor="lokasi">Lokasi Pembelian</label>
          <input
            id="lokasi"
            type="text"
            className="form-control "
            placeholder="Lokasi Pembelian"
            onChange={this.changeLokasi}
            value={this.state.inputLokasi}
            onKeyPress={e => {
              let x = "";
              if (this.props.isedit === "true") {
                x = "edit";
              }

              this.handleKeyPressPrediksi(e, x);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          {this.props.isedit === "true" ? (
            <button
              className="btn btn-warning text-white"
              onClick={() => {
                let kode;
                let nama;
                let lokasi;
                if (this.state.inputKode === "") {
                  kode = this.props.kodebarang;
                } else {
                  kode = this.state.inputKode;
                }
                if (this.state.inputBarang === "") {
                  nama = this.props.namabarang;
                } else {
                  nama = this.state.inputBarang;
                }
                if (this.state.inputLokasi === "") {
                  lokasi = this.props.lokasibarang;
                } else {
                  lokasi = this.state.inputLokasi;
                }
                this.onClickEdit(
                  this.props.idbarang,
                  kode,
                  nama,
                  lokasi,
                  this.props.username
                );
              }}
            >
              Edit
            </button>
          ) : (
            <button className="btn btn-success" onClick={this.onClickAdd}>
              Add
            </button>
          )}

          <button
            className="btn btn-danger"
            onClick={() => {
              this.setState({
                inputKode: "",
                inputBarang: "",
                inputLokasi: ""
              });
              this.props.onHide();
            }}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default class Prediksi extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.modalElement = React.createRef();
  }

  state = {
    tableHead: [
      {
        Header: "Data Barang",
        columns: [
          {
            Header: "No",
            Cell: ({ row }) => <div>{row.index + 1}</div>
          },
          ,
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
          },
          {
            Header: "Action",
            accessor: "id",
            Cell: ({ row }) => (
              <div>
                <button
                  className="prediksi-button-delete"
                  onClick={() => {
                    let requestOptions = {
                      method: "DELETE",
                      redirect: "follow"
                    };

                    fetch(
                      `http://127.0.0.1:5000/barang/${row.original.id}`,
                      requestOptions
                    )
                      .then(response => response.text())
                      .then(result => this.fetchData())
                      .catch(error => console.log("error", error));
                  }}
                >
                  Delete
                </button>
                <button
                  className="prediksi-button-edit"
                  onClick={() => {
                    this.setTempData(
                      row.original.id,
                      row.original.kode,
                      row.original.nama,
                      row.original.lokasi
                    );
                  }}
                >
                  Edit
                </button>
              </div>
            )
          }
        ]
      }
    ],
    tableData: [],
    modalShow: false,
    setModalShow: false,
    modalShowEdit: false,
    setModalShowEdit: false,
    tempId: "",
    tempKode: "",
    tempNama: "",
    tempLokasi: ""
  };

  handleClickChangeChild = (kode, nama, lokasi) => {
    this.modalElement.current.changeAllState(kode, nama, lokasi);
  };

  setTempData = (id, kode, nama, lokasi) => {
    this.setState({
      tempId: id,
      tempKode: kode,
      tempNama: nama,
      tempLokasi: lokasi
    });
    this.handleClickChangeChild(kode, nama, lokasi);
    this.setModalShowEdit(true);
  };

  setModalShowEdit = x => {
    this.setState({
      modalShowEdit: x
    });
    if (x === false) {
      this.fetchData();
    }
  };

  setModalShow = x => {
    this.setState({
      modalShow: x
    });
    if (x === false) {
      this.fetchData();
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(`http://127.0.0.1:5000/barangs/${this.context.username}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          tableData: data
        });
      });
  };

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
              <button
                className="prediksi-button"
                onClick={() => this.setModalShow(true)}
              >
                <i className="fas fa-plus prediksi-button-icon"></i>Tambah
                Barang
              </button>
              <ModalEnd
                username={this.context.username}
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                idbarang=""
                kodebarang=""
                namabarang=""
                lokasibarang=""
              />
              <ModalEnd
                ref={this.modalElement}
                username={this.context.username}
                show={this.state.modalShowEdit}
                onHide={() => this.setModalShowEdit(false)}
                idbarang={this.state.tempId}
                kodebarang={this.state.tempKode}
                namabarang={this.state.tempNama}
                lokasibarang={this.state.tempLokasi}
                isedit="true"
              />
            </div>
            <ReactTable
              head={this.state.tableHead}
              body={this.state.tableData}
              delete={this.deleteData}
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
