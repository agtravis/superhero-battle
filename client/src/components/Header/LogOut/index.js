import React, { Component } from "react";
import AppButton from "../../AppButton";
import HorizontalSpacer from "../../HorizontalSpacer";

class LogOut extends Component {
  styles = {
    logOutButtonContainer: { display: `flex`, justifyContent: `flex-end` },
    logOutContainer: { position: `relative` },
  };

  render() {
    return (
      <div style={this.styles.logOutContainer}>
        <div style={this.props.userButtonsStyle}>
          <div style={this.styles.logOutButtonContainer}>
            <AppButton
              id={`log-out-button`}
              margin={`0px`}
              onClick={() => this.props.logOut()}
              width={`auto`}
            >
              Log Out
            </AppButton>
          </div>
          <HorizontalSpacer width={10} />
          <div>
            <p>
              <em>{this.props.currentUser.username}</em>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LogOut;
