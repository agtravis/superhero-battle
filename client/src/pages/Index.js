import React, { Component } from "react";
import { Link } from "react-router-dom";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>landing page - Welcome!</h1>
        {this.props.loggedIn ? (
          <p>
            Current user: <em>{this.props.currentUser.username}</em>
          </p>
        ) : (
          <p>nobody signed in</p>
        )}
        <Link to={`/home`}>Home</Link>
      </div>
    );
  }
}

export default Index;
