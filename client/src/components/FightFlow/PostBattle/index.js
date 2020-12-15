import React, { Component } from "react";
import { Link } from "react-router-dom";

class PostBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <p>{this.props.winner}</p>
        <div
        // onClick={() => this.props.reset()}
        >
          {this.props.winner !== `Challenger` ? (
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
              Fight again with the same line up!
            </Link>
          ) : (
            <Link
              to={{
                pathname: "/",
                type: `refresh`,
              }}
            >
              Don't fight again
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default PostBattle;
