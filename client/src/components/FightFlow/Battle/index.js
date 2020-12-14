import React, { Component } from "react";
import API from "../../../utils/API";
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
      highestChallengerStat: { stat: `combat`, rating: 0 },
      randomStat: null,
      won: false,
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
    const highestChallengerStat = this.state.highestChallengerStat;
    for (const [key, value] of Object.entries(challengerStats)) {
      if (value > highestChallengerStat.rating) {
        highestChallengerStat.stat = key;
        highestChallengerStat.rating = value;
      }
    }
    const keys = Object.keys(challengerStats);
    const randomNum = Math.floor(Math.random() * keys.length);
    const randomStat = keys[randomNum];
    this.setState({
      randomStat: randomStat,
      highestChallengerStat: highestChallengerStat.stat,
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

  endRoundOne = victor => {
    victor === `defender`
      ? this.setState({ defenderScore: this.state.defenderScore + 1 })
      : this.setState({ challengerScore: this.state.challengerScore + 1 });
    this.setState({
      fightRoundStat: this.state.highestChallengerStat,
      isRoundCommenced: false,
      round: this.state.round + 1,
    });
  };

  endRoundTwo = victor => {
    if (this.state.defenderScore === 1 && victor === `defender`) {
      this.defenderWin();
    } else if (this.state.challengerScore === 1 && victor === `challenger`) {
      this.challengerWin();
    } else {
      victor === `defender`
        ? this.setState({ defenderScore: this.state.defenderScore + 1 })
        : this.setState({ challengerScore: this.state.challengerScore + 1 });
      this.setState({
        fightRoundStat: this.state.randomStat,
        isRoundCommenced: false,
        round: this.state.round + 1,
      });
    }
  };

  endRoundThree = victor => {
    if (this.state.defenderScore === 1 && victor === `defender`) {
      this.defenderWin();
    } else if (this.state.challengerScore === 1 && victor === `challenger`) {
      this.challengerWin();
    }
  };

  challengerWin = () => {
    console.log(`challenger win`);
    const ids = [];
    for (const defender of this.props.defenders) {
      ids.push(defender._id);
    }
    API.removeManyCharactersFromRoster(this.props.currentUser._id, ids)
      .then(() =>
        API.lose(this.props.currentUser._id)
          .then(() => {
            if (!this.props.isSoloFightMode) {
              API.emptyTeam(this.props.currentUser._id)
                .then(() => {
                  this.logBattle(`Challenger`);
                })
                .catch(err => console.error(err));
            } else {
              API.removeFromTeam(this.props.currentUser._id, ids[0])
                .then(() => {
                  this.logBattle(`Challenger`);
                })
                .catch(err => console.error(err));
            }
          })
          .catch(err => console.error(err))
      )
      .catch(err => console.error(err));
  };

  defenderWin = () => {
    console.log(`defender win`);
    const ids = [];
    for (const challenger of this.props.challengers) {
      ids.push(challenger._id);
    }
    API.addManyCharactersToRoster(this.props.currentUser._id, ids)
      .then(() =>
        API.win(this.props.currentUser._id)
          .then(() => {
            this.logBattle(this.props.currentUser.username);
          })
          .catch(err => console.error(err))
      )
      .catch(err => console.error(err));
  };

  logBattle = winner => {
    const details = {
      date: Date.now(),
      challengers: [],
      defenders: [],
      winner: winner,
    };
    for (const challenger of this.props.challengers) {
      const individualDetails = {
        id: challenger._id,
        name: challenger.name,
        image: challenger.image.url,
      };
      details.challengers.push(individualDetails);
    }
    for (const defender of this.props.defenders) {
      const individualDetails = {
        id: defender._id,
        name: defender.name,
        image: defender.image.url,
      };
      details.defenders.push(individualDetails);
    }
    API.logBattle(this.props.currentUser._id, details)
      .then(() => this.setState({ round: 4 }))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        {this.state.round !== 4 && (
          <div style={{ display: `flex`, justifyContent: `space-between` }}>
            <div>
              <p>Challenging: {this.state.challengerScore}</p>
            </div>
            <div>
              <p> -- SCORE -- </p>
            </div>
            <div>
              <p>Defending: {this.state.defenderScore}</p>
            </div>
          </div>
        )}
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
            roundOver={this.endRoundOne}
          />
        )}
        {this.state.round === 2 && !this.state.isRoundCommenced && (
          <FightingStatsSelector
            predeterminedStat={this.state.fightRoundStat}
            round={this.state.round}
            fightWithThisStat={this.fightWithThisStat}
          />
        )}
        {this.state.round === 2 && this.state.isRoundCommenced && (
          <AnimatedRound
            defenders={this.props.defenders}
            challengers={this.props.challengers}
            round={this.props.round}
            isSoloFightMode={this.props.isSoloFightMode}
            statName={this.state.fightRoundStat}
            defenderStat={this.state.defenderRoundStatValue}
            challengerStat={this.state.challengerRoundStatValue}
            roundOver={this.endRoundTwo}
          />
        )}
        {this.state.round === 3 && !this.state.isRoundCommenced && (
          <FightingStatsSelector
            isThirdRound
            predeterminedStat={this.state.fightRoundStat}
            round={this.state.round}
            fightWithThisStat={this.fightWithThisStat}
          />
        )}
        {this.state.round === 3 && this.state.isRoundCommenced && (
          <AnimatedRound
            defenders={this.props.defenders}
            challengers={this.props.challengers}
            round={this.props.round}
            isSoloFightMode={this.props.isSoloFightMode}
            statName={this.state.fightRoundStat}
            defenderStat={this.state.defenderRoundStatValue}
            challengerStat={this.state.challengerRoundStatValue}
            roundOver={this.endRoundThree}
          />
        )}
        {this.state.round === 4 && (
          <div>
            <p>Battle summary component</p>
          </div>
        )}
      </div>
    );
  }
}

export default Battle;
