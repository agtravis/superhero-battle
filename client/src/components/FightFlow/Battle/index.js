import React, { Component } from "react";
import API from "../../../utils/API";
import AnimatedRound from "../AnimatedRound";
import FightingStatsSelector from "../FightingStatsSelector";
import PostBattle from "../PostBattle";

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengerRoundStatValue: null,
      challengerScore: 0,
      challengerStats: null,
      defenderRoundStatValue: null,
      defenderScore: 0,
      defenderStats: null,
      fightRoundStat: null,
      finished: false,
      highestChallengerStat: { stat: `combat`, rating: 0 },
      isRoundCommenced: false,
      randomStat: null,
      round: 0,
      winner: ``,
    };
  }

  styles = {
    headerContainer: { display: `flex`, justifyContent: `space-between` },
  };

  componentDidMount() {
    this.setStats();
  }

  componentWillUnmount() {
    if (this.state.finished === false) {
      const ids = [];
      for (const defender of this.props.defenders) {
        ids.push(defender._id);
      }
      API.removeManyCharactersFromRoster(this.props.currentUser._id, ids)
        .then()
        .catch(err => console.error(err));
    }
  }

  challengerWin = () => {
    this.setState({ winner: `Challenger`, finished: true });
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

  convertNullToRandom = stat => {
    return stat === `null` || !stat
      ? Math.floor(Math.random() * 100)
      : parseInt(stat);
  };

  defenderWin = () => {
    this.setState({ winner: this.props.currentUser.username, finished: true });
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

  endRoundThree = victor => {
    if (this.state.defenderScore === 1 && victor === `defender`) {
      this.defenderWin();
    } else if (this.state.challengerScore === 1 && victor === `challenger`) {
      this.challengerWin();
    }
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

  fightWithThisStat = event => {
    this.setState({
      fightRoundStat: event.target.value,
      challengerRoundStatValue: this.state.challengerStats[event.target.value],
      defenderRoundStatValue: this.state.defenderStats[event.target.value],
      isRoundCommenced: true,
    });
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

  render() {
    return (
      <div>
        {this.state.round !== 4 && (
          <div style={this.styles.headerContainer}>
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
            fightWithThisStat={this.fightWithThisStat}
            round={this.state.round}
            stats={this.state.defenderStats}
          />
        )}
        {this.state.round === 1 && this.state.isRoundCommenced && (
          <AnimatedRound
            challengers={this.props.challengers}
            challengerStat={this.state.challengerRoundStatValue}
            defenders={this.props.defenders}
            defenderStat={this.state.defenderRoundStatValue}
            isSoloFightMode={this.props.isSoloFightMode}
            round={this.props.round}
            roundOver={this.endRoundOne}
            statName={this.state.fightRoundStat}
          />
        )}
        {this.state.round === 2 && !this.state.isRoundCommenced && (
          <FightingStatsSelector
            fightWithThisStat={this.fightWithThisStat}
            predeterminedStat={this.state.fightRoundStat}
            round={this.state.round}
          />
        )}
        {this.state.round === 2 && this.state.isRoundCommenced && (
          <AnimatedRound
            challengers={this.props.challengers}
            challengerStat={this.state.challengerRoundStatValue}
            defenders={this.props.defenders}
            defenderStat={this.state.defenderRoundStatValue}
            isSoloFightMode={this.props.isSoloFightMode}
            round={this.props.round}
            roundOver={this.endRoundTwo}
            statName={this.state.fightRoundStat}
          />
        )}
        {this.state.round === 3 && !this.state.isRoundCommenced && (
          <FightingStatsSelector
            fightWithThisStat={this.fightWithThisStat}
            isThirdRound
            predeterminedStat={this.state.fightRoundStat}
            round={this.state.round}
          />
        )}
        {this.state.round === 3 && this.state.isRoundCommenced && (
          <AnimatedRound
            challengers={this.props.challengers}
            challengerStat={this.state.challengerRoundStatValue}
            defenders={this.props.defenders}
            defenderStat={this.state.defenderRoundStatValue}
            isSoloFightMode={this.props.isSoloFightMode}
            round={this.props.round}
            roundOver={this.endRoundThree}
            statName={this.state.fightRoundStat}
          />
        )}
        {this.state.round === 4 && (
          <PostBattle
            currentUser={this.props.currentUser}
            challengers={this.props.challengers}
            defenders={this.props.defenders}
            isSoloFightMode={this.props.isSoloFightMode}
            winner={this.state.winner}
          />
        )}
      </div>
    );
  }
}

export default Battle;
