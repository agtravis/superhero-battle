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
        {this.props.loggedIn ? (
          <p>{this.props.currentUser.username} signed in</p>
        ) : (
          <p>nobody signed in</p>
        )}
        <p>
          How do you want to fight? <Link to={`/fightsolo`}>Solo Fight</Link> or{" "}
          <Link to={`/fightteam`}>Team Fight</Link>
        </p>
      </div>
    );
  }
}

export default Fight;
