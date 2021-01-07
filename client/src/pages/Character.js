import React, { Component } from "react";
import Appearance from "../components/CharacterFlow/Appearance";
import Biography from "../components/CharacterFlow/Biography";
import Connections from "../components/CharacterFlow/Connections";
import ImageAndStats from "../components/CharacterFlow/ImageAndStats";
import Work from "../components/CharacterFlow/Work";
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
        <hr />
        <ImageAndStats character={character} />
        <hr />
        <Biography biography={character.biography} />
        <hr />
        <Work work={character.work} />
        <hr />
        <Connections connections={character.connections} />
        <hr />
        <Appearance appearance={character.appearance} />
      </div>
    );
  }
}

export default Character;
