import React, { Component } from "react";

import SuperHeroAPI from "../utils/SuperHeroAPI";
import API from "../utils/API";

import RosterSlot from "../components/RosterSlot";

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: [],
      newCharacter: null,
      newCharacterLoaded: false,
      redirect: false,
      imageValid: true,
      cheatTeamIds1: null,
      cheatTeamIds2: null,
      cheatTeamIds3: null,
    };
  }

  noImage = () => {
    this.setState({ imageValid: false });
  };

  getFirstTeamMember = () => {
    SuperHeroAPI.getRandomNewCharacter()
      .then(randomCharacter => {
        this.setState({
          newCharacter: randomCharacter.data[0],
          newCharacterLoaded: true,
        });
      })
      .catch(err => console.error(err));
  };

  addToRoster = () => {
    API.addCharacterToRoster(this.props.currentUser._id, {
      characterId: this.state.newCharacter._id,
    })
      .then(() => {
        this.props.fillUser();
      })
      .catch(err => console.error(err));
  };

  getTeam = () => {
    SuperHeroAPI.getRandomNewCharacter()
      .then(randomCharacter => {
        this.setState({
          cheatTeamIds1: randomCharacter.data[0]._id,
        });
        SuperHeroAPI.getRandomNewCharacter()
          .then(randomCharacter => {
            this.setState({
              cheatTeamIds2: randomCharacter.data[0]._id,
            });
            SuperHeroAPI.getRandomNewCharacter()
              .then(randomCharacter => {
                this.setState({
                  cheatTeamIds3: randomCharacter.data[0]._id,
                });
                API.addManyCharactersToRoster(this.props.currentUser._id, [
                  this.state.cheatTeamIds1,
                  this.state.cheatTeamIds2,
                  this.state.cheatTeamIds3,
                ])
                  .then(() => this.props.fillUser())
                  .catch(err => console.error(err));
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };

  removeFromRoster = characterId => {
    API.removeCharacterFromRoster(this.props.currentUser._id, {
      characterId: characterId,
    })
      .then(() => {
        this.props.fillUser();
      })
      .catch(err => console.error(err));
  };

  prestige = () => {
    API.prestige(this.props.currentUser._id)
      .then(() => {
        this.props.fillUser();
      })
      .catch(err => console.error(err));
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }

    return (
      <div>
        <h1>Roster</h1>
        {this.props.loggedIn ? (
          <p>{this.props.currentUser.username} signed in</p>
        ) : (
          <p>nobody signed in</p>
        )}
        {this.props.roster.length >= 731 ? (
          <div>
            <h1>You have filled up your roster!</h1>
            <p>
              <button onClick={() => this.prestige()}>Click</button> to
              Prestige!
            </p>
            <p>This will empty your roster but level up your Prestige!</p>
          </div>
        ) : (
          <div>
            {this.props.roster.length < 1 ? (
              <div>
                {!this.state.newCharacterLoaded ? (
                  <>
                    <p>You do not have anyone in your roster yet!</p>
                    <button onClick={() => this.getFirstTeamMember()}>
                      Click to get your first team member!
                    </button>{" "}
                    <p>Get full team</p>
                    <button onClick={() => this.getTeam()}>Cheat!</button>
                  </>
                ) : (
                  <div>
                    <p>{this.state.newCharacter.name}</p>
                    {this.state.newCharacter.image.url &&
                    this.state.imageValid ? (
                      <img
                        src={this.state.newCharacter.image.url}
                        alt={this.state.newCharacter.name}
                        onError={() => this.noImage()}
                      />
                    ) : (
                      <p>No Image on File!</p>
                    )}
                    <button onClick={() => this.addToRoster()}>
                      Add to Roster!
                    </button>
                  </div>
                )}
              </div>
            ) : (
              this.props.roster.map((character, index) => (
                <RosterSlot
                  key={index}
                  index={index}
                  character={character}
                  removeFromRoster={this.removeFromRoster}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Roster;
