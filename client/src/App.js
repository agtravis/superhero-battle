import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NetworkDetector from "./Hoc/NetworkDetector";

import API from "./utils/API";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Roster from "./pages/Roster";
import Fight from "./pages/Fight";
import FightSolo from "./pages/FightSolo";
import FightTeam from "./pages/FightTeam";
import Stats from "./pages/Stats";
import Teams from "./pages/Teams";
import Leaderboard from "./pages/Leaderboard";

import Header from "./components/Header";
import NavBar from "./components/NavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      loggedIn: false,
      currentUser: null,
      roster: [],
      teams: [],
      battles: [],
      record: {},
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    API.getSessionUser()
      .then(sessionUser => {
        if (sessionUser.data.user) {
          this.setState({ loggedIn: true, currentUser: sessionUser.data.user });
          this.fillUser();
        } else {
          this.setState({
            loggedIn: false,
            currentUser: null,
            roster: [],
            teams: [],
          });
        }
      })
      .catch(err => console.error(err));
  };

  fillUser = () => {
    API.getUserDetails(this.state.currentUser._id)
      .then(dbUser => {
        this.setState({
          roster: dbUser.data.roster,
          teams: dbUser.data.teams,
          battles: dbUser.data.pastBattles,
          record: {
            wins: dbUser.data.wins,
            losses: dbUser.data.losses,
            prestige: dbUser.data.prestige,
          },
        });
      })
      .catch(err => console.error(err));
  };

  changeUser = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      window.location.href = `/`;
    }
    return (
      <>
        <Header
          changeUser={this.changeUser}
          loggedIn={this.state.loggedIn}
          currentUser={this.state.currentUser}
        />
        <Router>
          <NavBar loggedIn={this.state.loggedIn} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Index
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                  captain={this.state.roster[0]}
                  recruit={this.state.roster[this.state.roster.length - 1]}
                />
              )}
            />
            <Route
              exact
              path="/home"
              render={() => (
                <Home
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                  battles={this.state.battles}
                />
              )}
            />
            <Route
              exact
              path="/fight"
              render={() => (
                <Fight
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                  roster={this.state.roster}
                  fillUser={this.fillUser}
                />
              )}
            />
            <Route
              exact
              path="/fightsolo"
              render={() => (
                <FightSolo
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                  roster={this.state.roster}
                  fillUser={this.fillUser}
                />
              )}
            />
            <Route
              exact
              path="/fightteam"
              render={() => (
                <FightTeam
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                  roster={this.state.roster}
                  teams={this.state.teams}
                  fillUser={this.fillUser}
                />
              )}
            />
            <Route
              exact
              path="/stats"
              render={() => (
                <Stats
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                  roster={this.state.roster}
                  battles={this.state.battles}
                  record={this.state.record}
                />
              )}
            />
            <Route
              exact
              path="/roster"
              render={() => (
                <Roster
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                  roster={this.state.roster}
                  fillUser={this.fillUser}
                />
              )}
            />
            <Route
              exact
              path="/teams"
              render={() => (
                <Teams
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                  roster={this.state.roster}
                  fillUser={this.fillUser}
                />
              )}
            />
            <Route
              exact
              path="/leaderboard"
              render={() => (
                <Leaderboard
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                />
              )}
            />
          </Switch>
        </Router>
      </>
    );
  }
}
export default NetworkDetector(App);
