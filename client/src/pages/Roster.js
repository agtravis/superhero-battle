import React, { Component } from "react";

import SuperHeroAPI from "../utils/SuperHeroAPI";
import API from "../utils/API";

import LoadingAnimation from "../components/LoadingAnimation";
import RosterExists from "../components/RosterFlow/RosterExists";
import RosterEmpty from "../components/RosterFlow/RosterEmpty";
import PageTitle from "../components/PageTitle";
import CharacterLoaded from "../components/RosterFlow/CharacterLoaded";
import Prestige from "../components/RosterFlow/Prestige";

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rosterLoaded: false,
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

  componentDidMount() {
    this.loadRoster();
  }

  loadRoster = () => {
    API.getUserDetails(this.props.currentUser._id)
      .then(response =>
        this.setState({ rosterLoaded: true, roster: response.data.roster })
      )
      .catch(err => console.error(err));
  };

  styles = {
    container: {
      display: `flex`,
      justifyContent: `center`,
      flexDirection: `column`,
    },
  };

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
        this.setState({ rosterLoaded: false });
        this.props.fillUser();
        this.loadRoster();
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

  prestige = () => {
    API.prestige(this.props.currentUser._id)
      .then(() => {
        this.setState({ rosterLoaded: false });
        this.props.fillUser();
        this.loadRoster();
      })
      .catch(err => console.error(err));
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }

    return (
      <div>
        <PageTitle>Your Roster</PageTitle>
        {!this.state.rosterLoaded ? (
          <LoadingAnimation divHeight={400} size={150} />
        ) : (
          <div style={this.styles.container}>
            <p style={{ textAlign: `center` }}>
              ({this.state.roster.length}
              /731 recruited ||{` `}
              {((this.state.roster.length / 731) * 100).toFixed(2)}% complete)
            </p>
            {this.state.roster.length >= 731 && (
              <div>
                <Prestige roster={this.state.roster} prestige={this.prestige} />
                <hr />
              </div>
            )}
            <div>
              {/*DELETE CHEAT BUTTON */}
              {this.state.roster.length < 1 ? (
                <div>
                  {!this.state.newCharacterLoaded ? (
                    <RosterEmpty getFirstTeamMember={this.getFirstTeamMember} />
                  ) : (
                    <CharacterLoaded
                      newCharacter={this.state.newCharacter}
                      addToRoster={this.addToRoster}
                    />
                  )}
                </div>
              ) : (
                <RosterExists roster={this.state.roster} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Roster;

// <div>
//   <h1>You have filled up your roster!</h1>
//   <p>
//     <button onClick={() => this.prestige()}>Click</button> to
//     Prestige!
//   </p>
//   <p>This will empty your roster but level up your Prestige!</p>
// </div>
