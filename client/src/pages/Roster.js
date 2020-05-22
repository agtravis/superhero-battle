import React, { Component } from "react";
import { Link } from "react-router-dom";

// import API from "../utils/API";

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: [],
    };
  }

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
        <Link to={`/`}>Index</Link>
      </div>
    );
  }
}

export default Roster;
