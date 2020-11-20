import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Hospitales from "./Crud/Hospitales";
import NewHospital from "./Crud/NewHospital";
import DeleteHospital from "./Crud/DeleteHospitales";
import MenuHospitales from "./Crud/MenuHospitales";
import DetailsHospital from "./Crud/DetailsHospital";

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <MenuHospitales />
        <Switch>
          <Route exact path="/" component={Hospitales} />
          <Route exact path="/create" component={NewHospital} />
          <Route
            exact
            path="/details/:id"
            render={(props) => {
              var id = props.match.params.id;
              return <DetailsHospital idDepartamento={id} />;
            }}
          />

          <Route
            exact
            path="/delete/:idHospital"
            render={(props) => {
              var idHospital = props.match.params.idHospital;
              return <DeleteHospital idHospital={idHospital} />;
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
