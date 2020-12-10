import React, { Component } from "react";
import GetDefenderSolo from "../components/FightFlow/GetDefenderSolo";
import GetDefenderTeam from "../components/FightFlow/GetDefenderTeam";
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
      defendingTeam: [],
      opposingTeam: [],
    };
  }

  setDefendingTeam = defendingTeam =>
    this.setState({ defendingTeam: defendingTeam });

  setOpposingTeam = opposingTeam =>
    this.setState({ opposingTeam: opposingTeam });

  changePhase = direction => {
    if (this.state.phase === 1 && direction === -1) {
      this.setState({ isSoloFightMode: true });
    }
    if (this.state.phase === 2 && direction === -1) {
      this.setState({ opposingTeam: [] });
    }
    if (this.state.phase === 3 && direction === -1) {
      this.setState({ defendingTeam: [] });
    }
    this.setState({ phase: this.state.phase + direction });
  };

  toggle = stateName => this.setState({ [stateName]: !this.state[stateName] });

  phaseText = (phase, solo) => {
    phase += 1;
    switch (phase) {
      case 2:
        return `${phase} - Get Your Challenger`;
      case 3:
        return `${phase} - Choose Your ${solo ? `Fighter` : `Team`}`;
      default:
        return `${phase} - Choose Your Fighting Mode`;
    }
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <div>
          <p>
            Phase:{" "}
            {this.phaseText(this.state.phase, this.state.isSoloFightMode)}
            {this.state.phase >= 1 &&
              `; Mode: ${this.state.isSoloFightMode ? `Solo` : `Team`}-Fight`}
            {this.state.phase >= 2 &&
              `; Opposing ${
                this.state.isSoloFightMode ? `Fighter` : `Team`
              }: ${this.state.opposingTeam.map(
                (character, index) =>
                  `${index !== 0 ? ` ` : ``}${character.name}`
              )}`}
            {this.state.phase >= 3 &&
              `; Defending ${
                this.state.isSoloFightMode ? `Fighter` : `Team`
              }: ${this.state.defendingTeam.map(
                (character, index) =>
                  `${index !== 0 ? ` ` : ``}${character.name}`
              )}`}
          </p>
        </div>
        <h2>Fight!</h2>
        {this.state.phase === 0 && (
          <SoloOrTeam
            roster={this.props.roster}
            changePhase={this.changePhase}
            toggle={this.toggle}
            isSoloFightMode={this.isSoloFightMode}
          />
        )}
        {this.state.phase === 1 && (
          <GetOpponent
            setOpposingTeam={this.setOpposingTeam}
            changePhase={this.changePhase}
            isSoloFightMode={this.state.isSoloFightMode}
            roster={this.props.roster}
          />
        )}
        {this.state.phase === 2 && this.state.isSoloFightMode && (
          <GetDefenderSolo
            setDefendingTeam={this.setDefendingTeam}
            roster={this.props.roster}
            changePhase={this.changePhase}
          />
        )}
        {this.state.phase === 2 && !this.state.isSoloFightMode && (
          <GetDefenderTeam team={this.props.team} />
        )}

        {this.state.phase === 3 && (
          <div style={{ marginTop: `20px` }}>
            <button onClick={() => this.changePhase(-1)}>Back</button>
          </div>
        )}
      </div>
    );
  }
}

export default Fight;
