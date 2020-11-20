import "./App.css";

import Router from "./../Router";

import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { Component } from "react";

import "rsuite/dist/styles/rsuite-default.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

export default App;
