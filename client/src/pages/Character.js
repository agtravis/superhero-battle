import React, { Component } from "react";

class Character extends Component {
  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    const character = this.props.location.state.character;
    return <div>{character.name}</div>;
  }
}

export default Character;
