import React, { Component } from "react";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <h1>Statistics</h1>
        <h2>
          {this.props.currentUser.username} is a veteran of{" "}
          {this.props.battles.length} fights.
        </h2>
        <table>
          <tbody>
            <tr>
              <th>Fights</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Win %</th>
              <th>In Roster</th>
              <th>Recruitment Ratio</th>
            </tr>
            <tr>
              <td>{this.props.battles.length}</td>
              <td>
                {
                  this.props.battles.filter(
                    battle => battle.winner !== `Challenger`
                  ).length
                }
              </td>
              <td>
                {
                  this.props.battles.filter(
                    battle => battle.winner === `Challenger`
                  ).length
                }
              </td>
              <td>
                {(this.props.battles.filter(
                  battle => battle.winner !== `Challenger`
                ).length /
                  this.props.battles.length) *
                  100}
              </td>
              <td>{this.props.roster.length}</td>
              <td>{this.props.battles.length / this.props.roster.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Stats;
