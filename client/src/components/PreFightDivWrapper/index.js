import React, { Component } from "react";

class PreFightDivWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  preFightStyleDiv = {
    border: `1px dashed black`,
    width: `30%`,
    minHeight: `500px`,
    height: `auto`,
    padding: `10px`,
    margin: `10px`,
  };

  render() {
    return <div style={this.preFightStyleDiv}>{this.props.children}</div>;
  }
}

export default PreFightDivWrapper;
