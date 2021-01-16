import React, { Component } from "react";
import AppButton from "../../AppButton";
import IndexPortrait from "../../IndexPortrait";

class CharacterLoaded extends Component {
  styles = {
    buttonContainer: {
      display: `flex`,
      justifyContent: `center`,
    },
    container: {
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
    },
  };

  render() {
    return (
      <div style={this.styles.container}>
        <div>
          <IndexPortrait round showStats character={this.props.newCharacter} />
        </div>
        <div style={this.styles.buttonContainer}>
          <AppButton
            id={`character-loaded-add-button`}
            onClick={this.props.addToRoster}
          >
            Add To Roster!
          </AppButton>
        </div>
      </div>
    );
  }
}

export default CharacterLoaded;
