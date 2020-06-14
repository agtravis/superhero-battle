import React, { Component } from "react";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  cellStyle = {
    border: `1px solid black`,
    padding: `.5em`,
    textAlign: `center`,
  };

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
        <table style={{ borderCollapse: `collapse` }}>
          <tbody>
            <tr>
              <th style={this.cellStyle}>Fights</th>
              <th style={this.cellStyle}>Wins</th>
              <th style={this.cellStyle}>Losses</th>
              <th style={this.cellStyle}>Win %</th>
              <th style={this.cellStyle}>In Roster</th>
              <th style={this.cellStyle}>Recruitment Ratio</th>
            </tr>
            <tr>
              <td style={this.cellStyle}>{this.props.battles.length}</td>
              <td style={this.cellStyle}>
                {
                  this.props.battles.filter(
                    battle => battle.winner !== `Challenger`
                  ).length
                }
              </td>
              <td style={this.cellStyle}>
                {
                  this.props.battles.filter(
                    battle => battle.winner === `Challenger`
                  ).length
                }
              </td>
              <td style={this.cellStyle}>
                {(
                  (this.props.battles.filter(
                    battle => battle.winner !== `Challenger`
                  ).length /
                    this.props.battles.length) *
                  100
                ).toFixed(2)}
              </td>
              <td style={this.cellStyle}>{this.props.roster.length}</td>
              <td style={this.cellStyle}>
                {(this.props.roster.length / this.props.battles.length).toFixed(
                  2
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Stats;
