import React, { Component } from "react";

import API from "../../utils/API";

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
      this.setState({ winner: `attacker` });
      this.attackerWin();
    } else {
      this.setState({ winner: this.props.currentUser.username });
      this.defenderWin();
    }
  };

  attackerWin = () => {
    const ids = [];
    for (const defender of this.props.defenders) {
      ids.push(defender._id);
    }
    API.removeManyCharactersFromRoster(this.props.currentUser._id, ids)
      .then(dbUser => {
        console.log(dbUser);
      })
      .catch(err => console.error(err));
  };

  defenderWin = () => {
    const ids = [];
    for (const attacker of this.props.challengers) {
      ids.push(attacker._id);
    }
    API.addManyCharactersToRoster(this.props.currentUser._id, ids)
      .then(dbUser => {})
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        {this.state.round === 1 && !this.state.commenced ? (
          <div>
            <h3>Round 1!</h3>
            <p>Pick your best ability for the fight:</p>
            <ul>
              {Object.keys(this.state.defendingStats).map((stat, index) => {
                return (
                  <li key={index} style={{ marginBottom: `5px` }}>
                    <button
                      value={stat}
                      onClick={event => this.fightWithThisStat(event)}
                    >
                      {stat}: {this.state.defendingStats[stat]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
        {this.state.round === 1 && this.state.commenced ? (
          <div>
            <h3>Round 1 - Fight!</h3>
            {!this.state.fightOver ? (
              <button onClick={() => this.fight()}>Fight!</button>
            ) : null}
            <p>
              Enemy had {this.state.fightStat}: {this.state.attackingStat} and
              attacked with{` `}
              {this.state.fightOver ? <>{this.state.attackRating}</> : null}
            </p>
            <p>
              You had {this.state.fightStat}: {this.state.defendingStat} and
              defended with{` `}
              {this.state.fightOver ? <>{this.state.defendRating} </> : null}
            </p>
            {this.state.winner ? (
              <p>The winner is: {this.state.winner}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default FightMode;

// for (const character of this.props.challengers) {
//   attackingStats.combat += this.convertNullToRandom(
//     character.powerstats.combat
//   );
//   attackingStats.durability += this.convertNullToRandom(
//     character.powerstats.durability
//   );
//   attackingStats.intelligence += this.convertNullToRandom(
//     character.powerstats.intelligence
//   );
//   attackingStats.power += this.convertNullToRandom(
//     character.powerstats.power
//   );
//   attackingStats.speed += this.convertNullToRandom(
//     character.powerstats.combat
//   );
//   attackingStats.strength += this.convertNullToRandom(
//     character.powerstats.combat
//   );
// }
// for (const character of this.props.defenders) {
//   defendingStats.combat += this.convertNullToRandom(
//     character.powerstats.combat
//   );
//   defendingStats.durability += this.convertNullToRandom(
//     character.powerstats.durability
//   );
//   defendingStats.intelligence += this.convertNullToRandom(
//     character.powerstats.intelligence
//   );
//   defendingStats.power += this.convertNullToRandom(
//     character.powerstats.power
//   );
//   defendingStats.speed += this.convertNullToRandom(
//     character.powerstats.combat
//   );
//   defendingStats.strength += this.convertNullToRandom(
//     character.powerstats.combat
//   );
// }
