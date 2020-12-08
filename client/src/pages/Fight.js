import React, { Component } from "react";
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
        <h2>Fight!</h2>
        {this.state.phase === 0 && (
          <SoloOrTeam
            changePhase={this.changePhase}
            toggle={this.toggle}
            isSoloFightMode={this.isSoloFightMode}
          />
        )}
        {this.state.phase === 1 && (
          <div>
            <button onClick={() => this.changePhase(-1)}>Back</button>
          </div>
        )}
      </div>
    );
  }
}

export default Fight;
