import React, { Component } from "react";

import SuperHeroAPI from "../utils/SuperHeroAPI";
import API from "../utils/API";

import IndexPortrait from "../components/IndexPortrait";
import AppButton from "../components/AppButton";

import LoadingAnimation from "../components/LoadingAnimation";
import RosterExists from "../components/RosterFlow/RosterExists";

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
    API.getUserDetails(this.props.currentUser._id)
      .then(response =>
        this.setState({ rosterLoaded: true, roster: response.data.roster })
      )
      .catch(err => console.error(err));
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
        <h1>Your Roster</h1>
        {!this.state.rosterLoaded ? (
          <LoadingAnimation divHeight={400} size={150} />
        ) : (
          <div>
            <p>
              ({this.state.roster.length}
              /731 recruited ||{` `}
              {((this.state.roster.length / 731) * 100).toFixed(2)}% complete)
            </p>
            {this.state.roster.length >= 731 ? (
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
                {/*DELETE CHEAT BUTTON */}
                {this.state.roster.length < 1 ? (
                  <div>
                    {!this.state.newCharacterLoaded ? (
                      <div>
                        <p>You do not have anyone in your roster yet!</p>
                        <button onClick={() => this.getFirstTeamMember()}>
                          Click to get your first team member!
                        </button>{" "}
                        <p>Get full team</p>
                        {this.state.roster.length < 3 ? (
                          <button onClick={() => this.getTeam()}>Cheat!</button>
                        ) : null}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: `flex`,
                          justifyContent: `center`,
                          flexDirection: `column`,
                        }}
                      >
                        <div>
                          <IndexPortrait
                            round
                            showStats
                            character={this.state.newCharacter}
                          />
                        </div>
                        <div
                          style={{
                            display: `flex`,
                            justifyContent: `center`,
                          }}
                        >
                          <AppButton
                            width={`200px`}
                            margin={`10px  0px`}
                            onClick={this.addToRoster}
                          >
                            Add To Roster!
                          </AppButton>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <RosterExists roster={this.state.roster} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Roster;
