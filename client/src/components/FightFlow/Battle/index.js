import React, { Component } from "react";
import AnimatedRound from "../AnimatedRound";
import FightingStatsSelector from "../FightingStatsSelector";

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengerStats: null,
      defenderStats: null,
      round: 0,
      fightRoundStat: null,
      isRoundCommenced: false,
      challengerRoundStatValue: null,
      defenderRoundStatValue: null,
      defenderScore: 0,
      challengerScore: 0,
    };
  }

  componentDidMount() {
    this.setStats();
  }

  setStats = () => {
    const challengerStats = {
      combat: 0,
      durability: 0,
      intelligence: 0,
      power: 0,
      speed: 0,
      strength: 0,
    };
    const defenderStats = {
      combat: 0,
      durability: 0,
      intelligence: 0,
      power: 0,
      speed: 0,
      strength: 0,
    };
    for (const challenger of this.props.challengers) {
      Object.entries(challenger.powerstats).forEach(key => {
        challengerStats[key[0]] += this.convertNullToRandom(key[1]);
      });
    }
    for (const defender of this.props.defenders) {
      Object.entries(defender.powerstats).forEach(key => {
        defenderStats[key[0]] += this.convertNullToRandom(key[1]);
      });
    }
    this.setState({
      challengerStats: challengerStats,
      defenderStats: defenderStats,
      round: 1,
    });
  };

  convertNullToRandom = stat => {
    return stat === `null` || !stat
      ? Math.floor(Math.random() * 100)
      : parseInt(stat);
  };

  fightWithThisStat = event => {
    this.setState({
      fightRoundStat: event.target.value,
      challengerRoundStatValue: this.state.challengerStats[event.target.value],
      defenderRoundStatValue: this.state.defenderStats[event.target.value],
      isRoundCommenced: true,
    });
  };

  roundOver = victor => {
    victor === `defender`
      ? this.setState({ defenderScore: this.state.defenderScore + 1 })
      : this.setState({ challengerScore: this.state.challengerScore + 1 });
    if (this.state.defenderScore < 2 && this.state.challengerScore < 2) {
      this.setState({ round: this.state.round + 1 });
    }
  };

  render() {
    return (
      <div>
        {this.state.round === 1 && !this.state.isRoundCommenced && (
          <FightingStatsSelector
            round={this.state.round}
            stats={this.state.defenderStats}
            fightWithThisStat={this.fightWithThisStat}
          />
        )}
        {this.state.round === 1 && this.state.isRoundCommenced && (
          <AnimatedRound
            defenders={this.props.defenders}
            challengers={this.props.challengers}
            round={this.props.round}
            isSoloFightMode={this.props.isSoloFightMode}
            statName={this.state.fightRoundStat}
            defenderStat={this.state.defenderRoundStatValue}
            challengerStat={this.state.challengerRoundStatValue}
            roundOver={this.roundOver}
          />
        )}
      </div>
    );
  }
}

export default Battle;
