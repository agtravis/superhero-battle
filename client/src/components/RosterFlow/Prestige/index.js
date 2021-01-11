import React, { Component } from "react";
import colors from "../../../config/colors";
import AppButton from "../../AppButton";

class Prestige extends Component {
  styles = {
    bottomRowContainer: { display: `flex`, justifyContent: `center` },
    container: {
      border: `5px dashed ${colors.darkSecondary}`,
      marginBottom: `10px`,
      padding: `10px`,
    },
    text: { margin: `0`, textAlign: `center` },
    topRowContainer: {
      alignItems: `center`,
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `space-around`,
    },
  };

  render() {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.topRowContainer}>
          <div>
            <p style={this.styles.text}>
              {this.props.fromFightPage
                ? `There are no characters left to fight!`
                : `Your roster is full!`}
            </p>
          </div>
          <div>
            <AppButton
              id={`prestige-button`}
              margin={`10px 0px`}
              onClick={() => this.props.prestige()}
              width={`200px`}
            >
              Prestige
            </AppButton>
          </div>
        </div>
        <div style={this.styles.bottomRowContainer}>
          <p style={this.styles.text}>
            <em>
              Activating this will empty your roster completely and level up
              your prestige!
            </em>
          </p>
        </div>
      </div>
    );
  }
}

export default Prestige;
