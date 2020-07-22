import React, { Component } from "react";
import { Link } from "react-router-dom";

import API from "../utils/API";
import SuperHeroAPI from "../utils/SuperHeroAPI";

import PreFightDivWrapper from "../components/PreFightDivWrapper";
import RosterSelectionSlot from "../components/RosterSelectionSlot";

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slot1: null,
      slot2: null,
      slot3: null,
    };
  }

  getContender = characterId => {
    SuperHeroAPI.loadContender(characterId)
      .then(character => {
        API.addToTeam(this.props.currentUser._id, character.data)
          .then(() => {
            this.props.fillUser();
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };

  removeTeamMember = event => {
    API.removeFromTeam(this.props.currentUser._id, event.target.dataset.id)
      .then(() => {
        this.props.fillUser();
        this.setState({ slot1: null, slot2: null, slot3: null });
      })
      .catch(err => console.error(err));
  };

  inTeam = character => {
    for (const member of this.props.teams) {
      if (member._id === character._id) {
        return false;
      }
    }
    return true;
  };

  render() {
    return (
      <div>
        {this.props.roster.length >= 3 ? (
          <div style={{ display: `flex`, justifyContent: `space-around` }}>
            <PreFightDivWrapper>
              {this.props.teams[0] ? (
                <p
                  data-id={this.props.teams[0]._id}
                  onClick={event => this.removeTeamMember(event)}
                >
                  {this.props.teams[0].name}
                </p>
              ) : (
                <div>
                  {this.state.slot1 === null ? (
                    <button
                      onClick={() => this.setState({ slot1: `choosing` })}
                    >
                      Get your first team member!
                    </button>
                  ) : (
                    <div>
                      <p>Team Member #1</p>
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
                  )}
                </div>
              )}
            </PreFightDivWrapper>
            <PreFightDivWrapper teams={this.props.teams}>
              {this.props.teams[1] ? (
                <p
                  data-id={this.props.teams[1]._id}
                  onClick={event => this.removeTeamMember(event)}
                >
                  {this.props.teams[1].name}
                </p>
              ) : (
                <div>
                  {this.state.slot2 === null ? (
                    <button
                      onClick={() => this.setState({ slot2: `choosing` })}
                    >
                      Get your second team member!
                    </button>
                  ) : (
                    <div>
                      <p>Team Member #2</p>
                      <div>
                        {this.props.roster
                          .filter(character => this.inTeam(character))
                          .map((character, index) => (
                            <RosterSelectionSlot
                              key={index}
                              index={index}
                              character={character}
                              getContender={this.getContender}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </PreFightDivWrapper>
            <PreFightDivWrapper teams={this.props.teams}>
              {this.props.teams[2] ? (
                <p
                  data-id={this.props.teams[2]._id}
                  onClick={event => this.removeTeamMember(event)}
                >
                  {this.props.teams[2].name}
                </p>
              ) : (
                <div>
                  {this.state.slot3 === null ? (
                    <button
                      onClick={() => this.setState({ slot3: `choosing` })}
                    >
                      Get your third team member!
                    </button>
                  ) : (
                    <div>
                      <p>Team Member #3</p>
                      <div>
                        {this.props.roster
                          .filter(character => this.inTeam(character))
                          .map((character, index) => (
                            <RosterSelectionSlot
                              key={index}
                              index={index}
                              character={character}
                              getContender={this.getContender}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </PreFightDivWrapper>
          </div>
        ) : (
          <div>
            <p>
              There are not enough fighters in your Roster to complete a team!
            </p>
            <p>
              Go fight <Link to={`/fightsolo`}>solo</Link> to gain recruits!
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Teams;
