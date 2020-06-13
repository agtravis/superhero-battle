import React, { Component } from "react";
import { Link } from "react-router-dom";

class Fight extends Component {
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
        <h1>Fight</h1>
        {this.props.roster.length >= 1 ? (
          <p>
            How do you want to fight? <Link to={`/fightsolo`}>Solo Fight</Link>{" "}
            or <Link to={`/fightteam`}>Team Fight</Link>
          </p>
        ) : (
          <div>
            <p>Nobody in your Roster!</p>
            <p>
              Click <Link to={`/roster`}>here</Link> to get a team captain!
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Fight;
