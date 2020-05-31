import React, { Component } from "react";

class RoundThreePre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fightingStat: null,
    };
  }

  setChallengerStat = () => {
    const keys = Object.keys(this.props.attackingStats);
    const randomNum = Math.floor(Math.random() * keys.length);
    const randomStat = keys[randomNum];
    this.setState({ fightingStat: randomStat });
  };

  render() {
    return (
      <div>
        <h3>Round {this.props.round}!</h3>
        <p>We have a tie! Bonus round!</p>
        {!this.state.fightingStat ? (
          <button onClick={() => this.setChallengerStat()}>
            Select Random Stat!
          </button>
        ) : (
          <>
            <p>The random stat is: {this.state.fightingStat}!</p>
            <button
              value={this.state.fightingStat}
              onClick={event => this.props.fightWithThisStat(event)}
            >
              Advance to the fight!
            </button>
          </>
        )}
      </div>
    );
  }
}

export default RoundThreePre;
