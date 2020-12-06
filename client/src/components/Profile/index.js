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
              {this.state.profileData.fights > 0
                ? `${this.signedInVsGeneric(
                    `you have won`,
                    `${this.state.profileData.username} has won`
                  )} ${this.convertWinPercentage(
                    this.state.profileData.wins,
                    this.state.profileData.fights
                  )} of the time.`
                : `you do not currently have a win percentage!`}
            </p>
            <hr />
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
                  character={this.state.profileData.roster[0]}
                  title={`Captain`}
                  round
                  showStats
                />
              ) : (
                <p>You have nobody in your roster!</p>
              )}
            </div>
            <hr />
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
                  character={
                    this.state.profileData.roster[
                      this.state.profileData.roster.length - 1
                    ]
                  }
                  round
                  showStats
                />
              ) : this.state.profileData.roster[0] ? (
                <p>You only have one team member!</p>
              ) : (
                <p>You have nobody in your team!</p>
              )}
            </div>
            <hr />
            <div>
              {this.state.profileData.pastBattles.length > 0 ? (
                <LastBattleBasic battles={this.state.profileData.pastBattles} />
              ) : (
                <p>You have not fought any battles yet!</p>
              )}
            </div>
            <hr />
            <div>
              <h2>Your Current Team:</h2>
              {this.state.profileData.teams.length > 0 ? (
                this.state.profileData.teams.map((teamMember, index) => (
                  <div key={index}>
                    <IndexPortrait
                      title={`Team Member #${index + 1}`}
                      image={teamMember.image.url}
                      name={teamMember.name}
                      round
                    />
                  </div>
                ))
              ) : (
                <p>
                  You do not have any members of your roster assigned to a team
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
