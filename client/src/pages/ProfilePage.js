import React, { Component } from "react";
import Profile from "../components/Profile";

class ProfilePage extends Component {
  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <Profile
        profileId={this.props.location.state.userId}
        currentUser={this.props.currentUser}
      />
    );
  }
}

export default ProfilePage;
