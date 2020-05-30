import React, { Component } from "react";

import RosterSelectionSlot from "../components/RosterSelectionSlot";

import SuperHeroAPI from "../utils/SuperHeroAPI";

import fullList from "../utils/characters";

import PreFightDivWrapper from "../components/PreFightDivWrapper";
import FightMode from "../components/FightMode";

class SoloFight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextOpponent: null,
      contender: null,
      imageValid: true,
      fightMode: false,
    };
  }

  preFightStyleDiv = {
    border: `1px dashed black`,
    width: `30%`,
    minHeight: `500px`,
    height: `auto`,
    padding: `10px`,
    margin: `10px`,
  };

  contenderImageStyle = {
    display: `block`,
    maxWidth: `250px`,
    maxHeight: `400px`,
    width: `auto`,
    height: `auto`,
  };

  imageContainer = {
    display: `flex`,
    justifyContent: `center`,
  };

  cardHeader = {
    textAlign: `center`,
  };

  getNewFighter = () => {
    const currentRoster = this.props.roster;
    const inRoster = new Map();
    for (const character of currentRoster) {
      inRoster.set(character.id, character.name);
    }
    const outRoster = fullList.filter(character => !inRoster.has(character.id));
    const randomNum = Math.floor(Math.random() * outRoster.length);
    const nextChallenger = outRoster[randomNum];
    SuperHeroAPI.getNewOpponent(nextChallenger.id)
      .then(data => {
        this.setState({ nextOpponent: data.data[0] });
      })
      .catch(err => console.error(err));
  };

  getContender = id => {
    SuperHeroAPI.loadContender(id)
      .then(data => {
        this.setState({ contender: data.data });
      })
      .catch(err => console.error(err));
  };

  noImage = () => {
    this.setState({ imageValid: false });
  };

  startFight = () => {
    this.setState({ fightMode: true });
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <p>SoloFight</p>
        {!this.state.fightMode ? (
          <div style={{ display: `flex`, justifyContent: `space-around` }}>
            <PreFightDivWrapper>
              {!this.state.nextOpponent ? (
                <button onClick={() => this.getNewFighter()}>
                  Get opponent
                </button>
              ) : (
                <>
                  <div style={this.cardHeader}>
                    <p>Challenger</p>
                    <h3>{this.state.nextOpponent.name}</h3>
                  </div>
                  <div style={this.imageContainer}>
                    {this.state.nextOpponent.image.url &&
                    this.state.imageValid ? (
                      <img
                        src={this.state.nextOpponent.image.url}
                        alt={this.state.nextOpponent.name}
                        style={this.contenderImageStyle}
                        onError={() => this.noImage()}
                      />
                    ) : (
                      <p>No Image on File!</p>
                    )}
                  </div>
                </>
              )}
            </PreFightDivWrapper>

            <PreFightDivWrapper>
              {!this.state.nextOpponent ? (
                <button onClick={() => this.getNewFighter()}>
                  First choose your opponent!
                </button>
              ) : (
                <div>
                  {!this.state.contender ? (
                    <div>
                      <p>
                        Who do you want to fight {this.state.nextOpponent.name}?
                      </p>
                      <div>
                        {this.props.roster.map((character, index) => (
                          <RosterSelectionSlot
                            key={index}
                            index={index}
                            character={character}
                            getContender={this.getContender}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={this.cardHeader}>
                        <p>versus</p>
                        <h3>{this.state.contender.name}!</h3>
                      </div>
                      <div style={this.imageContainer}>
                        {this.state.contender.image.url ? (
                          <img
                            src={this.state.contender.image.url}
                            alt={this.state.contender.name}
                            style={this.contenderImageStyle}
                          />
                        ) : (
                          <p>No Image on File!</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </PreFightDivWrapper>
            <PreFightDivWrapper>
              <div
                style={{
                  height: `100%`,
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                }}
              >
                {this.state.contender ? (
                  <button onClick={() => this.startFight()}>Fight!</button>
                ) : (
                  <p>Choose your fighters!</p>
                )}
              </div>
            </PreFightDivWrapper>
            {/* In the fight, user chooses first category, computer chooses second (highest), third is random. best of 3. 
          each character multiply stat by different random number, compare two results, highest wins
          win = collect your opponent
          lose = lose your fighter
          if all categories are null , random number will be chosen
          If a category is null, stat is randomly assigned.*/}
          </div>
        ) : (
          <FightMode
            challengers={[this.state.nextOpponent]}
            defenders={[this.state.contender]}
            currentUser={this.props.currentUser}
          />
        )}
      </div>
    );
  }
}

export default SoloFight;
