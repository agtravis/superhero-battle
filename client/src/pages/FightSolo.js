import React, { Component } from "react";

import SuperHeroAPI from "../utils/SuperHeroAPI";

import fullList from "../utils/characters";

class SoloFight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextOpponent: null,
    };
  }

  preFightStyleDiv = {
    border: `1px dashed black`,
    width: `30%`,
    height: `500px`,
    padding: `10px`,
    margin: `10px`,
  };

  contenderImageStyle = {
    width: `80%`,
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

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <p>SoloFight</p>
        <div style={{ display: `flex`, justifyContent: `space-around` }}>
          <div style={this.preFightStyleDiv}>
            {!this.state.nextOpponent ? (
              <button onClick={() => this.getNewFighter()}>Get opponent</button>
            ) : (
              <>
                <h3 style={this.cardHeader}>{this.state.nextOpponent.name}</h3>
                <div style={this.imageContainer}>
                  <img
                    src={this.state.nextOpponent.image.url}
                    alt={this.state.nextOpponent.name}
                    style={this.contenderImageStyle}
                  />
                </div>
              </>
            )}
          </div>
          <div style={this.preFightStyleDiv}>
            {!this.state.nextOpponent ? (
              <button onClick={() => this.getNewFighter()}>
                First choose your opponent!
              </button>
            ) : (
              <p>Who do you want to fight {this.state.nextOpponent.name}?</p>
            )}
          </div>
          <div style={this.preFightStyleDiv}></div>
          {/* 2. choose your fighter from scrollable div, with stats. Click on selection, presents modal, confirm or exit. Once confirmed, fighter replaces selection
          
          3. this is just a button that says fight, appears when both other divs have been selected, opens modal for fight to take place in
*/}
          {/* In the fight, user chooses first category, computer chooses second (highest), third is random. best of 3. 
          each character multiply stat by different random number, compare two results, highest wins
          win = collect your opponent
          lose = lose your fighter
          if all categories are null , random number will be chosen
          If a category is null, stat is randomly assigned.
*/}
        </div>
      </div>
    );
  }
}

export default SoloFight;
