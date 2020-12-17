import React, { Component } from "react";
import colors from "../../../config/colors";

class BattleGauge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
        <div style={{ display: `flex`, justifyContent: `space-between` }}>
          <div style={{ width: `100%` }}>
            <div
              style={{
                width: `${this.props.width}%`,
                height: `20px`,
                border: `solid 1px ${colors.darkSecondary}`,
                backgroundColor: `${colors.secondary}`,
                borderRadius: `10px`,
              }}
            ></div>
          </div>
          <div
            style={{
              width: `100px`,
              fontSize: `.8rem`,
              paddingLeft: `10px`,
              marginLeft: `10px`,
              borderLeft: `solid 1px ${colors.darkSecondary}`,
              borderBottom:
                this.props.defenderFinished &&
                this.props.challengerFinished &&
                this.props.won
                  ? `solid 3px ${colors.darkSecondary}`
                  : null,
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
