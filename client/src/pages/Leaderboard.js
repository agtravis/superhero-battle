import React, { Component } from "react";
import API from "../utils/API";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topTen: null,
    };
  }

  componentDidMount() {
    API.getAllUsers()
      .then(dbUSers => {
        const users = dbUSers.data;
        const sorted = users.sort(
          (a, b) => b.wins / b.fights - a.wins / a.fights
        );
        const topTen = [];
        for (let i = 0; i < 10; ++i) {
          if (sorted[i]) {
            topTen.push(sorted[i]);
          }
        }
        this.setState({ topTen: topTen });
      })
      .catch(err => console.error(err));
  }

  render() {
    return <h1>LEADERBOARD</h1>;
  }
}

export default Leaderboard;
