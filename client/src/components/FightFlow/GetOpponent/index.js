import React, { Component } from "react";
import SuperHeroAPI from "../../../utils/SuperHeroAPI";
import fullList from "../../../utils/characters";
import AppButton from "../../AppButton";
import IndexPortrait from "../../IndexPortrait";

class GetOpponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpponentAboutToBeChosen: true,
      isOpponentChosen: false,
      opposingTeam: [],
    };
  }

  nextPhase = () => {
    this.props.setOpposingTeam(this.state.opposingTeam);
    this.props.changePhase(1);
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
          <div
            style={{
              display: `flex`,
              justifyContent: `center`,
            }}
          >
            <AppButton width={`200px`} onClick={() => this.chooseOpponent()}>
              Reveal!
            </AppButton>
          </div>
        )}
        {this.state.isOpponentChosen && (
          <div>
            <div>
              {this.state.opposingTeam.map((character, index) => (
                <div key={index} style={{ margin: `10px 0px` }}>
                  {index !== 0 && <hr />}
                  <IndexPortrait round showStats character={character} />
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          style={{
            display: `flex`,
            justifyContent: `space-around`,

            flexWrap: `wrap`,
          }}
        >
          <AppButton
            margin={`10px auto`}
            onClick={() => this.props.changePhase(-1)}
            width={`200px`}
          >
            Back
          </AppButton>{" "}
          {this.state.isOpponentChosen && (
            <AppButton
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
