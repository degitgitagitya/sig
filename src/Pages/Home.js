import React, { Component } from "react";
import { AuthContext } from "../Contexts/Authentication";
import { Modal } from "react-bootstrap";

import Container from "../Components/Container";

import "./Home.css";

class ModalEnd extends Component {
  state = {
    inputNamaPemilik: "",
    inputEmail: "",
    inputTelfon: "",
    inputUrl: "",
    inputNamaUmkm: "",
    inputKategori: "",
    inputAlamat: "",
  };

  changeAllState = (nama, email, telfon, url, namaUmkm, kategori, alamat) => {
    this.setState({
      inputNamaPemilik: nama,
      inputEmail: email,
      inputTelfon: telfon,
      inputUrl: url,
      inputNamaUmkm: namaUmkm,
      inputKategori: kategori,
      inputAlamat: alamat,
    });
  };

  changeInputNamaPemilik = (event) => {
    this.setState({
      inputNamaPemilik: event.target.value,
    });
  };

  changeInputEmail = (event) => {
    this.setState({
      inputEmail: event.target.value,
    });
  };

  changeInputTelfon = (event) => {
    this.setState({
      inputTelfon: event.target.value,
    });
  };

  changeInputUrl = (event) => {
    this.setState({
      inputUrl: event.target.value,
    });
  };

  changeInputNamaUmkm = (event) => {
    this.setState({
      inputNamaUmkm: event.target.value,
    });
  };

  changeInputKategori = (event) => {
    this.setState({
      inputKategori: event.target.value,
    });
  };

  changeInputAlamat = (event) => {
    this.setState({
      inputAlamat: event.target.value,
    });
  };

