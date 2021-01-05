import React, { Component } from "react";
import IndexPortrait from "../../../IndexPortrait";
import ProfileCardHeader from "../../ProfileCardHeader";

class LatestRecruit extends Component {
  render() {
    return (
      <div>
        <ProfileCardHeader>
          {this.props.signedInVsGeneric(
            `Your`,
            `${this.props.profileData.username}'s`
          )}
          {` `}Latest Recruit:
        </ProfileCardHeader>
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
            <p>
              {this.props.signedInVsGeneric(
                `You only have `,
                `${this.props.profileData.username} only has `
              )}
              one recruit!
            </p>
          ) : (
            <p>
              {this.props.signedInVsGeneric(
                `You have `,
                `${this.props.profileData.username} has `
              )}
              no recruits!
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default LatestRecruit;
