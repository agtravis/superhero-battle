import React, { Component } from "react";

class RoundTwoPre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fightingStat: null,
    };
  }

  setChallengerStat = () => {
    let highestStat = ``;
    let highestRating = 0;
    for (const stat of Object.entries(this.props.attackingStats)) {
      if (stat[1] > highestRating) {
        highestRating = stat[1];
        highestStat = stat[0];
      }
    }
    this.setState({ fightingStat: highestStat });
  };

  render() {
    return (
      <div>
        <h3>Round {this.props.round}!</h3>
        <p>Your opponent is picking their best chance to win!</p>
        {!this.state.fightingStat ? (
          <button onClick={() => this.setChallengerStat()}>Reveal!</button>
        ) : (
          <>
            <p>Your opponent picked {this.state.fightingStat}!</p>
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

export default RoundTwoPre;
