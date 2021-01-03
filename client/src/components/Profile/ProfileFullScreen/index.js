import React, { Component } from "react";
import BasicInfo from "../ProfileComponents/BasicInfo";
import Captain from "../ProfileComponents/Captain";
import CurrentTeam from "../ProfileComponents/CurrentTeam";
import LastBattle from "../ProfileComponents/LastBattle";
import LatestRecruit from "../ProfileComponents/LatestRecruit";

class ProfileFullScreen extends Component {
  render() {
    return (
      <div>
        <BasicInfo
          profileData={this.props.profileData}
          signedInVsGeneric={this.props.signedInVsGeneric}
        />
        <hr />
        <Captain
          profileData={this.props.profileData}
          signedInVsGeneric={this.props.signedInVsGeneric}
        />
        <hr />
        <LatestRecruit
          profileData={this.props.profileData}
          signedInVsGeneric={this.props.signedInVsGeneric}
        />
        <hr />
        <LastBattle
          profileData={this.props.profileData}
          signedInVsGeneric={this.props.signedInVsGeneric}
        />
        <hr />
        <CurrentTeam
          profileData={this.props.profileData}
          signedInVsGeneric={this.props.signedInVsGeneric}
        />
      </div>
    );
  }
}

export default ProfileFullScreen;
