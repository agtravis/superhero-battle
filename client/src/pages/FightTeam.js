import React, { Component } from "react";
import { Link } from "react-router-dom";

import SuperHeroAPI from "../utils/SuperHeroAPI";

import fullList from "../utils/characters";

import FighterTitleCard from "../components/FighterTitleCard";

class TeamFight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opposingTeam: [],
      opposingTeamSelectionMode: false,
      fightMode: false,
    };
  }

  getRivals = () => {
    const opposingTeam = [];
    const currentRoster = this.props.roster;
    const inRoster = new Map();
    for (const character of currentRoster) {
      inRoster.set(character.id, character.name);
    }
    const outRoster = fullList.filter(
      character =>
        !inRoster.has(character.id) && !opposingTeam.includes(character.id)
    );
    const randomNum = Math.floor(Math.random() * outRoster.length);
    const nextChallenger = outRoster[randomNum];
    SuperHeroAPI.getNewOpponent(nextChallenger.id)
      .then(data => {
        opposingTeam.push(data.data[0]);
        this.setState({ opposingTeam: opposingTeam });
      })
      .catch(err => console.error(err));
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <h1>Team Fight</h1>
        {this.props.roster.length >= 3 ? (
          <div>
            {this.props.teams.length === 3 ? (
              <div>
                {this.state.opposingTeamSelectionMode === false ? (
                  <div>
                    <button
                      onClick={() =>
                        this.setState({ opposingTeamSelectionMode: true })
                      }
                    >
                      Get Contenders!
                    </button>
                    {this.props.teams.map((current, index) => {
                      return (
                        <FighterTitleCard
                          key={index}
                          title={`Team #${index + 1}`}
                          character={current}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <h2>Who Challenges You?</h2>
                    <button onClick={() => this.getRivals()}>
                      Click to get rivals!
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p>
                Your team is short, visit your <Link to={`/teams`}>teams</Link>{" "}
                page to enlist recruit(s).
              </p>
            )}
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

export default TeamFight;
