import React, { Component } from "react";

import API from "../../utils/API";

import RosterSlot from "../RosterSlot";

class BattleOver extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.rosterFunction();
    this.logBattle();
  }

  continue = () => {
    window.location.href = `/`;
  };

  logBattle = () => {
    const details = {
      date: Date.now(),
      challengers: [],
      defenders: [],
      winner: this.props.winner,
    };
    for (const challenger of this.props.challengers) {
      const individualDetails = {
        id: challenger._id,
        name: challenger.name,
        image: challenger.image.url,
      };
      details.challengers.push(individualDetails);
    }
    for (const defender of this.props.defenders) {
      const individualDetails = {
        id: defender._id,
        name: defender.name,
        image: defender.image.url,
      };
      details.defenders.push(individualDetails);
    }
    API.logBattle(this.props.currentUser._id, details)
      .then()
      .catch(err => console.error(err));
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
