import React, { Component } from "react";
import { Link } from "react-router-dom";
import colors from "../../config/colors";

class NavLinkMobile extends Component {
  render() {
    return (
      <div
        style={{
          borderBottom: `1px dashed ${colors.secondary}`,
          paddingBottom: `3px`,
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
