import React, { Component } from "react";
import ProfileCardHeader from "../../ProfileCardHeader";
import Team from "../../../Team";

class CurrentTeam extends Component {
  render() {
    return (
      <div>
        <ProfileCardHeader>
          {this.props.signedInVsGeneric(
            `Your`,
            `${this.props.profileData.username}'s`
          )}
          {` `}Current Team:
        </ProfileCardHeader>
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
