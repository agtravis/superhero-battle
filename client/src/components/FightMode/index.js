import React, { Component } from "react";

import API from "../../utils/API";
import RoundOnePre from "../RoundOnePre";
import RoundOnePost from "../RoundOnePost";
import RoundTwoPre from "../RoundTwoPre";
import RoundThreePre from "../RoundThreePre";
import BattleOver from "../BattleOver";

class FightMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attackingStats: null,
      defendingStats: null,
      round: 0,
      attacking: 0,
      defending: 0,
      fightStat: null,
      attackingStat: null,
      defendingStat: null,
      commenced: false,
      fightOver: false,
      winner: null,
      attackRating: null,
      defendRating: null,
      victor: null,
    };
  }

  componentDidMount() {
    this.setStats();
  }

  setStats = () => {
    const attackingStats = {
      combat: 0,
      durability: 0,
      intelligence: 0,
      power: 0,
      speed: 0,
      strength: 0,
    };
    const defendingStats = {
      combat: 0,
      durability: 0,
      intelligence: 0,
      power: 0,
      speed: 0,
      strength: 0,
    };
    for (const challenger of this.props.challengers) {
      Object.entries(challenger.powerstats).forEach(key => {
        attackingStats[key[0]] += this.convertNullToRandom(key[1]);
      });
    }
    for (const defender of this.props.defenders) {
      Object.entries(defender.powerstats).forEach(key => {
        defendingStats[key[0]] += this.convertNullToRandom(key[1]);
      });
    }
    this.setState({
      attackingStats: attackingStats,
      defendingStats: defendingStats,
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
      fightStat: event.target.value,
      commenced: true,
      attackingStat: this.state.attackingStats[event.target.value],
      defendingStat: this.state.defendingStats[event.target.value],
    });
  };

  fight = () => {
    this.setState({ fightOver: true });
    const attackRating = this.state.attackingStat * Math.random();
    const defendRating = this.state.defendingStat * Math.random();
    this.setState({ attackRating: attackRating, defendRating: defendRating });
    if (attackRating > defendRating) {
      this.setState({
        winner: `attacker`,
        attacking: this.state.attacking + 1,
      });
      // this.attackerWin();
    } else {
      this.setState({
        winner: this.props.currentUser.username,
        defending: this.state.defending + 1,
      });
      // this.defenderWin();
    }
  };

  nextRound = () => {
    this.setState({
      round: this.state.round + 1,
      fightStat: null,
      attackingStat: null,
      defendingStat: null,
      commenced: false,
      fightOver: false,
      winner: null,
      attackRating: null,
      defendRating: null,
    });
    if (this.state.attacking >= 2) {
      this.setState({ victor: `challenger` });
    }
    if (this.state.defending >= 2) {
      this.setState({ victor: `defender` });
    }
  };

  attackerWin = () => {
    const ids = [];
    for (const defender of this.props.defenders) {
      ids.push(defender._id);
    }
    API.removeManyCharactersFromRoster(this.props.currentUser._id, ids)
      .then(() =>
        API.lose(this.props.currentUser._id)
          .then()
          .catch(err => console.error(err))
      )
      .catch(err => console.error(err));
  };

  defenderWin = () => {
    const ids = [];
    for (const attacker of this.props.challengers) {
      ids.push(attacker._id);
    }
    API.addManyCharactersToRoster(this.props.currentUser._id, ids)
      .then(() =>
        API.win(this.props.currentUser._id)
          .then()
          .catch(err => console.error(err))
      )
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        {this.state.round === 1 && !this.state.commenced ? (
          <RoundOnePre
            round={this.state.round}
            defendingStats={this.state.defendingStats}
            fightWithThisStat={this.fightWithThisStat}
          />
        ) : null}
        {this.state.round === 1 && this.state.commenced ? (
          <RoundOnePost
            round={this.state.round}
            fightOver={this.state.fightOver}
            fight={this.fight}
            fightStat={this.state.fightStat}
            attackingStat={this.state.attackingStat}
            attackRating={this.state.attackRating}
            defendingStat={this.state.defendingStat}
            defendRating={this.state.defendRating}
            winner={this.state.winner}
            nextRound={this.nextRound}
          />
        ) : null}
        {this.state.round === 2 && !this.state.commenced ? (
          <RoundTwoPre
            round={this.state.round}
            attackingStats={this.state.attackingStats}
            fightWithThisStat={this.fightWithThisStat}
          />
        ) : null}
        {this.state.round === 2 && this.state.commenced ? (
          <RoundOnePost
            round={this.state.round}
            fightOver={this.state.fightOver}
            fight={this.fight}
            fightStat={this.state.fightStat}
            attackingStat={this.state.attackingStat}
            attackRating={this.state.attackRating}
            defendingStat={this.state.defendingStat}
            defendRating={this.state.defendRating}
            winner={this.state.winner}
            nextRound={this.nextRound}
          />
        ) : null}
        {this.state.round === 3 &&
        !this.state.commenced &&
        !this.state.victor ? (
          <RoundThreePre
            round={this.state.round}
            attackingStats={this.state.attackingStats}
            fightWithThisStat={this.fightWithThisStat}
          />
        ) : null}
        {this.state.round === 3 &&
        this.state.commenced &&
        !this.state.victor ? (
          <RoundOnePost
            round={this.state.round}
            fightOver={this.state.fightOver}
            fight={this.fight}
            fightStat={this.state.fightStat}
            attackingStat={this.state.attackingStat}
            attackRating={this.state.attackRating}
            defendingStat={this.state.defendingStat}
            defendRating={this.state.defendRating}
            winner={this.state.winner}
            nextRound={this.nextRound}
          />
        ) : null}
        {this.state.victor ? (
          <>
            {this.state.victor === `challenger` ? (
              <BattleOver
                rosterFunction={this.attackerWin}
                winner={`Challenger`}
                message={`Better luck next time!!!`}
                characters={this.props.defenders}
              />
            ) : (
              <BattleOver
                rosterFunction={this.defenderWin}
                winner={this.props.currentUser.username}
                message={`Congratulations, you won!!!`}
                characters={this.props.challengers}
              />
            )}
          </>
        ) : null}
      </div>
    );
  }
}

export default FightMode;
