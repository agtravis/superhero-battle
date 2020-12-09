import React, { Component } from "react";
import GetOpponent from "../components/FightFlow/GetOpponent";
// import SuperHeroAPI from "../utils/SuperHeroAPI";
// import fullList from "../utils/characters";
import SoloOrTeam from "../components/FightFlow/SoloOrTeam";

class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 0,
      isSoloFightMode: true,
    };
  }

  changePhase = direction => {
    if (this.state.phase === 1) {
      this.setState({ isSoloFightMode: true });
    }
    this.setState({ phase: this.state.phase + direction });
  };

  toggle = stateName => this.setState({ [stateName]: !this.state[stateName] });

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <div>
          <p>Phase: {this.state.phase + 1}</p>
        </div>
        <h2>Fight!</h2>
        {this.state.phase === 0 && (
          <SoloOrTeam
            changePhase={this.changePhase}
            toggle={this.toggle}
            isSoloFightMode={this.isSoloFightMode}
          />
        )}
        {this.state.phase === 1 && (
          <GetOpponent
            isSoloFightMode={this.state.isSoloFightMode}
            roster={this.props.roster}
          />
        )}
        {this.state.phase === 1 && (
          <div style={{ marginTop: `20px` }}>
            <button onClick={() => this.changePhase(-1)}>Back</button>
          </div>
        )}
      </div>
    );
  }
}

export default Fight;
