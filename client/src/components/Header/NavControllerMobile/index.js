import React, { Component } from "react";
import { FaBars, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import colors from "../../../config/colors";

class NavControllerMobile extends Component {
  styles = {
    headerAndMenu: { position: `relative` },
    iconContainer: { position: `absolute`, left: `-40%` },
    loggedOutMenuContainer: { position: `absolute`, left: `-12.5%` },
  };

  render() {
    return (
      <div id={`header-and-menu`} style={this.styles.headerAndMenu}>
        {this.props.loggedIn ? (
          <div onClick={this.props.showNav} style={this.styles.iconContainer}>
            <FaBars />
          </div>
        ) : (
          <div style={this.styles.loggedOutMenuContainer}>
            <Link to={this.props.pathname === `/about` ? `/` : `/about`}>
              <FaInfoCircle color={colors.black} />
            </Link>
          </div>
        )}
        <div>
          <h4 style={this.props.headerTitleTextStyle}>{this.props.title}</h4>
        </div>
      </div>
    );
  }
}

export default NavControllerMobile;
