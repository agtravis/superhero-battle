import React, { Component } from "react";
import AppButton from "../../AppButton";

class FightingStatsSelector extends Component {
  styles = {
    listContainer: {
      listStyleType: `none`,
    },
  };

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
            <ul style={this.styles.listContainer}>
              <li>
                <AppButton
                  id={`fight-with-this-stat-button`}
                  margin={`10px 0px`}
                  onClick={this.props.fightWithThisStat}
                  value={this.props.predeterminedStat}
                  width={`200px`}
                >
                  {this.capitalize(this.props.predeterminedStat)}
                </AppButton>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <h3>Choose your best ability for round {this.props.round}:</h3>
            <ul style={this.styles.listContainer}>
              {Object.keys(this.props.stats).map((stat, index) => (
                <li key={index} style={{ marginBottom: `5px` }}>
                  <AppButton
                    id={`fight-with-this-stat-button-${index}`}
                    margin={`10px 0px`}
                    onClick={this.props.fightWithThisStat}
                    value={stat}
                    width={`200px`}
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
