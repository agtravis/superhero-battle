import React, { Component } from "react";

import LastBattleBasic from "../components/LastBattleBasic";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <div>
          {this.props.battles.length > 0 ? (
            <div>
              <h1>Last Battle:</h1>
              <LastBattleBasic battles={this.props.battles} />
            </div>
          ) : (
            <div>
              <h1>You have not fought any battles!</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
