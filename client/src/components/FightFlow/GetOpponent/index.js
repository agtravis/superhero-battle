import React, { Component } from "react";
import SuperHeroAPI from "../../../utils/SuperHeroAPI";
import fullList from "../../../utils/characters";
import AppButton from "../../AppButton";
import Team from "../../Team";

class GetOpponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpponentAboutToBeChosen: true,
      isOpponentChosen: false,
      opposingTeam: [],
    };
  }

  styles = {
    buttonsContainer: {
      display: `flex`,
      flexWrap: `wrap-reverse`,
      justifyContent: `space-around`,
    },
    container: {
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
    },
    revealButtonContainer: {
      display: `flex`,
      justifyContent: `center`,
    },
  };

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
      isOpponentChosen: true,
    });
  };

  nextPhase = () => {
    this.props.setOpposingTeam(this.state.opposingTeam);
    this.props.changePhase(1);
  };

  render() {
    return (
      <div style={this.styles.container}>
        <h3>Get your opponent{!this.props.isSoloFightMode && `s`}!</h3>
        {this.state.isOpponentAboutToBeChosen && (
          <div style={this.styles.revealButtonContainer}>
            <AppButton
              id={`get-opponent-reveal-button`}
              margin={`10px`}
              width={`200px`}
              onClick={() => this.chooseOpponent()}
            >
              Reveal!
            </AppButton>
          </div>
        )}
        {this.state.isOpponentChosen && (
          <div>
            <div>
              {this.state.opposingTeam.length > 0 ? (
                <Team team={this.state.opposingTeam} />
              ) : null}
            </div>
          </div>
        )}
        <div
          style={{
            ...this.styles.buttonsContainer,
            marginTop: this.state.opposingTeam.length === 1 ? `80px` : `0px`,
          }}
        >
          <AppButton
            id={`get-opponent-back-button`}
            margin={`10px auto`}
            onClick={() => this.props.changePhase(-1)}
            width={`200px`}
          >
            Back
          </AppButton>{" "}
          {this.state.isOpponentChosen && (
            <AppButton
              id={`get-opponent-next-button`}
              margin={`10px auto`}
              onClick={() => this.nextPhase()}
              width={`200px`}
            >
              Next
            </AppButton>
          )}
        </div>
      </div>
    );
  }
}

export default GetOpponent;
