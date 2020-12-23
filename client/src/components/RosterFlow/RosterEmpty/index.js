import React, { Component } from "react";
import AppButton from "../../AppButton";

class RosterEmpty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `space-evenly`,
          height: `400px`,
          alignItems: `center`,
        }}
      >
        <div>
          <p>You currently have nobody in your roster!</p>
        </div>
        <div>
          <AppButton onClick={this.props.getFirstTeamMember}>
            Get Your First Team Member
          </AppButton>
        </div>
      </div>
    );
  }
}

export default RosterEmpty;
