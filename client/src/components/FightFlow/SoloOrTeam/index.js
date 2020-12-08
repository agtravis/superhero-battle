import React, { Component } from "react";
import AppButton from "../../AppButton";
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
      margin: `auto`,
      width: `25%`,
      display: `flex`,
      alignItems: `center`,
    },
    text: {
      fontSize: `1.5rem`,
      margin: `0px`,
    },
  };

  render() {
    return (
      <div>
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
          <div style={this.styles.subContainer}>
            <label className="switch">
              <input
                onChange={() => this.toggleIsSoloFightMode()}
                type="checkbox"
              />
              <span className="slider"></span>
            </label>
          </div>
          <div style={this.styles.subContainer}>
            <div>
              <p id={`team-text`} style={this.styles.text}>
                TEAM
              </p>
            </div>
          </div>
        </div>
        <div style={{ display: `flex`, justifyContent: `center` }}>
          <AppButton
            style={{ margin: `0px auto` }}
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
