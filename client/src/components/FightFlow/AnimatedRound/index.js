import React, { Component } from "react";
import AppButton from "../../AppButton";

class AnimatedRound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defenderWidth: 0,
      challengerWidth: 0,
      defenderFinished: false,
      challengerFinished: false,
      commenced: false,
    };
  }

  start = () => {
    this.setState({ commenced: true });
    let defenderStat = this.props.defenderStat;
    let challengerStat = this.props.challengerStat;
    if (!this.props.isSoloFightMode) {
      defenderStat = defenderStat / 3;
      challengerStat = challengerStat / 3;
    }
    this.expand(`defenderWidth`, defenderStat);
    this.expand(`challengerWidth`, challengerStat);
  };

  expand = (character, max) => {
    let counter = 0;
    const timer = setInterval(() => {
      if (counter >= max) {
        clearInterval(timer);
        character === `defenderWidth`
          ? this.setState({ defenderFinished: true })
          : this.setState({ challengerFinished: true });
      }
      this.setState({ [character]: counter });
      counter = counter + 0.1;
    }, 1);
  };

  render() {
    return (
      <div>
        {!this.state.commenced && (
          <AppButton width={`200px`} margin={`10px 0px`} onClick={this.start}>
            Fight!
          </AppButton>
        )}
        <div>You</div>
        <div
          style={{
            width: `${this.state.defenderWidth}%`,
            height: `10px`,
            border: `solid 1px black`,
            backgroundColor: `green`,
            borderRadius: `5px`,
          }}
        ></div>
        <div>Them</div>
        <div
          style={{
            width: `${this.state.challengerWidth}%`,
            height: `10px`,
            border: `solid 1px black`,
            backgroundColor: `green`,
            borderRadius: `5px`,
          }}
        ></div>
        {this.state.defenderFinished && this.state.challengerFinished && (
          <div>
            <p>
              Round {this.props.round} over, You had {this.props.defenderStat}{" "}
              and They had {this.props.challengerStat} in {this.props.statName}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default AnimatedRound;
