import React, { Component } from "react";
import ImageAndStats from "../components/CharacterFlow/ImageAndStats";
import PageTitle from "../components/PageTitle";

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (this.props.character !== prevProps.character) {
      this.setState({ imageValid: true });
    }
  }

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
      </div>
    );
  }
}

export default Character;
