import React, { Component } from "react";
import API from "../../../utils/API";
import AppButton from "../../AppButton";
import Team from "../../Team";
import TeamSelection from "../../TeamSelection";

class GetDefenderTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTeamSelector: false,
      teamSelected: false,
      team: [],
      rosterAvailableForTeamSelection: [],
    };
  }

  componentDidMount() {
    API.getUserDetails(this.props.currentUser._id)
      .then(response => this.setState({ team: response.data.teams }))
      .catch(err => console.error(err));
  }

  inTeam = character => {
    for (const member of this.state.team) {
      if (member._id === character._id) {
        return false;
      }
    }
    return true;
  };

  adjustRoster = roster => roster.filter(character => this.inTeam(character));

  removeFromTeam = characterId => {
    const removed = this.state.team.filter(
      character => character._id !== characterId
    );
    this.setState({ team: removed });
  };

  addToTeam = character => {
    const team = this.state.team;
    team.push(character);
    this.setState({ team: team });
  };

  toggleTeamSelector = () => {
    const available = this.adjustRoster(this.props.roster);
    this.setState({ rosterAvailableForTeamSelection: available });
    this.setState({ showTeamSelector: !this.state.showTeamSelector });
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

  render() {
    return (
      <div>
        <h4>Choose Your Team</h4>
        <div style={{ textAlign: `center` }}>
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
                    {this.state.team.length < 3 && this.state.team.length > 0 && (
                      <div
                        style={{
                          marginTop:
                            this.state.team.length === 1 ? `80px` : `20px`,
                        }}
                      >
                        <p>Your team is short!</p>
                        <AppButton
                          margin={`10px 0`}
                          width={`200px`}
                          onClick={() => this.toggleTeamSelector()}
                        >
                          Add Another!
                        </AppButton>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      display: `flex`,
                      justifyContent: `center`,
                      flexDirection: `column`,
                    }}
                  >
                    <p>Your team is currently empty!</p>
                    <AppButton
                      margin={`10px 0`}
                      width={`200px`}
                      onClick={() => this.toggleTeamSelector()}
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
                roster={this.state.rosterAvailableForTeamSelection}
                addToTeam={this.addToTeam}
                toggleTeamSelector={this.toggleTeamSelector}
              />
            </div>
          )}
          <div
            style={{
              display: `flex`,
              justifyContent: `space-around`,
              flexWrap: `wrap-reverse`,
            }}
          >
            <AppButton
              margin={`10px auto`}
              onClick={() => this.props.changePhase(-1)}
              width={`200px`}
            >
              Back
            </AppButton>
            {this.state.team.length === 3 && (
              <AppButton
                margin={`10px auto`}
                onClick={() => this.nextPhase()}
                width={`200px`}
              >
                Next
              </AppButton>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default GetDefenderTeam;
