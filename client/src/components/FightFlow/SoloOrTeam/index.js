import React, { Component } from "react";
import AppButton from "../../AppButton";
import colors from "../../../config/colors";
import "./style.css";

class SoloOrTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSoloFightMode: true,
    };
  }

  toggleIsSoloFightMode = () => {
    if (this.state.isSoloFightMode) {
      document
        .getElementById(`solo-text`)
        .classList.remove(`fight-mode-bolder`);
      document.getElementById(`team-text`).classList.add(`fight-mode-bolder`);
    } else {
      document.getElementById(`solo-text`).classList.add(`fight-mode-bolder`);
      document
        .getElementById(`team-text`)
        .classList.remove(`fight-mode-bolder`);
    }
    this.setState({ isSoloFightMode: !this.state.isSoloFightMode });
  };

  nextPhase = () => {
    if (!this.state.isSoloFightMode) {
      this.props.toggle(`isSoloFightMode`);
    }
    this.props.changePhase(1);
  };

  styles = {
    container: {
      alignItems: `center`,
      display: `flex`,
      height: `300px`,
      justifyContent: `center`,
      width: `75%`,
      margin: `auto`,
    },
    subContainer: {
      width: `175px`,
      display: `flex`,
      alignItems: `space-around`,
      justifyContent: `center`,
    },
    text: {
      fontSize: `1.5rem`,
      margin: `0px`,
    },
  };

  render() {
    return (
      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `center`,
        }}
      >
        <h3>How would you like to fight?</h3>
        <div style={this.styles.container}>
          <div style={this.styles.subContainer}>
            <p
              className={`fight-mode-bolder`}
              id={`solo-text`}
              style={this.styles.text}
            >
              SOLO
            </p>
          </div>
          <div style={{ ...this.styles.subContainer, paddingTop: `9px` }}>
            <label className="switch">
              <input
                disabled={this.props.roster.length < 3 ? true : false}
                onChange={() => this.toggleIsSoloFightMode()}
                type="checkbox"
              />
              <span className="slider"></span>
            </label>
          </div>
          <div style={this.styles.subContainer}>
            <div>
              <p id={`team-text`} style={this.styles.text}>
                <span
                  style={{
                    color: this.props.roster.length < 3 && colors.danger,
                  }}
                >
                  TEAM
                </span>
              </p>
            </div>
          </div>
        </div>
        {this.props.roster.length < 3 && (
          <div
            style={{
              display: `flex`,
              justifyContent: `center`,
              color: colors.danger,
            }}
          >
            <p>Roster must have at least 3 to form a team!</p>
          </div>
        )}
        <div style={{ display: `flex`, justifyContent: `center` }}>
          <AppButton
            margin={`10px 0`}
            onClick={() => this.nextPhase()}
            width={`200px`}
          >
            Next
          </AppButton>
        </div>
      </div>
    );
  }
}

export default SoloOrTeam;
