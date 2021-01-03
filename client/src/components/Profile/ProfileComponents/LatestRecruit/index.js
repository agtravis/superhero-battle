import React, { Component } from "react";
import IndexPortrait from "../../../IndexPortrait";

class LatestRecruit extends Component {
  render() {
    return (
      <div>
        <h3>
          {this.props.signedInVsGeneric(
            `Your`,
            `${this.props.profileData.username}'s`
          )}
          {` `}Latest Recruit:
        </h3>
        <div>
          {this.props.profileData.roster.length > 1 ? (
            <IndexPortrait
              character={
                this.props.profileData.roster[
                  this.props.profileData.roster.length - 1
                ]
              }
              round
              showStats
            />
          ) : this.props.profileData.roster[0] ? (
            <p>You only have one team member!</p>
          ) : (
            <p>You have nobody in your team!</p>
          )}
        </div>
      </div>
    );
  }
}

export default LatestRecruit;
