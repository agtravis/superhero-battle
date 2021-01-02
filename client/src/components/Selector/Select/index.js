import React, { Component } from "react";
import colors from "../../../config/colors";

class Select extends Component {
  styles = {
    selector: {
      backgroundColor: colors.lightPrimary,
      color: colors.secondary,
      padding: `0.6rem 1.4rem 0.5rem 0.8rem`,
    },
  };

  render() {
    return (
      <select
        onChange={event => this.props.onChange(event.target.value)}
        style={this.styles.selector}
      >
        {this.props.children}
      </select>
    );
  }
}

export default Select;
