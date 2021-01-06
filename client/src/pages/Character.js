import React, { Component } from "react";
import Appearance from "../components/CharacterFlow/Appearance";
import ImageAndStats from "../components/CharacterFlow/ImageAndStats";
import PageTitle from "../components/PageTitle";

class Character extends Component {
  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    const character = this.props.location.state.character;
    return (
      <div>
        <div>
          <PageTitle>{character.name}</PageTitle>
        </div>
        <ImageAndStats character={character} />
        <Appearance appearance={character.appearance} />
      </div>
    );
  }
}

export default Character;
