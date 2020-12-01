import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.css";

class NavLink extends Component {
  render() {
    return (
      <Link className={`nav-link`} style={this.props.style} to={this.props.to}>
        {this.props.children === `Profile`
          ? `${this.props.username}'s Profile`
          : this.props.children}
      </Link>
    );
  }
}

export default NavLink;
