import React, { Component } from "react";
import axios from "axios";
import Global from "../../Global";
import { Redirect } from "react-router-dom";
import { Modal, Button } from "rsuite";

export default class DeleteHospital extends Component {
  constructor(props) {
    super(props);
    this.setState({
      idHospital: props.idHospital,
      status: false,
      show: false,
    });
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({
      show: false,
    });
  }
  open(size) {
    this.setState({
      size,
      show: true,
    });
  }
  state = { status: false };
  eliminarHospital = () => {
    var request = "/webresources/hospitales/delete/" + this.props.idHospital;
    var url = Global.urlCrudHospitales + request;
    console.log(this.props.idhospital);
    axios
      .delete(url)
      .then((res) => {
        this.setState({ status: true });
      })
      .catch((error) => {
        console.warn("Not good man :(");
      });
  };

  componentDidMount = () => {
    this.open("xs");
  };
  render() {
    if (this.state.status == true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Modal
          size={this.state.size}
          show={this.state.show}
          onHide={this.close}
        >
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Quieres borrar el Hospital con ID: {this.props.idHospital}?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.eliminarHospital} appearance="primary">
              Ok
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
