import React, { Component } from "react";

class Select extends Component {
  render() {
    return (
      <select onChange={event => this.props.onChange(event.target.value)}>
        {this.props.children}
      </select>
    );
  }
}

export default Select;
