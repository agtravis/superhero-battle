import React, { Component } from "react";
import API from "../../utils/API";
import IndexPortrait from "../IndexPortrait";
import LastBattleBasic from "../LastBattleBasic";

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

  convertDate = datestamp => {
    const date = new Date(datestamp);
    const dateArr = date.toDateString().split(` `);
    const dateSentence = `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
    return dateSentence;
  };

  convertWinPercentage = (wins, totalBattles) => {
    if (totalBattles > 0) {
      const percentage = ((wins / totalBattles) * 100).toFixed(2);
      return `${percentage}%`;
    } else {
      return `N/A`;
    }
  };

  signedInVsGeneric = (signedInVersion, genericVersion) =>
    this.props.profileId === this.props.currentUser._id
      ? signedInVersion
      : genericVersion;

  render() {
    return (
      <div>
        {this.state.profileData && (
          <div>
            <h2>
              {this.signedInVsGeneric(
                `Your`,
                `${this.state.profileData.username}'s`
              )}
              {` `}Profile
            </h2>
            <p>
              Fighting since{" "}
              {this.convertDate(this.state.profileData.registered)}
            </p>
            <p>
              A veteran of {this.state.profileData.fights} fights,{` `}
              {this.signedInVsGeneric(
                `you have won`,
                `${this.state.profileData.username} has won`
              )}
              {` `}
              {this.convertWinPercentage(
                this.state.profileData.wins,
                this.state.profileData.fights
              )}
              {` `}of the time.
            </p>
            <p>
              {this.signedInVsGeneric(
                `Your`,
                `${this.state.profileData.username}'s`
              )}
              {` `}Captain:
            </p>
            <div>
              {this.state.profileData.roster[0] ? (
                <IndexPortrait
                  title={`Captain`}
                  image={this.state.profileData.roster[0].image.url}
                  name={this.state.profileData.roster[0].name}
                />
              ) : (
                <p>You have nobody in your team!</p>
              )}
            </div>
            <p>
              {this.signedInVsGeneric(
                `Your`,
                `${this.state.profileData.username}'s`
              )}
              {` `}Latest Recruit:
            </p>
            <div>
              {this.state.profileData.roster.length > 1 ? (
                <IndexPortrait
                  title={`Latest Recruit`}
                  image={
                    this.state.profileData.roster[
                      this.state.profileData.roster.length - 1
                    ].image.url
                  }
                  name={
                    this.state.profileData.roster[
                      this.state.profileData.roster.length - 1
                    ].name
                  }
                />
              ) : this.state.profileData.roster[0] ? (
                <p>You only have one team member!</p>
              ) : (
                <p>You have nobody in your team!</p>
              )}
            </div>
            <div>
              <LastBattleBasic battles={this.state.profileData.pastBattles} />
            </div>
          </div>
        )}
      </div>
      //   <div style={{ display: `flex`, justifyContent: `space-between` }}>
      //     {this.props.captain ? (
      //       <IndexPortrait
      //         title={`Captain`}
      //         image={this.props.captain.image.url}
      //         name={this.props.captain.name}
      //       />
      //     ) : null}
      //     {this.props.recruit ? (
      //       <IndexPortrait
      //         title={`Latest Recruit`}
      //         image={this.props.recruit.image.url}
      //         name={this.props.recruit.name}
      //       />
      //     ) : (
      //       <IndexPortrait title={false} />
      //     )}
      //     </div>
    );
  }
}

export default Profile;
