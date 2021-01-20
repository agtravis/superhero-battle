import React, { Component } from "react";
import AppButton from "../../AppButton";
import AppLink from "../../AppLink";
import HorizontalSpacer from "../../HorizontalSpacer";

class LogInSignUp extends Component {
  styles = {
    buttonsContainer: { position: `relative` },
  };

  render() {
    return (
      <div style={this.styles.buttonsContainer}>
        <div style={this.props.userButtonsStyle}>
          <div>
            <AppButton
              id={`log-in-button`}
              margin={`0px`}
              onClick={() => this.props.showLogIn()}
              width={`auto`}
            >
              Log In
            </AppButton>
          </div>
          <HorizontalSpacer width={10} />
          <div style={this.styles.signUpLinkContainer}>
            <AppLink onClick={() => this.props.showSignUp()}>Sign Up</AppLink>
          </div>
        </div>
      </div>
    );
  }
}

export default LogInSignUp;
