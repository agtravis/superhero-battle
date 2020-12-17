import React, { Component } from "react";
import AppButton from "../../AppButton";
import LastBattleCard from "../../LastBattleCard";
import BattleGauge from "../BattleGauge";

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
          Battling with{` `}
          {this.props.statName[0].toUpperCase() +
            this.props.statName.substring(1)}
        </h3>
        <BattleGauge
          defenderFinished={this.state.defenderFinished}
          challengerFinished={this.state.challengerFinished}
          handicap={this.state.defenderHandicap}
          won={
            this.props.defenderStat * this.state.defenderHandicap >=
            this.props.challengerStat * this.state.challengerHandicap
          }
          winOrLose={
            this.props.defenderStat >= this.props.challengerStat
              ? `win`
              : `lose`
          }
          isSoloFightMode={this.props.isSoloFightMode}
          width={this.state.defenderWidth}
          defenderStat={this.props.defenderStat}
          challengerStat={this.props.challengerStat}
          stat={this.props.defenderStat}
        />
        <BattleGauge
          defenderFinished={this.state.defenderFinished}
          challengerFinished={this.state.challengerFinished}
          handicap={this.state.challengerHandicap}
          won={
            this.props.defenderStat * this.state.defenderHandicap <
            this.props.challengerStat * this.state.challengerHandicap
          }
          winOrLose={
            this.props.defenderStat < this.props.challengerStat ? `win` : `lose`
          }
          isSoloFightMode={this.props.isSoloFightMode}
          width={this.state.challengerWidth}
          defenderStat={this.props.defenderStat}
          challengerStat={this.props.challengerStat}
          stat={this.props.challengerStat}
        />
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
                Continue
              </AppButton>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AnimatedRound;
