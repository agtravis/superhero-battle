import React, { Component } from "react";

import LastBattleImage from "../LastBattleImage";

class LastBattleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }

  componentDidMount() {
    const date = new Date(this.props.battle.date);
    const dateArr = date.toDateString().split(` `);
    const dateSentence = `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
    this.setState({ date: dateSentence });
  }

  render() {
    return (
      <div>
        {this.state.date ? (
          <div>
            <h3>{this.state.date}</h3>
            <div style={{ display: `flex`, justifyContent: `space-between` }}>
              <div>
                <h4>Challengers</h4>
                {this.props.battle.challengers.map((challenger, index) => (
                  <p key={index}>{challenger.name}</p>
                ))}
                {this.props.battle.challengers.map((challenger, index) => (
                  <LastBattleImage
                    key={index}
                    src={challenger.image}
                    style={{ width: `50px` }}
                    alt={challenger.name}
                  />
                ))}
              </div>
              <div>
                <h1>VS</h1>
              </div>
              <div>
                <h4>Defenders</h4>
                {this.props.battle.defenders.map((defender, index) => (
                  <p key={index}>{defender.name}</p>
                ))}
                {this.props.battle.defenders.map((defender, index) => (
                  <LastBattleImage
                    key={index}
                    src={defender.image}
                    style={{ width: `50px` }}
                    alt={defender.name}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2>
                {" "}
                You were
                {this.props.battle.winner === `Challenger`
                  ? ` defeated!!!`
                  : ` the victor!!!`}
              </h2>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default LastBattleCard;
