import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Breakpoint } from "react-socks";
import API from "../utils/API";
import colors from "../config/colors";
import LeaderBoardTable from "../components/LeaderBoardFlow/FullScreen/LeaderBoardTable";
import LeaderBoardTableMobile from "../components/LeaderBoardFlow/Mobile/LeaderBoardTableMobile";
import PageTitle from "../components/PageTitle";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerColumns: [],
      metric: `prestige`,
      topTen: null,
      usersLoaded: false,
      userId: null,
    };
  }

  componentDidMount() {
    this.getTopScorers();
    const headerColumns = [
      this.headerCells[0],
      this.headerCells[1],
      this.headerCells[6],
    ];
    this.setState({ headerColumns: headerColumns });
  }

  changeMetric = value => {
    let thirdColumnIndex;
    switch (value) {
      case `ranking`:
        thirdColumnIndex = 6;
        this.getTopScorers();
        break;
      case `username`:
        thirdColumnIndex = 6;
        this.findAll(`username`);
        break;
      case `battles`:
        thirdColumnIndex = 2;
        this.sortByPropertyName(`fights`, `desc`);
        break;
      case `wins`:
        thirdColumnIndex = 3;
        this.sortByPropertyName(`wins`, `desc`);
        break;
      case `losses`:
        thirdColumnIndex = 4;
        this.sortByPropertyName(`losses`, `desc`);
        break;
      case `winPercentage`:
        thirdColumnIndex = 5;
        this.findAll(`percentage`);
        break;
      case `prestige`:
        thirdColumnIndex = 6;
        this.sortByPropertyName(`prestige`, `desc`);
        break;
      case `rosterLength`:
        thirdColumnIndex = 7;
        this.findAll(`roster`);
        break;
      default:
        thirdColumnIndex = 6;
        this.getTopScorers();
    }
    const headerColumns = this.state.headerColumns;
    headerColumns.pop();
    headerColumns.push(this.headerCells[thirdColumnIndex]);
    this.setState({
      headerColumns: headerColumns,
      metric: value,
    });
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

  findAll = async type => {
    this.setState({ usersLoaded: false });
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  getTopScorers = () => {
    this.setState({ usersLoaded: false });
    API.getTopScorers()
      .then(dbUsers => {
        this.setState({ topTen: dbUsers.data, usersLoaded: true });
      })
      .catch(err => console.error(err));
  };

  loadUser = userId => this.setState({ userId: userId });

  percentageSort = users => {
    const sorted = users
      .filter(user => user.fights >= 20)
      .sort((a, b) => b.wins / b.fights - a.wins / a.fights)
      .slice(0, 10);
    this.setState({ topTen: sorted, usersLoaded: true });
  };

  rosterLengthSort = users => {
    const sorted = users
      .filter(user => user.roster.length >= 1)
      .sort((a, b) => b.roster.length - a.roster.length)
      .slice(0, 10);
    this.setState({ topTen: sorted, usersLoaded: true });
  };

  sortByPropertyName = (propertyName, direction) => {
    this.setState({ usersLoaded: false });
    API.getTopScorersByPropertyName({
      property: propertyName,
      direction: direction,
    })
      .then(dbUsers => {
        const topTen = dbUsers.data.filter(
          user => propertyName === `registered` || user[propertyName] > 0
        );
        this.setState({
          topTen: topTen,
          usersLoaded: true,
        });
      })
      .catch(err => console.error(err));
  };

  usernameSort = users => {
    const sorted = users.sort((a, b) => a.username - b.username);
    this.setState({ topTen: sorted, usersLoaded: true });
  };

  headerCells = [
    {
      onClick: this.getTopScorers,
      title: `Ranking`,
      params: [],
    },
    {
      onClick: this.findAll,
      title: `Username`,
      params: [`username`],
    },
    {
      onClick: this.sortByPropertyName,
      title: `Battles`,
      params: [`fights`, `desc`],
    },
    {
      onClick: this.sortByPropertyName,
      title: `Wins`,
      params: [`wins`, `desc`],
    },
    {
      onClick: this.sortByPropertyName,
      title: `Losses`,
      params: [`losses`, `desc`],
    },
    {
      onClick: this.findAll,
      title: `Win Percentage`,
      params: [`percentage`],
    },
    {
      onClick: this.sortByPropertyName,
      title: `Prestige Level`,
      params: [`prestige`, `desc`],
    },
    {
      onClick: this.findAll,
      title: `Currently in Roster`,
      params: [`roster`],
    },
  ];

  styles = {
    cellStyle: {
      border: `1px solid ${colors.darkSecondary}`,
      color: colors.secondary,
      padding: `.5em`,
      textAlign: `center`,
      width: `25px`,
    },
    subtitle: { textAlign: `center` },
    tableContainer: {
      display: `flex`,
      justifyContent: `center`,
      width: `100%`,
    },
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    if (this.state.userId) {
      return (
        <Redirect
          to={{
            pathname: `/profile`,
            state: {
              userId: this.state.userId,
            },
          }}
        />
      );
    }
    return (
      <div>
        <PageTitle>Leader Board</PageTitle>
        <p style={this.styles.subtitle}>
          <em>- Sort by any metric -</em>
        </p>
        <div style={this.styles.tableContainer}>
          <Breakpoint medium up>
            <LeaderBoardTable
              cellStyle={this.styles.cellStyle}
              convertDate={this.convertDate}
              convertWinPercentage={this.convertWinPercentage}
              headerCells={this.headerCells}
              onClick={this.loadUser}
              topTen={this.state.topTen}
              usersLoaded={this.state.usersLoaded}
            />
          </Breakpoint>
          <Breakpoint small down>
            <LeaderBoardTableMobile
              cellStyle={this.styles.cellStyle}
              changeMetric={this.changeMetric}
              convertDate={this.convertDate}
              convertWinPercentage={this.convertWinPercentage}
              headerCells={this.state.headerColumns}
              metric={this.state.metric}
              onClick={this.loadUser}
              topTen={this.state.topTen}
              usersLoaded={this.state.usersLoaded}
            />
          </Breakpoint>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
