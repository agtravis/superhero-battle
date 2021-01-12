import React, { Component } from "react";
import IndexPortrait from "../../../IndexPortrait";
import ProfileCardHeader from "../../ProfileCardHeader";

class Captain extends Component {
  styles = {
    clickable: { cursor: this.props.loadCharacter && `pointer` },
  };

  loadCharacter = character =>
    this.props.loadCharacter && this.props.loadCharacter(character);

  render() {
    return (
      <div>
        <ProfileCardHeader>
          {this.props.signedInVsGeneric(
            `Your`,
            `${this.props.profileData.username}'s`
          )}
          {` `}Captain:
        </ProfileCardHeader>
        <div
          style={this.styles.clickable}
          onClick={() => this.loadCharacter(this.props.profileData.roster[0])}
        >
          {this.props.profileData.roster[0] ? (
            <IndexPortrait
              character={this.props.profileData.roster[0]}
              round
              showStats
            />
          ) : (
            <p>
              {this.props.signedInVsGeneric(
                `You have `,
                `${this.props.profileData.username} has `
              )}
              nobody in
              {this.props.signedInVsGeneric(` your`, ` their`)} roster!
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Captain;
