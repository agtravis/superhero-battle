import React, { Component } from "react";
import Profile from "../components/Profile";
import Rules from "../components/Rules";

class Index extends Component {
  render() {
    return (
      <div>
        <h1>
          Welcome
          {this.props.loggedIn ? ` ${this.props.currentUser.username}` : null}!
        </h1>
        {this.props.loggedIn ? (
          <div>
            <Profile
              loggedIn={this.props.loggedIn}
              currentUser={this.props.currentUser}
              profileId={this.props.currentUser._id}
            />
          </div>
        ) : (
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
            <Rules />
          </div>
        )}
      </div>
    );
  }
}

export default Index;
