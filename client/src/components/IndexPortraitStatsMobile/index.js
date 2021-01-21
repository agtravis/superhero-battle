import React, { Component } from "react";
import Stat from "../Stat";

class IndexPortraitStatsMobile extends Component {
  styles = {
    container: {
      display: `flex`,
      justifyContent: `space-around`,
      marginTop: `10px`,
    },
  };

  render() {
    return (
      <div style={this.styles.container}>
        <div>
          <Stat
            left
            statTitle={`Combat`}
            statRating={this.props.character.powerstats.combat}
          />
          <Stat
            left
            statTitle={`Durability`}
            statRating={this.props.character.powerstats.durability}
          />
          <Stat
            left
            statTitle={`Intelligence`}
            statRating={this.props.character.powerstats.intelligence}
          />
        </div>
        <div style={{ textAlign: `end` }}>
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

export default IndexPortraitStatsMobile;
