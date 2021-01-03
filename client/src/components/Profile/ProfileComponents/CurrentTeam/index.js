import React, { Component } from "react";
import Team from "../../../Team";

class CurrentTeam extends Component {
  render() {
    return (
      <div>
        <h3>
          {this.props.signedInVsGeneric(
            `Your`,
            `${this.props.profileData.username}'s`
          )}
          {` `}Current Team:
        </h3>
        {this.props.profileData.teams.length > 0 ? (
          <Team team={this.props.profileData.teams} />
        ) : (
          <p>You do not have any members of your roster assigned to a team</p>
        )}
      </div>
    );
  }
}

export default CurrentTeam;
