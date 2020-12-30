import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import LeaderBoardTable from "../components/LeaderBoardFlow/FullScreen/LeaderBoardTable";
import LoadingAnimation from "../components/LoadingAnimation";
import PageTitle from "../components/PageTitle";
import API from "../utils/API";
import colors from "../config/colors";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topTen: null,
      usersLoaded: false,
    };
  }

  styles = {
    cellStyle: {
      border: `1px solid ${colors.darkSecondary}`,
      padding: `.5em`,
      textAlign: `center`,
      width: `25px`,
    },
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
    this.setState({ usersLoaded: false });
    API.getTopScorers()
      .then(dbUsers => {
        this.setState({ topTen: dbUsers.data, usersLoaded: true });
      })
      .catch(err => console.error(err));
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

  findAll = async type => {
    this.setState({ usersLoaded: false });
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
    this.setState({ topTen: sorted, usersLoaded: true });
  };

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

  render() {
    return (
      <div>
        <PageTitle>Leader Board</PageTitle>
        {!this.state.usersLoaded ? (
          <LoadingAnimation divHeight={400} size={150} />
        ) : (
          <div
            style={{ width: `100%`, display: `flex`, justifyContent: `center` }}
          >
            <Breakpoint medium up>
              <LeaderBoardTable
                cellStyle={this.styles.cellStyle}
                getTopScorers={this.getTopScorers}
                findAll={this.findAll}
                sortByPropertyName={this.sortByPropertyName}
                topTen={this.state.topTen}
                convertDate={this.convertDate}
                convertWinPercentage={this.convertWinPercentage}
              />
            </Breakpoint>
            <Breakpoint small down>
              <p>small table</p>
            </Breakpoint>
          </div>
        )}
      </div>
    );
  }
}

export default Leaderboard;
