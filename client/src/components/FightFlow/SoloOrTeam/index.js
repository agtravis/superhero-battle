import React, { Component } from "react";
import colors from "../../../config/colors";
import AppButton from "../../AppButton";
import ToggleSwitch from "../../ToggleSwitch";

class SoloOrTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSoloFightMode: true,
    };
  }

  styles = {
    alert: {
      display: `flex`,
      justifyContent: `center`,
      color: colors.danger,
    },
    buttonContainer: { display: `flex`, justifyContent: `center` },
    container: {
      alignItems: `center`,
      display: `flex`,
      height: `300px`,
      justifyContent: `center`,
      margin: `auto`,
      width: `75%`,
    },
    outerContainer: {
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
    },
    subContainer: {
      alignItems: `space-around`,
      display: `flex`,
      justifyContent: `center`,
      width: `175px`,
    },
    text: {
      fontSize: `1.5rem`,
      margin: `0px`,
    },
  };

  componentDidMount() {
    if (this.props.rematch) {
      this.props.setToggleFightMode(this.props.wasSoloFightMode);
      this.props.changePhase(1);
    }
  }

  nextPhase = () => {
    if (!this.state.isSoloFightMode) {
      this.props.toggle(`isSoloFightMode`);
    }
    this.props.changePhase(1);
  };

  toggleIsSoloFightMode = () => {
    this.setState({ isSoloFightMode: !this.state.isSoloFightMode });
  };

  render() {
    return (
      <div style={this.styles.outerContainer}>
        <h3>How would you like to fight?</h3>
        <ToggleSwitch
          leftText={`SOLO`}
          rightText={`TEAM`}
          height={`300px`}
          toggleFunction={this.toggleIsSoloFightMode}
          disabled={this.props.roster.length < 3}
        />
        {this.props.roster.length < 3 && (
          <div style={this.styles.alert}>
            <p>Roster must have at least 3 to form a team!</p>
          </div>
        )}
        <div style={this.styles.buttonContainer}>
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
