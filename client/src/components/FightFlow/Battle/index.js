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
          />
        )}
      </div>
    );
  }
}

export default Battle;
