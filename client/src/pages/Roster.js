import React, { Component } from "react";
import { Link } from "react-router-dom";

import SuperHeroAPI from "../utils/SuperHeroAPI";
import API from "../utils/API";

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: [],
      newCharacter: null,
      newCharacterLoaded: false,
      redirect: false,
    };
  }

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
        alert(`you added ${this.state.newCharacter.name} to your roster!`);
        this.props.fillUser();
      })
      .catch(err => console.error(err));
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    // if (this.state.redirect) {
    //   return <Redirect to={`/roster`} />;
    // }

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
            {!this.state.newCharacterLoaded ? (
              <>
                <p>You do not have anyone in your roster yet!</p>
                <button onClick={() => this.getFirstTeamMember()}>
                  Click to get your first team member!
                </button>{" "}
              </>
            ) : (
              <div>
                <p>{this.state.newCharacter.name}</p>
                <img
                  src={this.state.newCharacter.image.url}
                  alt={this.state.newCharacter.name}
                />
                <button onClick={() => this.addToRoster()}>
                  Add to Roster!
                </button>
              </div>
            )}
          </div>
        ) : null}

        <Link to={`/`}>Index</Link>
      </div>
    );
  }
}

export default Roster;
