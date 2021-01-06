import React, { Component } from "react";

class PropertyValue extends Component {
  render() {
    return (
      <p>
        <strong>{this.props.property}:</strong> {this.props.value}
      </p>
    );
  }
}

export default PropertyValue;
