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
      contender1: null,
      teams: null,
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
      })
      .catch(err => console.error(err));
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
            <PreFightDivWrapper>2</PreFightDivWrapper>
            <PreFightDivWrapper>3</PreFightDivWrapper>
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
