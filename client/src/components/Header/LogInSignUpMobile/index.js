import React, { Component } from "react";
import AppLink from "../../AppLink";
import HorizontalSpacer from "../../HorizontalSpacer";

class LogInSignUpMobile extends Component {
  styles = {
    mobileLogInSignUpContainer: {
      display: `flex`,
      flexDirection: `row`,
      paddingTop: `8px`,
    },
  };

  render() {
    return (
      <div style={this.styles.mobileLogInSignUpContainer}>
        <AppLink onClick={() => this.props.showLogInMobile()}>Log In</AppLink>
        <HorizontalSpacer width={10} />
        <AppLink onClick={() => this.props.showSignUpMobile()}>Sign Up</AppLink>
      </div>
    );
  }
}

export default LogInSignUpMobile;
