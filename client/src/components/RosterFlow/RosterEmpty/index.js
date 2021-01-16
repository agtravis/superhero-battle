import React, { Component } from "react";
import AppButton from "../../AppButton";

class RosterEmpty extends Component {
  styles = {
    container: {
      alignItems: `center`,
      display: `flex`,
      flexDirection: `column`,
      height: `400px`,
      justifyContent: `space-evenly`,
    },
  };

  render() {
    return (
      <div style={this.styles.container}>
        <div>
          <p>You currently have nobody in your roster!</p>
        </div>
        <div>
          <AppButton
            id={`roster-empty-button`}
            onClick={this.props.getFirstTeamMember}
            width={`auto`}
          >
            Get Your First Team Member
          </AppButton>
        </div>
      </div>
    );
  }
}

export default RosterEmpty;
