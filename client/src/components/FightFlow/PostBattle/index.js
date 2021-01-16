import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppButton from "../../AppButton";
import Team from "../../Team";

class PostBattle extends Component {
  styles = {
    container: {
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
    },
    endButtonsContainer: {
      display: `flex`,
      flexWrap: `wrap-reverse`,
      justifyContent: `space-around`,
      marginTop: this.props.challengers.length > 1 ? `0px` : `80px`,
    },
    header: { textAlign: `center` },
  };

  closingHeaderText = () =>
    this.props.isSoloFightMode ? `This recruit has` : `These recruits have`;

  render() {
    return (
      <div style={this.styles.container}>
        <h3 style={this.styles.header}>
          {this.props.winner === `Challenger`
            ? `Commiserations ${
                this.props.currentUser.username
              }, you lost! ${this.closingHeaderText()} deserted you:`
            : `Congratulations ${
                this.props.currentUser.username
              }, you won! ${this.closingHeaderText()} joined you:`}
        </h3>
        <Team
          team={
            this.props.winner === `Challenger`
              ? this.props.defenders
              : this.props.challengers
          }
        />
        <div style={this.styles.endButtonsContainer}>
          {this.props.winner !== `Challenger` && (
            <Link
              to={{
                pathname: "/",
                state: {
                  defenders: this.props.defenders,
                  isSoloFightMode: this.props.isSoloFightMode,
                  type: `rematch`,
                },
              }}
            >
              <AppButton
                id={`post-battle-continue-button`}
                margin={`10px 10px`}
              >
                Continue Fighting
              </AppButton>
            </Link>
          )}
          <Link
            to={{
              pathname: "/",
              type: `refresh`,
            }}
          >
            <AppButton id={`post-battle-done-button`} margin={`10px 10px`}>
              Done Fighting
            </AppButton>
          </Link>
        </div>
      </div>
    );
  }
}

export default PostBattle;
