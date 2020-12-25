import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AppButton from "../components/AppButton";
import Battle from "../components/FightFlow/Battle";
import GetDefenderSolo from "../components/FightFlow/GetDefenderSolo";
import GetDefenderTeam from "../components/FightFlow/GetDefenderTeam";
import GetOpponent from "../components/FightFlow/GetOpponent";
// import SuperHeroAPI from "../utils/SuperHeroAPI";
// import fullList from "../utils/characters";
import SoloOrTeam from "../components/FightFlow/SoloOrTeam";
import LastBattleCard from "../components/LastBattleCard";
import LoadingAnimation from "../components/LoadingAnimation";
import PageTitle from "../components/PageTitle";
import API from "../utils/API";

class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 0,
      isSoloFightMode: true,
      wasSoloFightMode: true,
      defendingTeam: [],
      opposingTeam: [],
      previousTeam: [],
      rematch: false,
      roster: [],
    };
  }

  componentDidMount() {
    API.getUserDetails(this.props.currentUser._id)
      .then(response =>
        this.setState({ rosterLoaded: true, roster: response.data.roster })
      )
      .catch(err => console.error(err));
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

  reset = () => this.setState({ phase: 1 });

  setDefendingTeam = defendingTeam =>
    this.setState({ defendingTeam: defendingTeam });

  setOpposingTeam = opposingTeam =>
    this.setState({ opposingTeam: opposingTeam });

  setToggleFightMode = bool => this.setState({ isSoloFightMode: bool });

  toggle = stateName => this.setState({ [stateName]: !this.state[stateName] });

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
            {this.state.phase < 3 && (
              <div>
                <div
                  style={{
                    display: `flex`,
                    justifyContent: `center`,
                    flexDirection: `column`,
                    textAlign: `center`,
                  }}
                >
                  <div>
                    <p>
                      Phase:{" "}
                      {this.phaseText(
                        this.state.phase,
                        this.state.isSoloFightMode
                      )}
                      {this.state.phase >= 1 &&
                        `; Mode: ${
                          this.state.isSoloFightMode ? `Solo` : `Team`
                        }-Fight`}
                      {this.state.phase >= 2 &&
                        `; Opposing ${
                          this.state.isSoloFightMode ? `Fighter` : `Team`
                        }: ${this.state.opposingTeam.map(
                          (character, index) =>
                            `${index !== 0 ? ` ` : ``}${character.name}`
                        )}`}
                      {this.state.phase >= 3 &&
                        `; Defending ${
                          this.state.isSoloFightMode ? `Fighter` : `Team`
                        }: ${this.state.defendingTeam.map(
                          (character, index) =>
                            `${index !== 0 ? ` ` : ``}${character.name}`
                        )}`}
                    </p>
                  </div>
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
                rematch={this.state.rematch}
                wasSoloFightMode={this.state.wasSoloFightMode}
                roster={this.state.roster}
                changePhase={this.changePhase}
                toggle={this.toggle}
                isSoloFightMode={this.isSoloFightMode}
                setToggleFightMode={this.setToggleFightMode}
              />
            )}
            {this.state.phase === 1 && (
              <GetOpponent
                rematch={this.state.rematch}
                setOpposingTeam={this.setOpposingTeam}
                changePhase={this.changePhase}
                wasSoloFightMode={this.state.wasSoloFightMode}
                isSoloFightMode={this.state.isSoloFightMode}
                roster={this.state.roster}
              />
            )}
            {this.state.phase === 2 && this.state.isSoloFightMode && (
              <GetDefenderSolo
                currentUser={this.props.currentUser}
                changePhase={this.changePhase}
                previousTeam={this.state.previousTeam}
                rematch={this.state.rematch}
                roster={this.state.roster}
                setDefendingTeam={this.setDefendingTeam}
              />
            )}
            {this.state.phase === 2 && !this.state.isSoloFightMode && (
              <GetDefenderTeam
                rematch={this.state.rematch}
                previousTeam={this.state.previousTeam}
                roster={this.state.roster}
                currentUser={this.props.currentUser}
                team={this.props.team}
                changePhase={this.changePhase}
                setDefendingTeam={this.setDefendingTeam}
              />
            )}
            {this.state.phase === 3 && (
              <LastBattleCard
                battle={{
                  defenders: this.state.defendingTeam,
                  challengers: this.state.opposingTeam,
                }}
                isPreFightStaging
                changePhase={this.changePhase}
              />
            )}

            {this.state.phase === 4 && (
              <Battle
                reset={this.reset}
                currentUser={this.props.currentUser}
                defenders={this.state.defendingTeam}
                challengers={this.state.opposingTeam}
                isSoloFightMode={this.state.isSoloFightMode}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Fight;
