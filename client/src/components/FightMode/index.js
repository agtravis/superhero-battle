import React, { Component } from "react";

class FightMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attackingStats: null,
      defendingStats: null,
    };
  }

  componentDidMount() {
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
    for (const character of this.props.challengers) {
      attackingStats.combat += this.convertNullToRandom(
        character.powerstats.combat
      );
      attackingStats.durability += this.convertNullToRandom(
        character.powerstats.durability
      );
      attackingStats.intelligence += this.convertNullToRandom(
        character.powerstats.intelligence
      );
      attackingStats.power += this.convertNullToRandom(
        character.powerstats.power
      );
      attackingStats.speed += this.convertNullToRandom(
        character.powerstats.combat
      );
      attackingStats.strength += this.convertNullToRandom(
        character.powerstats.combat
      );
    }
    for (const character of this.props.defenders) {
      defendingStats.combat += this.convertNullToRandom(
        character.powerstats.combat
      );
      defendingStats.durability += this.convertNullToRandom(
        character.powerstats.durability
      );
      defendingStats.intelligence += this.convertNullToRandom(
        character.powerstats.intelligence
      );
      defendingStats.power += this.convertNullToRandom(
        character.powerstats.power
      );
      defendingStats.speed += this.convertNullToRandom(
        character.powerstats.combat
      );
      defendingStats.strength += this.convertNullToRandom(
        character.powerstats.combat
      );
    }
    this.setState({
      attackingStats: attackingStats,
      defendingStats: defendingStats,
    });
  }

  convertNullToRandom = stat => {
    return stat === `null` || !stat
      ? Math.floor(Math.random() * 100)
      : parseInt(stat);
  };

  render() {
    return <div>FightMode</div>;
  }
}

export default FightMode;
