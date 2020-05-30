import React, { Component } from "react";

class RoundOnePre extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h3>Round {this.props.round}!</h3>
        <p>Pick your best ability for the fight:</p>
        <ul>
          {Object.keys(this.props.defendingStats).map((stat, index) => {
            return (
              <li key={index} style={{ marginBottom: `5px` }}>
                <button
                  value={stat}
                  onClick={event => this.props.fightWithThisStat(event)}
                >
                  {stat}: {this.props.defendingStats[stat]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RoundOnePre;
