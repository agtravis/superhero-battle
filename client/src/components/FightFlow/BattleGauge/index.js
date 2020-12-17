import React, { Component } from "react";
import colors from "../../../config/colors";

class BattleGauge extends Component {
  styles = {
    container: { display: `flex`, justifyContent: `space-between` },
    gauge: {
      backgroundColor: `${colors.secondary}`,
      border: `solid 1px ${colors.darkSecondary}`,
      borderRadius: `10px`,
      height: `20px`,
    },
    gaugeContainer: { width: `100%` },
    resultsContainer: {
      borderLeft: `solid 1px ${colors.darkSecondary}`,
      fontSize: `.8rem`,
      marginLeft: `10px`,
      paddingLeft: `10px`,
      width: `100px`,
    },
  };

  render() {
    return (
      <div>
        <div>
          {this.props.defenderFinished && this.props.challengerFinished ? (
            <p>
              Handicap:{` `}
              {Math.floor(this.props.handicap * 100)}%
            </p>
          ) : (
            <p>Expected to {this.props.winOrLose}</p>
          )}
        </div>
        <div style={this.styles.container}>
          <div style={this.styles.gaugeContainer}>
            <div
              style={{ ...this.styles.gauge, width: `${this.props.width}%` }}
            ></div>
          </div>
          <div
            style={{
              ...this.styles.resultsContainer,
              borderBottom:
                this.props.defenderFinished &&
                this.props.challengerFinished &&
                this.props.won
                  ? `solid 3px ${colors.darkSecondary}`
                  : `solid 3px ${colors.lightPrimary}`,
            }}
          >
            <p>
              {this.props.isSoloFightMode
                ? this.props.width.toFixed(2)
                : (this.props.width * 3).toFixed(2)}
              {` `}/ {this.props.stat}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default BattleGauge;
