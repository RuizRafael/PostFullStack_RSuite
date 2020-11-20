import axios from "axios";
import React, { Component } from "react";
import Global from "../../Global";
import DetailsHospital from "./DetailsHospital";
import { NavLink } from "react-router-dom";

import { Table } from "rsuite";
import { Alert } from "rsuite";
import { Notification } from "rsuite";

import "rsuite/dist/styles/rsuite-default.css";
import {
  Modal,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from "rsuite";

const { Column, HeaderCell, Cell, Pagination } = Table;
export default class Departamentos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitales: [],
      notificacion: "alert",
      notificacionChange: "push",
      status: false,

      formValue: {
        idhospital: "",
        nombre: "",
        direccion: "",
        telefono: "",
        camas: "",
      },
      show: false,
    };
    this.close = this.close.bind(this);
    this.changeNotification = this.changeNotification.bind(this);
    this.open = this.open.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  cargarHospitales = () => {
    var url = Global.urlCrudHospitales + Global.requestHospitales;
    axios.get(url).then((res) => {
      this.setState({
        hospitales: res.data,
        status: true,
      });
    });
    console.log("Cargando peliculas");
  };

  componentDidMount = () => {
    this.cargarHospitales();
  };

  //Notificacions type
  changeNotification() {
    if (this.state.notificacion == "push") {
      this.setState({ notificacion: "alert", notificacionChange: "push" });
    } else {
      this.setState({ notificacion: "push", notificacionChange: "alert" });
    }
  }

  //New user
  close() {
    this.setState({ show: false });
    if (this.state.notificacion == "push") {
      Alert.warning("No se ha modificado nada.", 2000);
    } else {
      Notification.warning({
        title: "Cancelado",
        description: "No se ha modificado nada",
      });
    }
  }
  open(id) {
    var url = Global.urlCrudHospitales + Global.requestHospitales + id;
    axios.get(url).then((res) => {
      this.setState({
        formValue: res.data,
        status: true,
        show: true,
      });
    });
  }
  handleChange(value) {
    console.log("CHANGING");
    this.setState({ formValue: value });
  }

  detallesRow(idRow) {
    alert("d");
  }

  closeAndSave = (e) => {
    e.preventDefault();
    var url = Global.urlCrudHospitales + Global.requestHospitales + "/put";
    // this.state.formValue.idhospital;

    var hosp = {
      idhospital: parseInt(this.state.formValue.idhospital),
      nombre: this.state.formValue.nombre,
      direccion: this.state.formValue.direccion,
      telefono: this.state.formValue.telefono,
      camas: parseInt(this.state.formValue.camas),
    };
    axios.put(url, hosp).then((res) => {
      this.setState({ show: false });
    });

    if (this.state.notificacion == "push") {
      Alert.info("La tabla se va a modificar...", 3000);
    } else {
      Notification.info({
        title: "Modificando...",
        duration: 3000,
        description: "La tabla se va a modificar...",
      });
    }
    var noti = this.state.notificacion;

    setTimeout(this.cargarHospitales, 3000);
    setTimeout(
      function (noti) {
        if (noti == "push") {
          Alert.success("La tabla se ha modificado correctamente.", 5000);
        } else {
          Notification.success({
            title: "Modificado!.",
            duration: 5000,
            description: "¡La tabla se ha modificado correctamente!",
          });
        }
      },
      3000,
      noti
    );
  };

  render() {
    return (
      <div>
        <h4>Notificaciones</h4>
        <button onClick={this.changeNotification} class="btn btn-outline-info">
          Cambiar a notificacion {this.state.notificacionChange}
        </button>
        <hr />
        <br />
        <h1>Hospitales</h1>

        <Table
          height={400}
          className="w-75 m-auto"
          data={this.state.hospitales}
          onRowClick={(data) => {
            console.log(data);
          }}
        >
          <Column width={70} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="idhospital" />
          </Column>

          <Column width={200} fixed>
            <HeaderCell>Nombre</HeaderCell>
            <Cell dataKey="nombre" />
          </Column>

          <Column width={200}>
            <HeaderCell>Dirección</HeaderCell>
            <Cell dataKey="direccion" />
          </Column>

          <Column width={200}>
            <HeaderCell>Teléfono</HeaderCell>
            <Cell dataKey="telefono" />
          </Column>

          <Column width={200}>
            <HeaderCell>Camas</HeaderCell>
            <Cell dataKey="camas" />
          </Column>

          <Column width={100} fixed="right">
            <HeaderCell>Editar</HeaderCell>

            <Cell>
              {(rowData) => {
                return (
                  <span>
                    <img
                      onClick={() => {
                        this.open(rowData.idhospital);
                      }}
                      src="https://icon-library.com/images/updating-icon/updating-icon-7.jpg"
                      height="30px"
                    ></img>
                  </span>
                );
              }}
            </Cell>
          </Column>
          <Column width={100} fixed="right">
            <HeaderCell>Detalles</HeaderCell>

            <Cell>
              {(rowData) => {
                return (
                  <span>
                    <DetailsHospital
                      idhospital={rowData.idhospital}
                    ></DetailsHospital>
                  </span>
                );
              }}
            </Cell>
          </Column>

          <Column width={100} fixed="right">
            <HeaderCell>Eliminar</HeaderCell>

            <Cell>
              {(rowData) => {
                return (
                  <div>
                    <NavLink to={"/delete/" + rowData.idhospital}>
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/business-finance-vol-12-2/512/25-512.png"
                        height="30px"
                      ></img>
                    </NavLink>
                  </div>
                );
              }}
            </Cell>
          </Column>
        </Table>

        <div>
          <Modal show={this.state.show} onHide={this.close} size="xs">
            <Modal.Header>
              <Modal.Title>Editando hospital</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                fluid
                onChange={this.handleChange}
                formDefaultValue={this.state.formValue}
              >
                <FormGroup>
                  <ControlLabel>Id</ControlLabel>
                  <FormControl name="idhospital" />
                  <HelpBlock>Único y no modificable</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Nombre</ControlLabel>
                  <FormControl name="nombre" type="text" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Dirección</ControlLabel>
                  <FormControl name="direccion" type="text" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Teléfono</ControlLabel>
                  <FormControl name="telefono" type="text" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Camas</ControlLabel>
                  <FormControl name="camas" type="number" />
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeAndSave} appearance="primary">
                Confirm
              </Button>
              <Button onClick={this.close} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
