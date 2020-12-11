import React, { Component } from "react";
import AppButton from "../../AppButton";

class FightingStatsSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  capitalize = str => str[0].toUpperCase() + str.substring(1);

  render() {
    return (
      <div>
        <h3>Choose your best ability for round {this.props.round}:</h3>
        <ul
          style={{
            listStyleType: `none`,
          }}
        >
          {Object.keys(this.props.stats).map((stat, index) => (
            <li key={index} style={{ marginBottom: `5px` }}>
              <AppButton
                value={stat}
                width={`200px`}
                margin={`10px 0px`}
                onClick={this.props.fightWithThisStat}
              >
                {this.capitalize(stat)}: {this.props.stats[stat]}
              </AppButton>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FightingStatsSelector;
