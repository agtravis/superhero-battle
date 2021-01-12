import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Profile from "../components/Profile";
import Rules from "../components/Rules";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
    };
  }

  loadCharacter = character => {
    const { history } = this.props;
    if (history) {
      history.push(`/`);
    }
    this.setState({ character: character });
  };

  render() {
    if (this.props.location.state) {
      if (this.props.location.state.type === `rematch`) {
        return (
          <Redirect
            to={{
              pathname: `/fight`,
              state: { ...this.props.location.state },
            }}
          />
        );
      } else if (this.props.location.state.type === `refresh`) {
        window.location.reload();
      }
    }
    if (this.state.character) {
      return (
        <Redirect
          to={{
            pathname: `/character`,
            state: {
              character: this.state.character,
            },
          }}
        />
      );
    }
    return (
      <div>
        {this.props.loaded && (
          <PageTitle>
            Welcome
            {this.props.loggedIn ? (
              <em>{` ${this.props.currentUser.username}!`}</em>
            ) : (
              `!`
            )}
          </PageTitle>
        )}
        {this.props.loggedIn && this.props.loaded && (
          <div>
            <Profile
              currentUser={this.props.currentUser}
              loadCharacter={this.loadCharacter}
              loggedIn={this.props.loggedIn}
              profileId={this.props.currentUser._id}
            />
          </div>
        )}
        {!this.props.loggedIn && this.props.loaded && (
          <div>
            <p>
              {this.props.title} is a game in which you can face off all your
              favorite heroes and villains against eachother!
            </p>
            <p>
              There are 731 characters from all sides, and all franchises. You
              can fight solo, or you can form a team and go all in: the greater
              the risk, the greater the reward. Recruit allies and defeat foes,
              and try to get everyone on your side!
            </p>
            <p>Rules:</p>
            <Rules />
          </div>
        )}
      </div>
    );
  }
}

export default Index;
