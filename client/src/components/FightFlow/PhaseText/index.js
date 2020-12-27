import React, { Component } from "react";

class PhaseText extends Component {
  phaseText = (phase, solo) => {
    phase += 1;
    switch (phase) {
      case 2:
        return `${phase} - Get Your Challenger`;
      case 3:
        return `${phase} - Choose Your ${solo ? `Fighter` : `Team`}`;
      case 4:
        return `${phase} - Staging!`;
      default:
        return `${phase} - Choose Your Fighting Mode`;
    }
  };

  render() {
    return (
      <div>
        <p>
          Phase: {this.phaseText(this.props.phase, this.props.isSoloFightMode)}
          {this.props.phase >= 1 &&
            `; Mode: ${this.props.isSoloFightMode ? `Solo` : `Team`}-Fight`}
          {this.props.phase >= 2 &&
            `; Opposing ${
              this.props.isSoloFightMode ? `Fighter` : `Team`
            }: ${this.props.opposingTeam.map(
              (character, index) => `${index !== 0 ? ` ` : ``}${character.name}`
            )}`}
          {this.props.phase >= 3 &&
            `; Defending ${
              this.props.isSoloFightMode ? `Fighter` : `Team`
            }: ${this.props.defendingTeam.map(
              (character, index) => `${index !== 0 ? ` ` : ``}${character.name}`
            )}`}
        </p>
      </div>
    );
  }
}

export default PhaseText;
