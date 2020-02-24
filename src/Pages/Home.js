import React, { Component } from "react";

import ImgPemilik from "../assets/foto-pemilik.jpg";
import ImgUMKM from "../assets/bebek-goreng.jpg";

import SideBar from "../Components/SideBar";

import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <div className="content-container">
          <div className="content-icon-container">
            <i className="fas fa-home content-icon"></i>
          </div>
          <div className="content-text-container">
            <div className="content-title">
              /Beranda <span className="content-desc">Informasi General</span>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="content-box">
                <div className="home-left-title">Informasi Pemilik</div>
                <div className="row">
                  <div className="col-12">
                    <div className="home-image-box">
                      <img
                        className="img-fluid home-owner-photo"
                        src={ImgPemilik}
                        alt="foto-pemilik"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="home-owner-name">Afgan</div>
                    <div className="home-owner-email">
                      <a href="mailto:afgan@gmail.com" className=" text-center">
                        afgan@gmail.com
                      </a>
                    </div>

                    <div className="home-owner-phone">5555-555-55</div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div className="col-8">
              <div className="content-box">
                <div className="home-left-title">Informasi UMKM</div>
                <div className="row justify-content-center">
                  <div className="col-6">
                    <div className="home-umkm-photo">
                      <img className="img-fluid" src={ImgUMKM} alt="" />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="home-sub-title">Detail UMKM</div>
                <div className="home-sub-title-container">
                  <div className="home-label">Nama</div>
                  <div className="home-label-content">: Bebek Komar</div>
                </div>
                <div className="home-sub-title-container">
                  <div className="home-label">Jenis Usaha</div>
                  <div className="home-label-content">: Makanan</div>
                </div>
                <div className="home-sub-title-container">
                  <div className="home-label">Alamat</div>
                  <div className="home-label-content">
                    : Jalan Gegerkalong Girang No. 159
                  </div>
                </div>
                <hr />
                <div className="home-sub-title">Detail Lainnya</div>
                <div className="home-sub-title-container">
                  <div className="home-label">Nama</div>
                  <div className="home-label-content">: Bebek Komar</div>
                </div>
                <div className="home-sub-title-container">
                  <div className="home-label">Jenis Usaha</div>
                  <div className="home-label-content">: Makanan</div>
                </div>
                <div className="home-sub-title-container">
                  <div className="home-label">Alamat</div>
                  <div className="home-label-content">
                    : Jalan Gegerkalong Girang No. 159
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
