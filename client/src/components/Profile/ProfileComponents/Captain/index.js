import React, { Component } from "react";
import IndexPortrait from "../../../IndexPortrait";

class Captain extends Component {
  render() {
    return (
      <div>
        <h3>
          {this.props.signedInVsGeneric(
            `Your`,
            `${this.props.profileData.username}'s`
          )}
          {` `}Captain:
        </h3>
        <div>
          {this.props.profileData.roster[0] ? (
            <IndexPortrait
              character={this.props.profileData.roster[0]}
              round
              showStats
            />
          ) : (
            <p>You have nobody in your roster!</p>
          )}
        </div>
      </div>
    );
  }
}

export default Captain;
