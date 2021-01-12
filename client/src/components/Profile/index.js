import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import API from "../../utils/API";
import LoadingAnimation from "../LoadingAnimation";
import ProfileFullScreen from "./ProfileFullScreen";
import ProfileMobile from "./ProfileMobile";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: null,
    };
  }

  componentDidMount() {
    API.getUserDetails(this.props.profileId)
      .then(response => this.setState({ profileData: response.data }))
      .catch(err => console.error(err));
  }

  signedInVsGeneric = (signedInVersion, genericVersion) =>
    this.props.profileId === this.props.currentUser._id
      ? signedInVersion
      : genericVersion;

  render() {
    return (
      <div>
        {this.state.profileData ? (
          <div>
            <Breakpoint medium up>
              <ProfileFullScreen
                loadCharacter={this.props.loadCharacter}
                profileData={this.state.profileData}
                signedInVsGeneric={this.signedInVsGeneric}
              />
            </Breakpoint>
            <Breakpoint small down>
              <ProfileMobile
                loadCharacter={this.props.loadCharacter}
                profileData={this.state.profileData}
                signedInVsGeneric={this.signedInVsGeneric}
              />
            </Breakpoint>
          </div>
        ) : (
          <LoadingAnimation divHeight={400} size={150} />
        )}
      </div>
    );
  }
}

export default Profile;
