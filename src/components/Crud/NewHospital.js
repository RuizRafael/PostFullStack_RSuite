import React, { Component } from "react";
import axios from "axios";

import Global from "../../Global";
import Hostpiales from "./Hospitales";

import { Redirect } from "react-router-dom";
export default class InsertarDepartamento extends Component {
  cajaNombreRef = React.createRef();
  cajaDireccionRef = React.createRef();
  cajaTelefonoRef = React.createRef();
  cajaCamasRef = React.createRef();
  cajaIdRef = React.createRef();
  state = {
    status: false,
  };
  nuevoHospital = (e) => {
    e.preventDefault();
    var id = parseInt(this.cajaIdRef.current.value);
    var nom = this.cajaNombreRef.current.value;
    var dir = this.cajaDireccionRef.current.value;
    var telf = this.cajaTelefonoRef.current.value;
    var cam = parseInt(this.cajaCamasRef.current.value);

    var hosp = {
      numero: id,
      nombre: nom,
      direccion: dir,
      telefono: telf,
      camas: cam,
    };

    var request = "/webresources/hospitales/post";
    var url = Global.urlCrudHospitales + request;
    axios.post(url, hosp).then((res) => {
      this.setState({
        status: true,
      });
    });
  };
  render() {
    if (this.state.status == true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Nuevo departamento</h1>
        <form onSubmit={this.nuevoHospital} class="w-25 m-auto">
          <br />
          <label>ID: </label>
          <input
            type="number"
            name="cajaId"
            ref={this.cajaIdRef}
            className="form-control"
          />
          <br />
          <label>Nombre: </label>
          <input
            type="text"
            name="cajaNombre"
            ref={this.cajaNombreRef}
            className="form-control"
          />
          <br />
          <label>Direccion: </label>
          <input
            type="text"
            name="cajaDireccion"
            ref={this.cajaDireccionRef}
            className="form-control"
          />
          <br />
          <label>Telefono: </label>
          <input
            type="text"
            name="cajaTelefono"
            ref={this.cajaTelefonoRef}
            className="form-control"
          />
          <br />
          <label>Camas: </label>
          <input
            type="number"
            name="cajaCamas"
            ref={this.cajaCamasRef}
            className="form-control"
          />
          <br />
          <button type="submit" class="btn btn-outline-success">
            Send!
          </button>
          <br />
        </form>
        <h3 style={{ color: "red" }}> {this.state.mensaje}</h3>
      </div>
    );
  }
}
