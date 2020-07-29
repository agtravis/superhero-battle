import React, { Component } from "react";
import { Link } from "react-router-dom";
import FighterTitleCard from "../components/FighterTitleCard";

class TeamFight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opposingTeamSelectionMode: false,
      fightMode: false,
    };
  }

  getRivals = () => {
    alert(`getting rivals`);
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
