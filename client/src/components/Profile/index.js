import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import AppLink from "../AppLink";
import IndexPortrait from "../IndexPortrait";
import LastBattleCard from "../LastBattleCard";
import Team from "../Team";

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
            <div style={{ display: `flex` }}>
              <p>Your </p>
              <Link to={`/roster`} style={{ margin: `0px 5px` }}>
                <AppLink>roster</AppLink>
              </Link>
              <p>
                is{` `}
                {((this.state.profileData.roster.length / 731) * 100).toFixed(
                  2
                )}
                % complete ({this.state.profileData.roster.length}
                /731 recruited)
              </p>
            </div>
            <hr />
            <h3>
              {this.signedInVsGeneric(
                `Your`,
                `${this.state.profileData.username}'s`
              )}
              {` `}Captain:
            </h3>
            <div>
              {this.state.profileData.roster[0] ? (
                <IndexPortrait
                  character={this.state.profileData.roster[0]}
                  round
                  showStats
                />
              ) : (
                <p>You have nobody in your roster!</p>
              )}
            </div>
            <hr />
            <h3>
              {this.signedInVsGeneric(
                `Your`,
                `${this.state.profileData.username}'s`
              )}
              {` `}Latest Recruit:
            </h3>
            <div>
              {this.state.profileData.roster.length > 1 ? (
                <IndexPortrait
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
                <LastBattleCard
                  battle={
                    this.state.profileData.pastBattles[
                      this.state.profileData.pastBattles.length - 1
                    ]
                  }
                />
              ) : (
                <p>You have not fought any battles yet!</p>
              )}
            </div>
            <hr />
            <div>
              <h3>Your Current Team:</h3>
              {this.state.profileData.teams.length > 0 ? (
                <Team team={this.state.profileData.teams} />
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
