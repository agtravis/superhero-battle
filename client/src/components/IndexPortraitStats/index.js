import React, { Component } from "react";
import Stat from "../Stat";

class IndexPortraitStats extends Component {
  render() {
    return (
      <div style={{ display: `flex`, justifyContent: `space-around` }}>
        <div>
          <Stat
            right
            statTitle={`Combat`}
            statRating={this.props.character.powerstats.combat}
          />
          <Stat
            right
            statTitle={`Durability`}
            statRating={this.props.character.powerstats.durability}
          />
          <Stat
            right
            statTitle={`Intelligence`}
            statRating={this.props.character.powerstats.intelligence}
          />
          <Stat
            right
            statTitle={`Power`}
            statRating={this.props.character.powerstats.power}
          />
          <Stat
            right
            statTitle={`Speed`}
            statRating={this.props.character.powerstats.speed}
          />
          <Stat
            right
            statTitle={`Strength`}
            statRating={this.props.character.powerstats.strength}
          />
        </div>
      </div>
    );
  }
}

export default IndexPortraitStats;
