import React, { Component } from "react";
import AppButton from "../AppButton";
import IndexPortraitSmall from "../IndexPortraitSmall";

class LastBattleCard extends Component {
  convertDate = date => {
    const dateArr = new Date(date).toDateString().split(` `);
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  };

  render() {
    return (
      <div>
        <div>
          {!this.props.isPreFightStaging && !this.props.isDuringFight ? (
            <h3>
              Your last battle was on {this.convertDate(this.props.battle.date)}{" "}
              and you were
              {this.props.battle.winner === `Challenger`
                ? ` defeated!`
                : ` the victor!`}
            </h3>
          ) : (
            <h3>The Stage is Set for Battle!</h3>
          )}
          <div style={{ display: `flex`, justifyContent: `space-between` }}>
            <div>
              <h4>
                {this.props.battle.challengers.length > 1
                  ? `Opposing Team`
                  : `Your Opponent`}
              </h4>
            </div>
            <div></div>
            <div>
              <h4>
                {this.props.battle.defenders.length > 1 ? `Your Team` : `You`}
              </h4>
            </div>
          </div>
          <div style={{ display: `flex`, justifyContent: `space-between` }}>
            <div>
              {this.props.battle.challengers.map((challenger, index) => (
                <IndexPortraitSmall
                  key={index}
                  left
                  src={
                    this.props.isPreFightStaging || this.props.isDuringFight
                      ? challenger.image.url
                      : challenger.image
                  }
                  name={challenger.name}
                />
              ))}
            </div>
            <div style={{ display: `flex`, alignItems: `center` }}>
              <h1>VS</h1>
            </div>
            <div>
              {this.props.battle.defenders.map((defender, index) => (
                <IndexPortraitSmall
                  key={index}
                  right
                  src={
                    this.props.isPreFightStaging || this.props.isDuringFight
                      ? defender.image.url
                      : defender.image
                  }
                  name={defender.name}
                />
              ))}
            </div>
          </div>
        </div>
        {this.props.isPreFightStaging && (
          <div
            style={{
              display: `flex`,
              justifyContent: `space-around`,
              flexWrap: `wrap-reverse`,
            }}
          >
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
