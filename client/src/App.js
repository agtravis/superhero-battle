import React, { Component } from "react";
import NetworkDetector from "./Hoc/NetworkDetector";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>SUPERHERO BATTLE</div>;
  }
}
export default NetworkDetector(App);
