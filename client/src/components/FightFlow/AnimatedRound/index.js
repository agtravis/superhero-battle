import React, { Component } from "react";
import colors from "../../../config/colors";
import AppButton from "../../AppButton";
import LastBattleCard from "../../LastBattleCard";

class AnimatedRound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defenderWidth: 0,
      challengerWidth: 0,
      defenderFinished: false,
      challengerFinished: false,
      commenced: false,
      defenderHandicap: 0,
      challengerHandicap: 0,
    };
  }

  componentDidMount() {
    this.setState({
      defenderHandicap: Math.random().toFixed(2),
      challengerHandicap: Math.random().toFixed(2),
    });
  }

  start = () => {
    this.setState({ commenced: true });
    let defenderStat = this.props.defenderStat * this.state.defenderHandicap;
    let challengerStat =
      this.props.challengerStat * this.state.challengerHandicap;
    if (!this.props.isSoloFightMode) {
      defenderStat = defenderStat / 3;
      challengerStat = challengerStat / 3;
    }
    this.expand(`defenderWidth`, defenderStat);
    this.expand(`challengerWidth`, challengerStat);
  };

  nextRound = () => {
    this.state.defenderWidth >= this.state.challengerWidth
      ? this.props.roundOver(`defender`)
      : this.props.roundOver(`challenger`);
  };

  expand = (character, max) => {
    let counter = 0;
    const timer = setInterval(() => {
      if (counter >= max) {
        clearInterval(timer);
        character === `defenderWidth`
          ? this.setState({ defenderFinished: true })
          : this.setState({ challengerFinished: true });
      }
      this.setState({ [character]: counter });
      counter = counter + 0.1;
    }, 1);
  };

  render() {
    return (
      <div>
        <LastBattleCard
          isDuringFight
          battle={{
            defenders: this.props.defenders,
            challengers: this.props.challengers,
          }}
        />
        <h3>
          Battling with
          {this.props.statName[0].toUpperCase() +
            this.props.statName.substring(1)}
        </h3>
        <div>
          {this.state.defenderFinished && this.state.challengerFinished ? (
            <p>
              You had a handicap of{` `}
              {this.state.defenderHandicap * 100}%
            </p>
          ) : (
            <p>
              You should{" "}
              {this.props.defenderStat >= this.props.challengerStat
                ? `win`
                : `lose`}{" "}
              with a rating of {this.props.defenderStat} {this.props.statName}.
            </p>
          )}
        </div>
        <div style={{ display: `flex`, justifyContent: `space-between` }}>
          <div style={{ width: `100%` }}>
            <div
              style={{
                width: `${this.state.defenderWidth}%`,
                height: `20px`,
                border: `solid 1px ${colors.darkSecondary}`,
                backgroundColor: `${colors.secondary}`,
                borderRadius: `10px`,
              }}
            ></div>
          </div>
          <div
            style={{
              width: `100px`,
              fontSize: `.8rem`,
              paddingLeft: `10px`,
              marginLeft: `10px`,
              borderLeft: `solid 1px ${colors.darkSecondary}`,
            }}
          >
            <p>
              {this.props.isSoloFightMode
                ? this.state.defenderWidth.toFixed(2)
                : (this.state.defenderWidth * 3).toFixed(2)}
              {` `}/ {this.props.defenderStat}
            </p>
          </div>
        </div>
        <div>
          {this.state.defenderFinished && this.state.challengerFinished ? (
            <p>
              They had a handicap of{` `}
              {Math.floor(this.state.challengerHandicap * 100)}%.
            </p>
          ) : (
            <p>
              They should{" "}
              {this.props.defenderStat >= this.props.challengerStat
                ? `lose`
                : `win`}{" "}
              with a rating of {this.props.challengerStat} {this.props.statName}
              .
            </p>
          )}
        </div>
        <div style={{ display: `flex`, justifyContent: `space-between` }}>
          <div style={{ width: `100%` }}>
            <div
              style={{
                width: `${this.state.challengerWidth}%`,
                height: `20px`,
                border: `solid 1px ${colors.darkSecondary}`,
                backgroundColor: `${colors.secondary}`,
                borderRadius: `10px`,
              }}
            ></div>
          </div>
          <div
            style={{
              width: `100px`,
              fontSize: `.8rem`,
              paddingLeft: `10px`,
              marginLeft: `10px`,
              borderLeft: `solid 1px ${colors.darkSecondary}`,
            }}
          >
            <p>
              {this.props.isSoloFightMode
                ? this.state.challengerWidth.toFixed(2)
                : (this.state.challengerWidth * 3).toFixed(2)}
              {` `}/ {this.props.challengerStat}
            </p>
          </div>
        </div>
        {!this.state.commenced && (
          <AppButton width={`200px`} margin={`10px 0px`} onClick={this.start}>
            Fight!
          </AppButton>
        )}
        {this.state.defenderFinished && this.state.challengerFinished && (
          <div
            style={{
              display: `flex`,
              justifyContent: `center`,
              flexDirection: `column`,
            }}
          >
            <div>
              <p>Round {this.props.round} over!</p>
            </div>
            <div>
              <AppButton
                margin={`10px 0px`}
                width={`200px`}
                onClick={this.nextRound}
              >
                {this.props.buttonText ? this.props.buttonText : `Next Round`}
              </AppButton>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AnimatedRound;
