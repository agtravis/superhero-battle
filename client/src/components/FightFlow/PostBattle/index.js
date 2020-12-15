import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppButton from "../../AppButton";
import Team from "../../Team";

class PostBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          display: `flex`,
          justifyContent: `center`,
          flexDirection: `column`,
        }}
      >
        <h3 style={{ textAlign: `center` }}>
          {this.props.winner === `Challenger`
            ? `Commiserations ${this.props.currentUser.username}, you lost! These recruits have deserted you!:`
            : `Congratulations ${this.props.currentUser.username}, you won! These recruits have joined you!:`}
        </h3>
        <Team
          team={
            this.props.winner === `Challenger`
              ? this.props.challengers
              : this.props.defenders
          }
        />
        <div
          style={{
            marginTop: this.props.challengers.length > 1 ? `0px` : `80px`,
            display: `flex`,
            flexWrap: `wrap-reverse`,
            justifyContent: `space-around`,
          }}
        >
          {this.props.winner !== `Challenger` && (
            <Link
              to={{
                pathname: "/",
                state: {
                  type: `rematch`,
                  defenders: this.props.defenders,
                  isSoloFightMode: this.props.isSoloFightMode,
                },
              }}
            >
              <AppButton margin={`10px 10px`} width={`200px`}>
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
            <AppButton margin={`10px 10px`} width={`200px`}>
              Done Fighting
            </AppButton>
          </Link>
        </div>
      </div>
    );
  }
}

export default PostBattle;
