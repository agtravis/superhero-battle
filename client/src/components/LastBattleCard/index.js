import React, { Component } from "react";
import AppButton from "../AppButton";
import IndexPortraitSmall from "../IndexPortraitSmall";
import ProfileCardHeader from "../Profile/ProfileCardHeader";

class LastBattleCard extends Component {
  styles = {
    buttonsContainer: {
      display: `flex`,
      flexWrap: `wrap-reverse`,
      justifyContent: `space-around`,
    },
    headerContainer: {
      display: `flex`,
      justifyContent: `space-between`,
    },
    mainContainer: {
      display: `flex`,
      justifyContent: `space-between`,
    },
    text: {
      textAlign: `center`,
    },
    vsContainer: {
      alignItems: `center`,
      display: `flex`,
    },
  };

  convertDate = date => {
    const dateArr = new Date(date).toDateString().split(` `);
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  };

  render() {
    return (
      <div>
        <div>
          {!this.props.isPreFightStaging && !this.props.isDuringFight ? (
            <ProfileCardHeader>
              {this.props.signedInVsGeneric(
                `Your`,
                `${this.props.profileData.username}'s`
              )}{" "}
              last battle was on {this.convertDate(this.props.battle.date)} and
              {this.props.signedInVsGeneric(` you `, ` they `)} were
              {this.props.battle.winner === `Challenger`
                ? ` defeated`
                : ` the victor`}
              :
            </ProfileCardHeader>
          ) : !this.props.isDuringFight ? (
            <h3>The Stage is Set for Battle!</h3>
          ) : null}
          <div style={this.styles.headerContainer}>
            <div>
              <h4>
                {this.props.battle.challengers.length > 1
                  ? `Opposing Team`
                  : `
                  ${this.props.signedInVsGeneric(`Your`, `Their`)} Opponent`}
              </h4>
            </div>
            <div>
              <h4>
                {this.props.battle.defenders.length > 1
                  ? `
                ${this.props.signedInVsGeneric(`Your`, `Their`)} Team`
                  : `
                ${this.props.signedInVsGeneric(`You`, `Them`)}`}
              </h4>
            </div>
          </div>
          <div style={this.styles.mainContainer}>
            <div>
              {this.props.battle.challengers.map((challenger, index) => (
                <IndexPortraitSmall
                  key={index}
                  left
                  name={challenger.name}
                  src={
                    this.props.isPreFightStaging || this.props.isDuringFight
                      ? challenger.image.url
                      : challenger.image
                  }
                />
              ))}
            </div>
            <div style={this.styles.vsContainer}>
              <h1 style={this.styles.text}>VS</h1>
            </div>
            <div>
              {this.props.battle.defenders.map((defender, index) => (
                <IndexPortraitSmall
                  key={index}
                  right
                  name={defender.name}
                  src={
                    this.props.isPreFightStaging || this.props.isDuringFight
                      ? defender.image.url
                      : defender.image
                  }
                />
              ))}
            </div>
          </div>
        </div>
        {this.props.isPreFightStaging && (
          <div style={this.styles.buttonsContainer}>
            <AppButton
              margin={`10px auto`}
              onClick={() => this.props.changePhase(-1)}
              width={`200px`}
            >
              Back
            </AppButton>
            <AppButton
              margin={`10px auto`}
              onClick={() => this.props.changePhase(1)}
              width={`200px`}
            >
              FIGHT!
            </AppButton>
          </div>
        )}
      </div>
    );
  }
}

export default LastBattleCard;
