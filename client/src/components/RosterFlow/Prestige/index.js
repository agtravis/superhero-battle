import React, { Component } from "react";
import colors from "../../../config/colors";
import AppButton from "../../AppButton";

class Prestige extends Component {
  render() {
    return (
      <div
        style={{
          border: `5px dashed ${colors.darkSecondary}`,
          marginBottom: `10px`,
          padding: `10px`,
        }}
      >
        <div
          style={{
            display: `flex`,
            justifyContent: `space-around`,
            alignItems: `center`,
          }}
        >
          <div>
            <p style={{ margin: `0` }}>
              {this.props.fromFightPage
                ? `There are no characters left to fight!`
                : `Your roster is full!`}
            </p>
          </div>
          <div>
            <AppButton
              onClick={() => this.props.prestige()}
              width={`200px`}
              margin={`10px 0px`}
            >
              Prestige
            </AppButton>
          </div>
        </div>
        <div style={{ display: `flex`, justifyContent: `center` }}>
          <p style={{ textAlign: `center`, margin: `0` }}>
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
