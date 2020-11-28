import React, { Component } from "react";
import { Link } from "react-router-dom";

import colors from "../../config/colors";

class NavLinkMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          borderBottom: `1px dashed ${colors.secondary}`,
        }}
      >
        <Link
          style={{ ...this.props.style, color: colors.secondary }}
          to={this.props.to}
        >
          {this.props.children === `Profile`
            ? `${this.props.username}'s Profile`
            : this.props.children}
        </Link>
      </div>
    );
  }
}

export default NavLinkMobile;
