import React, { Component } from "react";
import LastBattleCard from "../../../LastBattleCard";

class LastBattle extends Component {
  render() {
    return (
      <div>
        {this.props.profileData.pastBattles.length > 0 ? (
          <LastBattleCard
            signedInVsGeneric={this.props.signedInVsGeneric}
            profileData={this.props.profileData}
            battle={
              this.props.profileData.pastBattles[
                this.props.profileData.pastBattles.length - 1
              ]
            }
          />
        ) : (
          <p>
            {this.props.signedInVsGeneric(
              `You have `,
              `${this.props.profileData.username} has `
            )}
            not fought any battles yet!
          </p>
        )}
      </div>
    );
  }
}

export default LastBattle;
