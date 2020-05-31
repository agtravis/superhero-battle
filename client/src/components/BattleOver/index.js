import React, { Component } from "react";

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
          <>challenger card</>
        ) : (
          <>defender card</>
        )}
      </div>
    );
  }
}

export default BattleOver;
