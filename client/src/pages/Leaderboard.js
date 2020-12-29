import React, { Component } from "react";
import PageTitle from "../components/PageTitle";
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
    this.getTopScorers();
  }

  getTopScorers = () => {
    API.getTopScorers()
      .then(dbUsers => {
        this.setState({ topTen: dbUsers.data });
      })
      .catch(err => console.error(err));
  };

  sortByPropertyName = (propertyName, direction) => {
    API.getTopScorersByPropertyName({
      property: propertyName,
      direction: direction,
    })
      .then(dbUsers => {
        this.setState({
          topTen: dbUsers.data.filter(
            user => propertyName === `registered` || user[propertyName] > 0
          ),
        });
      })
      .catch(err => console.error(err));
  };

  findAll = async type => {
    const response = await API.getAllUsers();
    switch (type) {
      case `percentage`:
        this.percentageSort(response.data);
        break;
      case `roster`:
        this.rosterLengthSort(response.data);
        break;
      case `username`:
        this.usernameSort(response.data);
        break;
      default:
        console.log(`invalid type`, response.data);
    }
  };

  usernameSort = users => {
    const sorted = users.sort((a, b) => a.username - b.username);
    this.setState({ topTen: sorted });
  };

  percentageSort = users => {
    const sorted = users
      .filter(user => user.fights >= 1)
      .sort((a, b) => b.wins / b.fights - a.wins / a.fights);
    this.setState({ topTen: sorted.slice(0, 10) });
  };

  rosterLengthSort = users => {
    const sorted = users
      .filter(user => user.roster.length >= 1)
      .sort((a, b) => b.roster.length - a.roster.length);
    this.setState({ topTen: sorted.slice(0, 10) });
  };

  render() {
    return (
      <div>
        <PageTitle>Leader Board</PageTitle>
        <table style={{ borderCollapse: `collapse` }}>
          <tbody>
            <tr>
              <th style={this.cellStyle} onClick={() => this.getTopScorers()}>
                Ranking
              </th>
              <th
                style={this.cellStyle}
                onClick={() => this.findAll(`username`)}
              >
                Username
              </th>
              <th
                style={this.cellStyle}
                onClick={() => this.sortByPropertyName(`registered`, `asc`)}
              >
                Fighting Since
              </th>
              <th
                style={this.cellStyle}
                onClick={() => this.sortByPropertyName(`fights`, `desc`)}
              >
                Battles
              </th>
              <th
                style={this.cellStyle}
                onClick={() => this.sortByPropertyName(`wins`, `desc`)}
              >
                Wins
              </th>
              <th
                style={this.cellStyle}
                onClick={() => this.sortByPropertyName(`losses`, `desc`)}
              >
                Losses
              </th>
              <th
                style={this.cellStyle}
                onClick={() => this.findAll(`percentage`)}
              >
                Win Percentage
              </th>
              <th
                style={this.cellStyle}
                onClick={() => this.sortByPropertyName(`prestige`, `desc`)}
              >
                Prestige Level
              </th>
              <th style={this.cellStyle} onClick={() => this.findAll(`roster`)}>
                Currently in Roster
              </th>
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
