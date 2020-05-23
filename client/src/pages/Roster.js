import React, { Component } from "react";
import { Link } from "react-router-dom";

import SuperHeroAPI from "../utils/SuperHeroAPI";
// import API from "../utils/API";

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: [],
    };
  }

  getFirstTeamMember = () => {
    SuperHeroAPI.getRandomCharacter()
      .then(randomCharacter => {
        console.log(randomCharacter);
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
        {this.props.roster.length < 1 ? (
          <div>
            <p>You do not have anyone in your roster yet!</p>
            <button onClick={() => this.getFirstTeamMember()}>
              Click to get your first team member!
            </button>
          </div>
        ) : null}
        <Link to={`/`}>Index</Link>
      </div>
    );
  }
}

export default Roster;
