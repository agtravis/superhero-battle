import React, { Component } from "react";

import RosterSlot from "../RosterSlot";

class BattleOver extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.rosterFunction();
  }

  continue = () => {
    window.location.href = `/`;
  };

  render() {
    return (
      <div>
        <p>The winner is...</p>
        <h3>{this.props.winner}!!</h3>
        <p>{this.props.message}</p>
        <button onClick={() => this.continue()}>Continue!</button>
        {this.props.winner === `Challenger` ? (
          <>
            <p>These fighters have deserted from your roster:</p>
          </>
        ) : (
          <>
            <p>Welcome these fighters to your roster:</p>
          </>
        )}
        {this.props.characters.map((character, index) => (
          <RosterSlot key={index} character={character} />
        ))}
      </div>
    );
  }
}

export default BattleOver;
