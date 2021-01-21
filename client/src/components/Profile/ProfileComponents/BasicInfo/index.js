import React, { Component } from "react";
import { Link } from "react-router-dom";
import colors from "../../../../config/colors";
import ProfileCardHeader from "../../ProfileCardHeader";

class BasicInfo extends Component {
  styles = {
    prestigeText: {
      margin: `0px`,
    },
    prestigeTextContainer: {
      alignItems: `center`,
      border: `1px dotted ${colors.darkSecondary}`,
      display: `flex`,
      justifyContent: `center`,
      width: `200px`,
    },
    rosterFactsContainer: {
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `space-between`,
    },
    rosterLink: {
      color: colors.darkSecondary,
      fontWeight: `900`,
      textDecoration: `none`,
    },
    rosterTextContainer: { width: `400px` },
  };

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

  render() {
    return (
      <div>
        <ProfileCardHeader>
          {this.props.signedInVsGeneric(
            `Your`,
            `${this.props.profileData.username}'s`
          )}
          {` `}Profile
        </ProfileCardHeader>
        <p>
          Fighting since {this.convertDate(this.props.profileData.registered)}
        </p>
        <p>
          A veteran of {this.props.profileData.fights} fights,{` `}
          {this.props.profileData.fights > 0
            ? `${this.props.signedInVsGeneric(
                `
                ${this.props.signedInVsGeneric(
                  `you have`,
                  `${this.props.profileData.username} has`
                )} won`,
                `${this.props.profileData.username} has won`
              )} ${this.convertWinPercentage(
                this.props.profileData.wins,
                this.props.profileData.fights
              )} - W ${this.props.profileData.wins} / L ${
                this.props.profileData.losses
              }.`
            : `
            ${this.props.signedInVsGeneric(
              `You do`,
              `${this.props.profileData.username} does`
            )} not currently have a win percentage!`}
        </p>
        <div style={this.styles.rosterFactsContainer}>
          <div style={this.styles.rosterTextContainer}>
            <p>
              {this.props.signedInVsGeneric(
                `Your`,
                `${this.props.profileData.username}'s`
              )}
              {` `}
              <Link to={`/roster`} style={this.styles.rosterLink}>
                roster
              </Link>
              {` `}
              is{` `}
              {((this.props.profileData.roster.length / 731) * 100).toFixed(2)}%
              complete ({this.props.profileData.roster.length}
              /731 recruited)
              {this.props.profileData.pastBattles.length > 1
                ? `, with a recruitment ratio of ${(
                    (this.props.profileData.roster.length - 1) /
                    (this.props.profileData.pastBattles.length -
                      731 * this.props.profileData.prestige)
                  ).toFixed(2)}.`
                : `.`}
            </p>
          </div>
          <div style={this.styles.prestigeTextContainer}>
            <p style={this.styles.prestigeText}>
              {this.props.signedInVsGeneric(
                `Your`,
                `${this.props.profileData.username}'s`
              )}
              {` `}
              prestige level: {this.props.profileData.prestige + 1}.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicInfo;
