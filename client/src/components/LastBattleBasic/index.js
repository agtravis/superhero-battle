import React, { Component } from "react";

import LastBattleCard from "../LastBattleCard";

class LastBattleBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h2>Your most recent battle:</h2>
        <LastBattleCard
          battle={this.props.battles[this.props.battles.length - 1]}
        />
      </div>
    );
  }
}

export default LastBattleBasic;
