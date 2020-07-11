import React, { Component } from "react";
import API from "../utils/API";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topTen: null,
    };
  }

  cellStyle = {
    border: `1px solid black`,
    padding: `.5em`,
    textAlign: `center`,
  };

  convertDate = datestamp => {
    const date = new Date(datestamp);
    const dateArr = date.toDateString().split(` `);
    const dateSentence = `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
    return dateSentence;
  };

  convertWinPercentage = (wins, totalBattles) => {
    if (totalBattles > 0) {
      const percentage = ((wins / totalBattles) * 100).toFixed(2);
      return `${percentage}%`;
    } else {
      return `N/A`;
    }
  };

  componentDidMount() {
    API.getTopScorers()
      .then(dbUsers => {
        this.setState({ topTen: dbUsers.data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h1>LEADERBOARD</h1>
        <table style={{ borderCollapse: `collapse` }}>
          <tbody>
            <tr>
              <th style={this.cellStyle}>Ranking</th>
              <th style={this.cellStyle}>Username</th>
              <th style={this.cellStyle}>Fighting Since</th>
              <th style={this.cellStyle}>Battles</th>
              <th style={this.cellStyle}>Wins</th>
              <th style={this.cellStyle}>Losses</th>
              <th style={this.cellStyle}>Win Percentage</th>
              <th style={this.cellStyle}>Prestige Level</th>
              <th style={this.cellStyle}>Currently in Roster</th>
            </tr>
            {this.state.topTen
              ? this.state.topTen.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td style={this.cellStyle}>{index + 1}</td>
                      <td style={this.cellStyle}>{user.username}</td>
                      <td style={this.cellStyle}>
                        {this.convertDate(user.registered)}
                      </td>
                      <td style={this.cellStyle}>{user.fights}</td>
                      <td style={this.cellStyle}>{user.wins}</td>
                      <td style={this.cellStyle}>{user.losses}</td>
                      <td style={this.cellStyle}>
                        {this.convertWinPercentage(user.wins, user.fights)}
                      </td>
                      <td style={this.cellStyle}>{user.prestige}</td>
                      <td style={this.cellStyle}>{user.roster.length}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Leaderboard;
