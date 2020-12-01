import React, { Component } from "react";

class HorizontalSpacer extends Component {
  render() {
    return (
      <div
        style={{
          width: `${this.props.width}${
            this.props.units ? this.props.units : `px`
          }`,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default HorizontalSpacer;
