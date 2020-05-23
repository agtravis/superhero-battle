import React, { Component } from "react";

class TeamFight extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return <p>TeamFight</p>;
  }
}

export default TeamFight;
