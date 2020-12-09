import React, { Component } from "react";
import SuperHeroAPI from "../../../utils/SuperHeroAPI";
import fullList from "../../../utils/characters";
import AppButton from "../../AppButton";

class GetOpponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpponentAboutToBeChosen: true,
      isOpponentBeingChosen: false,
      opposingTeam: [],
    };
  }

  chooseOpponent = () => {
    const currentRoster = this.props.roster;
    const inRoster = new Map();
    const inOpposingTeam = new Map();
    for (const character of currentRoster) {
      inRoster.set(character.id, character.name);
    }
    for (const character of this.state.opposingTeam) {
      inOpposingTeam.set(character.id, character.name);
    }
    const outRoster = fullList.filter(
      character =>
        !inRoster.has(character.id) && !inOpposingTeam.has(character.id)
    );
    const randomNum = Math.floor(Math.random() * outRoster.length);
    const nextChallenger = outRoster[randomNum];
    SuperHeroAPI.getNewOpponent(nextChallenger.id)
      .then(response => {
        const opposingTeam = this.state.opposingTeam;
        opposingTeam.push(response.data[0]);
        this.setState({ opposingTeam: opposingTeam });
        if (!this.props.isSoloFightMode && this.state.opposingTeam.length < 3) {
          this.chooseOpponent();
        }
      })
      .catch(err => console.error(err));
    this.setState({
      isOpponentAboutToBeChosen: false,
      isOpponentBeingChosen: true,
    });
  };

  render() {
    return (
      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `center`,
        }}
      >
        <h3>Get your opponent{!this.props.isSoloFightMode && `s`}!</h3>
        {this.state.isOpponentAboutToBeChosen && (
          <AppButton onClick={() => this.chooseOpponent()}>Click</AppButton>
        )}
        {this.state.isOpponentBeingChosen && <p>isOpponentBeingChosen</p>}
      </div>
    );
  }
}

export default GetOpponent;
