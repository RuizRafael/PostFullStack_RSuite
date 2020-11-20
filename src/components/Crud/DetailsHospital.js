import axios from "axios";
import React, { Component } from "react";
import { Notification } from "rsuite";

import Global from "../../Global";
import "rsuite/dist/styles/rsuite-default.css";
import "react-router-dom";
import { Drawer, Button } from "rsuite";
import { Alert } from "rsuite";

export default class DetailsHospital extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idhospital: props.idhospital,
      show: false,
      idhospital: "",
      nombre: "",
      direccion: "",
      telefono: "",
      camas: "",
    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  close() {
    this.setState({
      show: false,
    });
      Alert.info("¡Se han mostrado los detalles correctamente!", 4000);
    
  }
  toggleDrawer() {
    var url =
      Global.urlCrudHospitales +
      Global.requestHospitales +
      this.props.idhospital;
    axios.get(url).then((res) => {
      this.setState({
        idhospital: res.data.idhospital,
        nombre: res.data.nombre,
        direccion: res.data.direccion,
        telefono: res.data.telefono,
        camas: res.data.camas,
        show: true,
      });
    });
  }

  render() {
    const { show } = this.state;

    return (
      <div>
        <img
          onClick={() => {
            this.toggleDrawer();
          }}
          src="//cdn1.iconfinder.com/data/icons/education-set-4/512/information-512.png"
          height="25px"
        />

        <Drawer size="xs" placement="right" show={show} onHide={this.close}>
          <Drawer.Header>
            <Drawer.Title>
              Hospital con ID: {this.state.idhospital}
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <h5>Nombre:</h5>
            <ul>
              <li>{this.state.nombre}</li>
            </ul>
            <h5>Dirección:</h5>
            <ul>
              <li>{this.state.direccion}</li>
            </ul>
            <h5>Teléfono:</h5>
            <ul>
              <li>{this.state.telefono}</li>
            </ul>
            <h5>Camas:</h5>
            <ul>
              <li>{this.state.camas}</li>
            </ul>
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={this.close} appearance="primary">
              Confirm
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Drawer.Footer>
        </Drawer>
      </div>
    );
  }
}
