import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    inputUsername: "",
    inputPassword: "",
    inputKonfirmasiPassword: "",
    inputNama: "",
    inputEmail: "",
    inputPhone: "",
    inputNamaToko: "",
    inputKategori: "",
    inputAlamat: "",
    inputUrl: "",
    inputCycle: "",
    err: false,
    errMsg: "",
  };

  onChangeUsername = (event) => {
    this.setState({
      inputUsername: event.target.value,
    });
  };

  onChangePassword = (event) => {
    this.setState({
      inputPassword: event.target.value,
    });
  };

  onChangeKonfirmasiPassword = (event) => {
    this.setState({
      inputKonfirmasiPassword: event.target.value,
    });
  };

  onChangeNama = (event) => {
    this.setState({
      inputNama: event.target.value,
    });
  };

  onChangeEmail = (event) => {
    this.setState({
      inputEmail: event.target.value,
    });
  };

  onChangePhone = (event) => {
    this.setState({
      inputPhone: event.target.value,
    });
  };

  onChangeNamaToko = (event) => {
    this.setState({
      inputNamaToko: event.target.value,
    });
  };

  onChangeKategori = (event) => {
    this.setState({
      inputKategori: event.target.value,
    });
  };

  onChangeAlamat = (event) => {
    this.setState({
      inputAlamat: event.target.value,
    });
  };

  onChangeUrl = (event) => {
    this.setState({
      inputUrl: event.target.value,
    });
  };

  onChangeCycle = (event) => {
    this.setState({
      inputCycle: event.target.value,
    });
  };

  handleClickRegister = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: this.state.inputUsername,
      password: this.state.inputPassword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/user`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          username: this.state.inputUsername,
          nama: this.state.inputNama,
          email: this.state.inputEmail,
          phone: this.state.inputPhone,
          store_name: this.state.inputNamaToko,
          store_category: this.state.inputKategori,
          store_address: this.state.inputAlamat,
          url_photo: this.state.inputUrl,
          cycle: this.state.inputCycle,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_API_URL}/information`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            this.props.history.push("/");
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  };

  checkErr = () => {
    const {
      inputUsername,
      inputPassword,
      inputKonfirmasiPassword,
      inputNama,
      inputEmail,
      inputPhone,
      inputNamaToko,
      inputKategori,
      inputAlamat,
      inputUrl,
      inputCycle,
    } = this.state;

    if (
      inputUsername === "" ||
      inputPassword === "" ||
      inputKonfirmasiPassword === "" ||
      inputNama === "" ||
      inputEmail === "" ||
      inputPhone === "" ||
      inputNamaToko === "" ||
      inputKategori === "" ||
      inputAlamat === "" ||
      inputUrl === "" ||
      inputCycle === ""
    ) {
      this.toggleErr("Isi Semua Kolom");
      return false;
    } else if (inputPassword !== inputKonfirmasiPassword) {
      this.toggleErr("Password dan Konfirmasi Password Tidak Sama");
      return false;
    } else {
      return true;
    }
  };

  toggleErr = (msg) => {
    this.setState({
      err: true,
      errMsg: msg,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 text-center">
            <div className="card shadow-sm p-3 mt-5 bg-white rounded">
              <div className="login-title">REGISTER</div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <input
                  type="text"
                  value={this.state.inputUsername}
                  onChange={this.onChangeUsername}
                  className="form-control"
                  placeholder="Username"
                ></input>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-key"></i>
                  </div>
                </div>
                <input
                  type="password"
                  value={this.state.inputPassword}
                  onChange={this.onChangePassword}
                  className="form-control"
                  placeholder="Password"
                ></input>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-key"></i>
                  </div>
                </div>
                <input
                  type="password"
                  value={this.state.inputKonfirmasiPassword}
                  onChange={this.onChangeKonfirmasiPassword}
                  className="form-control"
                  placeholder="Konfirmasi Password"
                ></input>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
                <input
                  type="text"
                  value={this.state.inputNama}
                  onChange={this.onChangeNama}
                  className="form-control"
                  placeholder="Nama Pemilik"
                ></input>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </div>
                </div>
                <input
                  type="email"
                  value={this.state.inputEmail}
                  onChange={this.onChangeEmail}
                  className="form-control"
                  placeholder="Email Pemilik"
                ></input>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-phone"></i>
                  </div>
                </div>
                <input
                  type="text"
                  value={this.state.inputPhone}
                  onChange={this.onChangePhone}
                  className="form-control"
                  placeholder="Nomor Telfon"
                ></input>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-store-alt"></i>
                  </div>
                </div>
                <input
                  type="text"
                  value={this.state.inputNamaToko}
                  onChange={this.onChangeNamaToko}
                  className="form-control"
                  placeholder="Nama UMKM"
                ></input>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-layer-group"></i>
                  </div>
                </div>
                <input
                  type="text"
                  value={this.state.inputKategori}
                  onChange={this.onChangeKategori}
                  className="form-control"
                  placeholder="Kategori UMKM"
                ></input>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-map-marked"></i>
                  </div>
                </div>
                <input
                  type="text"
                  value={this.state.inputAlamat}
                  onChange={this.onChangeAlamat}
                  className="form-control"
                  placeholder="Alamat UMKM"
                ></input>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-image"></i>
                  </div>
                </div>
                <input
                  type="text"
                  value={this.state.inputUrl}
                  onChange={this.onChangeUrl}
                  className="form-control"
                  placeholder="URL Photo"
                ></input>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-redo"></i>
                  </div>
                </div>
                <input
                  type="text"
                  value={this.state.inputCycle}
                  onChange={this.onChangeCycle}
                  className="form-control"
                  placeholder="Belanja Setiap Berapa Hari"
                ></input>
              </div>

              {this.state.err ? (
                <div className="mt-3 text-danger">{this.state.errMsg} </div>
              ) : (
                ""
              )}

              <button
                onClick={() => {
                  if (this.checkErr() === true) {
                    this.handleClickRegister();
                  }
                }}
                className="btn btn-outline-info form-control mt-4"
              >
                Register
              </button>

              <div className="d-flex justify-content-center mt-3">
                <div>Sudah Memiliki Akun?</div>
              </div>

              <button
                onClick={() => {
                  this.props.history.push("/");
                }}
                className="btn btn-info form-control mt-3"
              >
                Login
              </button>

              {/*  */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
