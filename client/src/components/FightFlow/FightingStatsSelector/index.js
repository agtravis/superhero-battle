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
        {this.props.predeterminedStat ? (
          <div>
            <h3>
              {this.props.isThirdRound
                ? `For the bonus round, the ability is:`
                : `Your opponent's best ability is:`}
            </h3>
            <ul
              style={{
                listStyleType: `none`,
              }}
            >
              <li>
                <AppButton
                  width={`200px`}
                  margin={`10px 0px`}
                  value={this.props.predeterminedStat}
                  onClick={this.props.fightWithThisStat}
                >
                  {this.capitalize(this.props.predeterminedStat)}
                </AppButton>
              </li>
            </ul>
          </div>
        ) : (
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
        )}
      </div>
    );
  }
}

export default FightingStatsSelector;
