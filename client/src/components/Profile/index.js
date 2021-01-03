import React, { Component } from "react";
import API from "../../utils/API";
import LoadingAnimation from "../LoadingAnimation";
import BasicInfo from "./ProfileComponents/BasicInfo";
import Captain from "./ProfileComponents/Captain";
import LatestRecruit from "./ProfileComponents/LatestRecruit";
import LastBattle from "./ProfileComponents/LastBattle";
import CurrentTeam from "./ProfileComponents/CurrentTeam";

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
            <BasicInfo
              profileData={this.state.profileData}
              convertDate={this.convertDate}
              signedInVsGeneric={this.signedInVsGeneric}
            />

            <hr />
            <Captain
              profileData={this.state.profileData}
              signedInVsGeneric={this.signedInVsGeneric}
            />
            <hr />
            <LatestRecruit
              profileData={this.state.profileData}
              signedInVsGeneric={this.signedInVsGeneric}
            />
            <hr />
            <LastBattle
              profileData={this.state.profileData}
              signedInVsGeneric={this.signedInVsGeneric}
            />
            <hr />
            <CurrentTeam
              profileData={this.state.profileData}
              signedInVsGeneric={this.signedInVsGeneric}
            />
          </div>
        ) : (
          <LoadingAnimation divHeight={400} size={150} />
        )}
      </div>
    );
  }
}

export default Profile;
