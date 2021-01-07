import React, { Component } from "react";

class PropertyValues extends Component {
  render() {
    return (
      <p>
        <strong>{this.props.property}:</strong>
        {` `}
        {this.props.values.map(
          (current, index) =>
            `${current}${index === this.props.values.length - 1 ? `.` : `, `}`
        )}
      </p>
    );
  }
}

export default PropertyValues;
