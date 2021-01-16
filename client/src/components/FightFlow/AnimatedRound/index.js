import React, { Component } from "react";
import AppButton from "../../AppButton";
import BattleGauge from "../BattleGauge";
import LastBattleCard from "../../LastBattleCard";

class AnimatedRound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengerFinished: false,
      challengerHandicap: 0,
      challengerWidth: 0,
      commenced: false,
      defenderFinished: false,
      defenderHandicap: 0,
      defenderWidth: 0,
    };
  }

  styles = {
    nextRoundContainer: {
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
    },
  };

  componentDidMount() {
    this.setState({
      defenderHandicap: Math.random().toFixed(2),
      challengerHandicap: Math.random().toFixed(2),
    });
  }

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

  nextRound = () => {
    this.state.defenderWidth >= this.state.challengerWidth
      ? this.props.roundOver(`defender`)
      : this.props.roundOver(`challenger`);
  };

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

  render() {
    return (
      <div>
        <LastBattleCard
          battle={{
            defenders: this.props.defenders,
            challengers: this.props.challengers,
          }}
          isDuringFight
        />
        <h3>
          Battling with{` `}
          {this.props.statName[0].toUpperCase() +
            this.props.statName.substring(1)}
        </h3>
        <BattleGauge
          challengerFinished={this.state.challengerFinished}
          challengerStat={this.props.challengerStat}
          defenderFinished={this.state.defenderFinished}
          defenderStat={this.props.defenderStat}
          handicap={this.state.defenderHandicap}
          isSoloFightMode={this.props.isSoloFightMode}
          stat={this.props.defenderStat}
          isUser
          width={this.state.defenderWidth}
          winOrLose={
            this.props.defenderStat >= this.props.challengerStat
              ? `win`
              : `lose`
          }
          won={
            this.props.defenderStat * this.state.defenderHandicap >=
            this.props.challengerStat * this.state.challengerHandicap
          }
        />
        <BattleGauge
          challengerFinished={this.state.challengerFinished}
          challengerStat={this.props.challengerStat}
          defenderFinished={this.state.defenderFinished}
          defenderStat={this.props.defenderStat}
          handicap={this.state.challengerHandicap}
          isSoloFightMode={this.props.isSoloFightMode}
          stat={this.props.challengerStat}
          width={this.state.challengerWidth}
          winOrLose={
            this.props.defenderStat < this.props.challengerStat ? `win` : `lose`
          }
          won={
            this.props.defenderStat * this.state.defenderHandicap <
            this.props.challengerStat * this.state.challengerHandicap
          }
        />
        {!this.state.commenced && (
          <AppButton id={`fight-button`} onClick={this.start}>
            Fight!
          </AppButton>
        )}
        {this.state.defenderFinished && this.state.challengerFinished && (
          <div style={this.styles.nextRoundContainer}>
            <div>
              <p>Round {this.props.round} over!</p>
            </div>
            <div>
              <AppButton id={`fight-continue-button`} onClick={this.nextRound}>
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