  onClickEdit = () => {
    let nama = this.state.inputNamaPemilik;
    let email = this.state.inputEmail;
    let phone = this.state.inputTelfon;
    let store_name = this.state.inputNamaUmkm;
    let store_category = this.state.inputKategori;
    let store_address = this.state.inputAlamat;
    let url_photo = this.state.inputUrl;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      nama: nama,
      phone: phone,
      store_address: store_address,
      store_category: store_category,
      store_name: store_name,
      url_photo: url_photo,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:5000/information/${this.props.id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => this.props.onHide())
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-secondary">
          <Modal.Title
            className="text-light"
            id="contained-modal-title-vcenter"
          >
            Edit Informasi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <h3>Informasi Pemilik</h3>
              <hr />
              <label htmlFor="nama-pemilik">Nama Pemilik</label>
              <input
                id="nama-pemilik"
                type="text"
                className="form-control"
                placeholder="Nama Pemilik"
                value={this.state.inputNamaPemilik}
                onChange={this.changeInputNamaPemilik}
              />
              <label htmlFor="email-pemilik" className="mt-3">
                Email Pemilik
              </label>
              <input
                id="email-pemilik"
                type="email"
                className="form-control"
                placeholder="Email Pemilik"
                value={this.state.inputEmail}
                onChange={this.changeInputEmail}
              />
              <label htmlFor="no-pemilik" className="mt-3">
                No Telfon
              </label>
              <input
                id="no-pemilik"
                type="number"
                className="form-control"
                placeholder="No Telfon"
                value={this.state.inputTelfon}
                onChange={this.changeInputTelfon}
              />
              <label htmlFor="url-photo" className="mt-3">
                URL Photo
              </label>
              <input
                id="url-photo"
                type="text"
                className="form-control"
                placeholder="URL Photo"
                value={this.state.inputUrl}
                onChange={this.changeInputUrl}
              />
            </div>
            <div className="col-6">
              <h3>Informasi UMKM</h3>
              <hr />
              <label htmlFor="nama-umkm">Nama UMKM</label>
              <input
                id="nama-umkm"
                type="text"
                className="form-control"
                placeholder="Nama UMKM"
                value={this.state.inputNamaUmkm}
                onChange={this.changeInputNamaUmkm}
              />
              <label htmlFor="kategori-umkm" className="mt-3">
                Kategori
              </label>
              <input
                id="kategori-umkm"
                type="text"
                className="form-control"
                placeholder="Kategori"
                value={this.state.inputKategori}
                onChange={this.changeInputKategori}
              />
              <label htmlFor="alamat-umkm" className="mt-3">
                Alamat UMKM
              </label>
              <input
                id="alamat-umkm"
                type="text"
                className="form-control"
                placeholder="Alamat UMKM"
                value={this.state.inputAlamat}
                onChange={this.changeInputAlamat}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-warning text-white"
            onClick={() => {
              this.onClickEdit();
            }}
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() => {
              this.setState({
                inputNamaPemilik: "",
                inputEmail: "",
                inputTelfon: "",
                inputNamaUmkm: "",
                inputKategori: "",
                inputAlamat: "",
                inputUrl: "",
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

export default class Home extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.modalElement = React.createRef();
  }

  state = {
    id: "",
    name: "",
    email: "",
    phone: "",
    storeName: "",
    storeCategory: "",
    storeAddress: "",
    urlPhoto: "",
    modalShow: false,
    setModalShow: false,
  };

  handleClickChangeChild = () => {
    const {
      name,
      email,
      phone,
      storeName,
      storeCategory,
      storeAddress,
      urlPhoto,
    } = this.state;
    this.modalElement.current.changeAllState(
      name,
      email,
      phone,
      urlPhoto,
      storeName,
      storeCategory,
      storeAddress
    );
  };

  setModalShow = (x) => {
    this.setState({
      modalShow: x,
    });
    if (x === false) {
      this.fetchInformation();
    }
  };

  fetchInformation = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://127.0.0.1:5000/information/${this.context.username}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          id: result.id,
          name: result.nama,
          email: result.email,
          phone: result.phone,
          storeName: result.store_name,
          storeCategory: result.store_category,
          storeAddress: result.store_address,
          urlPhoto: result.url_photo,
        });
      })
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchInformation();
  }

  render() {
    return (
      <Container title={"Beranda"} icon={"fa-home"} desc={"Informasi General"}>
        <div className="row">
          <div className="col-4">
            <div className="content-box">
              <div className="home-left-title">Informasi Pemilik</div>
              <div className="row">
                <div className="col-12">
                  <div className="home-image-box">
                    <img
                      className="img-fluid home-owner-photo"
                      src={this.state.urlPhoto}
                      alt="foto-pemilik"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="home-owner-name">{this.state.name}</div>
                  <div className="home-owner-email">
                    <a href="mailto:afgan@gmail.com" className=" text-center">
                      {this.state.email}
                    </a>
                  </div>

                  <div className="home-owner-phone">{this.state.phone}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="content-box">
              <div className="home-left-title">Informasi UMKM</div>

              <hr />
              <div className="home-sub-title">Detail UMKM</div>
              <div className="home-sub-title-container">
                <div className="home-label">Nama</div>
                <div className="home-label-content">
                  : {this.state.storeName}
                </div>
              </div>
              <div className="home-sub-title-container">
                <div className="home-label">Jenis Usaha</div>
                <div className="home-label-content">
                  : {this.state.storeCategory}
                </div>
              </div>
              <div className="home-sub-title-container">
                <div className="home-label">Alamat</div>
                <div className="home-label-content">
                  : {this.state.storeAddress}
                </div>
              </div>
              <hr />
              <div className="row justify-content-center">
                <div className="col-3">
                  <button
                    className="btn form-control btn-warning text-white"
                    onClick={() => {
                      this.setModalShow(true);
                      this.handleClickChangeChild();
                    }}
                  >
                    Edit Informasi
                  </button>

                  <ModalEnd
                    ref={this.modalElement}
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                    id={this.state.id}
                    name={this.state.name}
                    email={this.state.email}
                    phone={this.state.phone}
                    store_name={this.state.storeName}
                    store_category={this.state.storeCategory}
                    store_address={this.state.storeAddress}
                    url_photo={this.state.urlPhoto}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
