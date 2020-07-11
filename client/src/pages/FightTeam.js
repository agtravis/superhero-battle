import React, { Component } from "react";
import { Link } from "react-router-dom";

class TeamFight extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
              <p>TEAM DISPLAYS</p>
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
