import React, { Component } from "react";

class VerticalSpacer extends Component {
  render() {
    return (
      <div
        style={{
          height: `${this.props.height}${
            this.props.units ? this.props.units : `px`
          }`,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default VerticalSpacer;
