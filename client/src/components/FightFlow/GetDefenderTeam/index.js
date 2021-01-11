import React, { Component } from "react";
import API from "../../../utils/API";
import AppButton from "../../AppButton";
import LoadingAnimation from "../../LoadingAnimation";
import Team from "../../Team";
import TeamSelection from "../TeamSelection";

class GetDefenderTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rosterAvailableForTeamSelection: [],
      showTeamSelector: false,
      team: [],
      teamSelected: false,
      rosterLoaded: false,
      roster: [],
    };
  }

  styles = {
    buttonsContainer: {
      display: `flex`,
      flexWrap: `wrap-reverse`,
      justifyContent: `space-around`,
    },
    container: { textAlign: `center` },
    emptyTeamButtonsContainer: {
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
    },
  };

  componentDidMount() {
    API.getUserDetails(this.props.currentUser._id)
      .then(response =>
        this.setState({
          team: response.data.teams,
          rosterLoaded: true,
          roster: response.data.roster,
        })
      )
      .catch(err => console.error(err));
  }

  addToTeam = character => {
    const team = this.state.team;
    team.push(character);
    this.setState({ team: team });
  };

  adjustRoster = roster => roster.filter(character => this.inTeam(character));

  inTeam = character => {
    for (const member of this.state.team) {
      if (member._id === character._id) {
        return false;
      }
    }
    return true;
  };

  nextPhase = () => {
    API.emptyTeam(this.props.currentUser._id)
      .then(
        API.addToTeam(this.props.currentUser._id, this.state.team[0])
          .then(
            API.addToTeam(this.props.currentUser._id, this.state.team[1])
              .then(
                API.addToTeam(this.props.currentUser._id, this.state.team[2])
                  .then(() => {
                    this.props.setDefendingTeam(this.state.team);

                    this.props.changePhase(1);
                  })
                  .catch(err => console.error(err))
              )
              .catch(err => console.error(err))
          )
          .catch(err => console.error(err))
      )
      .catch(err => console.error(err));
  };

  removeFromTeam = characterId => {
    const removed = this.state.team.filter(
      character => character._id !== characterId
    );
    this.setState({ team: removed });
  };

  toggleTeamSelector = () => {
    const available = this.adjustRoster(this.state.roster);
    this.setState({
      rosterAvailableForTeamSelection: available,
      showTeamSelector: !this.state.showTeamSelector,
    });
  };

  render() {
    return (
      <div>
        <h4>Choose Your Team</h4>
        {!this.state.rosterLoaded ? (
          <LoadingAnimation divHeight={400} size={150} />
        ) : (
          <div style={this.styles.container}>
            {!this.state.showTeamSelector && (
              <div>
                <h5>Your current team:</h5>
                <div>
                  {this.state.team.length > 0 ? (
                    <div>
                      <div>
                        <Team
                          onClickRemove={id => this.removeFromTeam(id)}
                          team={this.state.team}
                        />
                      </div>
                      {this.state.team.length < 3 &&
                        this.state.team.length > 0 && (
                          <div
                            style={{
                              marginTop:
                                this.state.team.length === 1 ? `80px` : `20px`,
                            }}
                          >
                            <p>Your team is short!</p>
                            <AppButton
                              id={`team-short-add-another-button`}
                              margin={`10px 0`}
                              onClick={() => this.toggleTeamSelector()}
                              width={`200px`}
                            >
                              Add Another!
                            </AppButton>
                          </div>
                        )}
                    </div>
                  ) : (
                    <div style={this.styles.emptyTeamButtonsContainer}>
                      <p>Your team is currently empty!</p>
                      <AppButton
                        id={`get-team-leader-button`}
                        margin={`10px 0`}
                        onClick={() => this.toggleTeamSelector()}
                        width={`200px`}
                      >
                        Get Team Leader!
                      </AppButton>
                    </div>
                  )}
                </div>
              </div>
            )}
            {this.state.showTeamSelector && (
              <div>
                <TeamSelection
                  addToTeam={this.addToTeam}
                  roster={this.state.rosterAvailableForTeamSelection}
                  toggleTeamSelector={this.toggleTeamSelector}
                />
              </div>
            )}
            <div style={this.styles.buttonsContainer}>
              <AppButton
                id={`get-defender-team-back-button`}
                margin={`10px auto`}
                onClick={() => this.props.changePhase(-1)}
                width={`200px`}
              >
                Back
              </AppButton>
              {this.state.team.length === 3 && (
                <AppButton
                  id={`get-defender-team-next-button`}
                  margin={`10px auto`}
                  onClick={() => this.nextPhase()}
                  width={`200px`}
                >
                  Next
                </AppButton>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GetDefenderTeam;
