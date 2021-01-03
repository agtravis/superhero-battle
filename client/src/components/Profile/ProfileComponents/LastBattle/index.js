import React, { Component } from "react";
import LastBattleCard from "../../../LastBattleCard";

class LastBattle extends Component {
  render() {
    return (
      <div>
        {this.props.profileData.pastBattles.length > 0 ? (
          <LastBattleCard
            battle={
              this.props.profileData.pastBattles[
                this.props.profileData.pastBattles.length - 1
              ]
            }
          />
        ) : (
          <p>You have not fought any battles yet!</p>
        )}
      </div>
    );
  }
}

export default LastBattle;
