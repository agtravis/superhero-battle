import React, { Component } from "react";

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
      Object.keys(challenger.powerstats).forEach(key => {
        attackingStats[key] += this.convertNullToRandom(challenger[key]);
      });
    }
    for (const defender of this.props.defenders) {
      Object.keys(defender.powerstats).forEach(key => {
        defendingStats[key] += this.convertNullToRandom(defender[key]);
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
    this.setState({ fightStat: event.target.value });
  };

  render() {
    return (
      <div>
        {this.state.round === 1 ? (
          <div>
            <h3>Round 1!</h3>
            <p>Pick a stat:</p>
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
