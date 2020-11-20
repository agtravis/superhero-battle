import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={{ marginTop: `50px` }}>
        {this.props.loggedIn ? (
          <div>
            <Link to={`/home`}>Home</Link>
            {` `}
            <Link to={`/profile`}>Profile</Link>
            {` `}
            <Link to={`/fight`}>Fight</Link>
            {` `}
            <Link to={`/stats`}>Stats</Link>
            {` `}
            <Link to={`/roster`}>Roster</Link>
            {` `}
            <Link to={`/teams`}>Teams</Link>
            {` `}
            <Link to={`/leaderboard`}>Leader Board</Link>
            {` `}
            <Link to={`/search`}>Search</Link>
            {` `}
            <Link to={`/settings`}>Settings</Link>
          </div>
        ) : (
          <Link to={`/about`}>About SuperHero Battle</Link>
        )}
      </div>
    );
  }
}

export default NavBar;
