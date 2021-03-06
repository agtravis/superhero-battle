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
      position: `relative`,
      top: `-30px`,
    },
  };

  convertDate = date => {
    const dateArr = new Date(date).toDateString().split(` `);
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  };

  signedInVsGeneric = (signedIn, generic) =>
    this.props.signedInVsGeneric
      ? this.props.signedInVsGeneric(signedIn, generic)
      : signedIn;

  render() {
    return (
      <div>
        <div>
          {!this.props.isPreFightStaging && !this.props.isDuringFight ? (
            <div>
              <ProfileCardHeader>
                {this.signedInVsGeneric(
                  `Your `,
                  `${this.props.profileData.username}'s `
                )}
                Last Battle
              </ProfileCardHeader>
              <p style={this.styles.text}>
                {this.convertDate(this.props.battle.date)} /
                {this.props.battle.winner === `Challenger`
                  ? ` Defeated!`
                  : ` Victorious!`}
              </p>
            </div>
          ) : !this.props.isDuringFight ? (
            <h3>The Stage is Set for Battle!</h3>
          ) : null}
          <div style={this.styles.headerContainer}>
            <div>
              <h4>
                {this.props.battle.challengers.length > 1
                  ? `Opposing Team`
                  : `
                  ${this.signedInVsGeneric(`Your`, `Their`)} Opponent`}
              </h4>
            </div>
            <div>
              <h4>
                {this.props.battle.defenders.length > 1
                  ? `
                ${this.signedInVsGeneric(`Your`, `Their`)} Team`
                  : `
                ${this.signedInVsGeneric(`You`, `Them`)}`}
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
              id={`last-battle-card-back-button`}
              margin={`10px auto`}
              onClick={() => this.props.changePhase(-1)}
            >
              Back
            </AppButton>
            <AppButton
              id={`last-battle-card-fight-button`}
              margin={`10px auto`}
              onClick={() => this.props.changePhase(1)}
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
