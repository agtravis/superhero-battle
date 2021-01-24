import React, { Component } from "react";
import { BreakpointProvider } from "react-socks";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import API from "./utils/API";
import NetworkDetector from "./Hoc/NetworkDetector";
import About from "./pages/About";
import Character from "./pages/Character";
import Fight from "./pages/Fight";
import Index from "./pages/Index";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import Roster from "./pages/Roster";
import RulesPage from "./pages/RulesPage";
import SearchPage from "./pages/Search";
import Settings from "./pages/Settings";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Screen from "./components/Screen";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isNavShowing: false,
      loaded: false,
      loggedIn: false,
      redirect: null,
      roster: [],
      teams: [],
    };
  }

  componentDidMount() {
    this.getUser();
  }

  title = `Superhero Battle`;

  addAndRemoveOneClass = (element, classToAdd, ClassToRemove) => {
    element.classList.add(classToAdd);
    element.classList.remove(ClassToRemove);
  };

  changeUser = () => {
    this.setState({ redirect: true });
  };

  fillUser = () => {
    API.getUserDetails(this.state.currentUser._id)
      .then(response => {
        this.setState({
          roster: response.data.roster,
          teams: response.data.teams,
        });
      })
      .catch(err => console.error(err));
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

  logOut = () => {
    API.logOut()
      .then(() => this.changeUser())
      .catch(err => console.error(err));
  };

  passwordCheck = userPassword =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/.test(
      userPassword
    );

  showNav = () => {
    if (document.getElementsByClassName(`nav-mobile`)[0]) {
      const navMobile = document.getElementsByClassName(`nav-mobile`)[0];
      const mainBody = document.getElementsByClassName(`main-body`)[0];
      const wholeContainer = document.getElementById(`whole-container`);
      if (navMobile.classList.contains(`translateNavMobile`)) {
        this.addAndRemoveOneClass(
          navMobile,
          `translateNavMobileBack`,
          `translateNavMobile`
        );
        mainBody.classList.remove(`no-scroll`);
        this.addAndRemoveOneClass(
          wholeContainer,
          `body-scroll`,
          `body-no-scroll`
        );
      } else {
        this.addAndRemoveOneClass(
          navMobile,
          `translateNavMobile`,
          `translateNavMobileBack`
        );
        mainBody.classList.add(`no-scroll`);
        this.addAndRemoveOneClass(
          wholeContainer,
          `body-no-scroll`,
          `body-scroll`
        );
      }
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
            <div id={`whole-container`} className={`body-scroll`}>
              <div>
                <Header
                  addAndRemoveOneClass={this.addAndRemoveOneClass}
                  changeUser={this.changeUser}
                  currentUser={this.state.currentUser}
                  loggedIn={this.state.loggedIn}
                  logOut={this.logOut}
                  passwordCheck={this.passwordCheck}
                  showNav={this.showNav}
                  title={this.title}
                />
                <div className={`main-body`}>
                  <NavBar
                    addAndRemoveOneClass={this.addAndRemoveOneClass}
                    changeUser={this.changeUser}
                    currentUser={this.state.currentUser}
                    isNavShowing={this.state.isNavShowing}
                    loggedIn={this.state.loggedIn}
                    logOut={this.logOut}
                    showNav={this.showNav}
                  />
                  <Screen>
                    <Switch>
                      <Route
                        exact
                        path="/"
                        render={routeProps => (
                          <Index
                            captain={this.state.roster[0]}
                            currentUser={this.state.currentUser}
                            getUser={this.getUser}
                            loaded={this.state.loaded}
                            loggedIn={this.state.loggedIn}
                            recruit={
                              this.state.roster[this.state.roster.length - 1]
                            }
                            title={this.title}
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
                        path="/fight"
                        render={routeProps => (
                          <Fight
                            currentUser={this.state.currentUser}
                            fillUser={this.fillUser}
                            team={this.state.teams}
                            {...routeProps}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/roster"
                        render={routeProps => (
                          <Roster
                            currentUser={this.state.currentUser}
                            fillUser={this.fillUser}
                            {...routeProps}
                          />
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
                        path="/leaderboard"
                        render={routeProps => (
                          <Leaderboard
                            currentUser={this.state.currentUser}
                            {...routeProps}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/search"
                        render={() => (
                          <SearchPage currentUser={this.state.currentUser} />
                        )}
                      />
                      <Route
                        exact
                        path="/profile"
                        render={routeProps => (
                          <ProfilePage
                            currentUser={this.state.currentUser}
                            {...routeProps}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/character"
                        render={routeProps => (
                          <Character
                            currentUser={this.state.currentUser}
                            {...routeProps}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/settings"
                        render={() => (
                          <Settings
                            currentUser={this.state.currentUser}
                            passwordCheck={this.passwordCheck}
                          />
                        )}
                      />
                      <Route
                        render={routeProps => <NotFound {...routeProps} />}
                      />
                    </Switch>
                  </Screen>
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
