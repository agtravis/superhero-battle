import React, { Component } from "react";
import { BreakpointProvider } from "react-socks";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NetworkDetector from "./Hoc/NetworkDetector";

import API from "./utils/API";

import Index from "./pages/Index";
import Roster from "./pages/Roster";
import Fight from "./pages/Fight";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import RulesPage from "./pages/RulesPage";

import Header from "./components/Header";
import NavBar from "./components/NavBar";

import Screen from "./components/Screen";
import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      loggedIn: false,
      loaded: false,
      currentUser: null,
      roster: [],
      teams: [],
      battles: [],
      record: {},
      isNavShowing: false,
    };
  }

  title = `Superhero Battle`;

  componentDidMount() {
    this.getUser();
  }

  addAndRemoveOneClass = (element, classToAdd, ClassToRemove) => {
    element.classList.add(classToAdd);
    element.classList.remove(ClassToRemove);
  };

  getUser = () => {
    this.setState({ loaded: false });
    API.getSessionUser()
      .then(response => {
        if (response.data.user) {
          this.setState({
            loggedIn: true,
            currentUser: response.data.user,
            loaded: true,
          });
          this.fillUser();
        } else {
          this.setState({
            loaded: true,
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
      .then(response => {
        this.setState({
          roster: response.data.roster,
          teams: response.data.teams,
          battles: response.data.pastBattles,
          record: {
            wins: response.data.wins,
            losses: response.data.losses,
            prestige: response.data.prestige,
          },
        });
      })
      .catch(err => console.error(err));
  };

  changeUser = () => {
    this.setState({ redirect: true });
  };

  logOut = () => {
    API.logOut()
      .then(() => this.changeUser())
      .catch(err => console.error(err));
  };

  showNav = () => {
    if (document.getElementsByClassName(`nav-mobile`)[0]) {
      const navMobile = document.getElementsByClassName(`nav-mobile`)[0];
      navMobile.classList.contains(`translateNavMobile`)
        ? this.addAndRemoveOneClass(
            navMobile,
            `translateNavMobileBack`,
            `translateNavMobile`
          )
        : this.addAndRemoveOneClass(
            navMobile,
            `translateNavMobile`,
            `translateNavMobileBack`
          );
      this.setState({ isNavShowing: !this.state.isNavShowing });
    }
  };

  render() {
    if (this.state.redirect) {
      window.location.href = `/`;
    }
    return (
      <BreakpointProvider>
        <div>
          <Router>
            <div
              style={{
                minHeight: `100vh`,
                display: `flex`,
                flexDirection: `column`,
                justifyContent: `space-between`,
              }}
            >
              <div>
                <Header
                  changeUser={this.changeUser}
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                  addAndRemoveOneClass={this.addAndRemoveOneClass}
                  showNav={this.showNav}
                  logOut={this.logOut}
                  title={this.title}
                />
                <div className={`main-body`}>
                  <NavBar
                    currentUser={this.state.currentUser}
                    loggedIn={this.state.loggedIn}
                    changeUser={this.changeUser}
                    addAndRemoveOneClass={this.addAndRemoveOneClass}
                    showNav={this.showNav}
                    isNavShowing={this.state.isNavShowing}
                    logOut={this.logOut}
                  />
                  <Switch>
                    <Screen>
                      <Route
                        exact
                        path="/"
                        render={routeProps => (
                          <Index
                            loaded={this.state.loaded}
                            loggedIn={this.state.loggedIn}
                            currentUser={this.state.currentUser}
                            captain={this.state.roster[0]}
                            recruit={
                              this.state.roster[this.state.roster.length - 1]
                            }
                            title={this.title}
                            getUser={this.getUser}
                            {...routeProps}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/about"
                        render={routeProps => (
                          <About title={this.title} {...routeProps} />
                        )}
                      />
                      <Route
                        exact
                        path="/rules"
                        render={() => (
                          <RulesPage currentUser={this.state.currentUser} />
                        )}
                      />
                      <Route
                        exact
                        path="/fight"
                        render={routeProps => (
                          <Fight
                            loggedIn={this.state.loggedIn}
                            currentUser={this.state.currentUser}
                            roster={this.state.roster}
                            team={this.state.teams}
                            fillUser={this.fillUser}
                            {...routeProps}
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
                    </Screen>
                  </Switch>
                </div>
              </div>
              <Footer />
            </div>
          </Router>
        </div>
      </BreakpointProvider>
    );
  }
}
export default NetworkDetector(App);
