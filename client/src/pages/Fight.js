import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import AppButton from "../components/AppButton";
import Battle from "../components/FightFlow/Battle";
import GetDefenderSolo from "../components/FightFlow/GetDefenderSolo";
import GetDefenderTeam from "../components/FightFlow/GetDefenderTeam";
import GetOpponent from "../components/FightFlow/GetOpponent";
import LastBattleCard from "../components/LastBattleCard";
import LoadingAnimation from "../components/LoadingAnimation";
import PageTitle from "../components/PageTitle";
import PhaseText from "../components/FightFlow/PhaseText";
import Prestige from "../components/RosterFlow/Prestige";
import SoloOrTeam from "../components/FightFlow/SoloOrTeam";

class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defendingTeam: [],
      isSoloFightMode: true,
      opposingTeam: [],
      previousTeam: [],
      phase: 0,
      rematch: false,
      roster: [],
      wasSoloFightMode: true,
    };
  }

  componentDidMount() {
    this.loadRoster();
    if (this.props.location.state) {
      this.setState({
        phase: 1,
        isSoloFightMode: this.props.location.state.isSoloFightMode,
        wasSoloFightMode: this.props.location.state.isSoloFightMode,
        previousTeam: this.props.location.state.defenders,
        rematch: true,
      });
    }
  }

  changePhase = direction => {
    if (this.state.phase === 1 && direction === -1) {
      this.setState({ isSoloFightMode: true, rematch: false });
    }
    if (this.state.phase === 2 && direction === -1) {
      this.setState({ opposingTeam: [], rematch: false });
    }
    if (this.state.phase === 3 && direction === -1) {
      this.setState({ defendingTeam: [], rematch: false });
    }
    this.setState({ phase: this.state.phase + direction });
  };

  loadRoster = () => {
    API.getUserDetails(this.props.currentUser._id)
      .then(response =>
        this.setState({ rosterLoaded: true, roster: response.data.roster })
      )
      .catch(err => console.error(err));
  };

  phaseText = (phase, solo) => {
    phase += 1;
    switch (phase) {
      case 2:
        return `${phase} - Get Your Challenger`;
      case 3:
        return `${phase} - Choose Your ${solo ? `Fighter` : `Team`}`;
      case 4:
        return `${phase} - Staging!`;
      default:
        return `${phase} - Choose Your Fighting Mode`;
    }
  };

  prestige = () => {
    API.prestige(this.props.currentUser._id)
      .then(() => {
        this.setState({ rosterLoaded: false });
        this.props.fillUser();
        this.loadRoster();
      })
      .catch(err => console.error(err));
  };

  reset = () => this.setState({ phase: 1 });

  setDefendingTeam = defendingTeam =>
    this.setState({ defendingTeam: defendingTeam });

  setOpposingTeam = opposingTeam =>
    this.setState({ opposingTeam: opposingTeam });

  setToggleFightMode = bool => this.setState({ isSoloFightMode: bool });

  toggle = stateName => this.setState({ [stateName]: !this.state[stateName] });

  styles = {
    phaseContainer: {
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
      textAlign: `center`,
    },
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    if (this.state.rosterLoaded && this.state.roster.length < 1) {
      return (
        <Redirect
          to={{
            pathname: `/roster`,
          }}
        />
      );
    }
    return (
      <div>
        <PageTitle>The Arena</PageTitle>

        {!this.state.rosterLoaded ? (
          <LoadingAnimation divHeight={400} size={150} />
        ) : (
          <div>
            {this.state.roster.length < 731 ? (
              <div>
                {this.state.phase < 3 && (
                  <div>
                    <div style={this.styles.phaseContainer}>
                      <PhaseText
                        defendingTeam={this.state.defendingTeam}
                        isSoloFightMode={this.state.isSoloFightMode}
                        opposingTeam={this.state.opposingTeam}
                        phase={this.state.phase}
                      />
                      {this.state.phase > 0 && (
                        <div>
                          <AppButton
                            margin={`10px auto`}
                            onClick={() => this.changePhase(-1)}
                            width={`200px`}
                          >
                            Back
                          </AppButton>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {this.state.phase === 0 && (
                  <SoloOrTeam
                    changePhase={this.changePhase}
                    isSoloFightMode={this.isSoloFightMode}
                    rematch={this.state.rematch}
                    roster={this.state.roster}
                    setToggleFightMode={this.setToggleFightMode}
                    toggle={this.toggle}
                    wasSoloFightMode={this.state.wasSoloFightMode}
                  />
                )}
                {this.state.phase === 1 && (
                  <GetOpponent
                    changePhase={this.changePhase}
                    isSoloFightMode={this.state.isSoloFightMode}
                    rematch={this.state.rematch}
                    roster={this.state.roster}
                    setOpposingTeam={this.setOpposingTeam}
                    wasSoloFightMode={this.state.wasSoloFightMode}
                  />
                )}
                {this.state.phase === 2 && this.state.isSoloFightMode && (
                  <GetDefenderSolo
                    changePhase={this.changePhase}
                    currentUser={this.props.currentUser}
                    previousTeam={this.state.previousTeam}
                    rematch={this.state.rematch}
                    roster={this.state.roster}
                    setDefendingTeam={this.setDefendingTeam}
                  />
                )}
                {this.state.phase === 2 && !this.state.isSoloFightMode && (
                  <GetDefenderTeam
                    changePhase={this.changePhase}
                    currentUser={this.props.currentUser}
                    previousTeam={this.state.previousTeam}
                    rematch={this.state.rematch}
                    roster={this.state.roster}
                    setDefendingTeam={this.setDefendingTeam}
                    team={this.props.team}
                  />
                )}
                {this.state.phase === 3 && (
                  <LastBattleCard
                    battle={{
                      challengers: this.state.opposingTeam,
                      defenders: this.state.defendingTeam,
                    }}
                    changePhase={this.changePhase}
                    isPreFightStaging
                  />
                )}

                {this.state.phase === 4 && (
                  <Battle
                    challengers={this.state.opposingTeam}
                    currentUser={this.props.currentUser}
                    defenders={this.state.defendingTeam}
                    isSoloFightMode={this.state.isSoloFightMode}
                    reset={this.reset}
                  />
                )}
              </div>
            ) : (
              <div>
                <Prestige fromFightPage prestige={this.prestige} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Fight;
