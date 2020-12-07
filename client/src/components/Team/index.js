import React, { Component } from "react";
import IndexPortrait from "../IndexPortrait";
import IndexPortraitSmall from "../IndexPortraitSmall";

class Team extends Component {
  render() {
    return (
      <div>
        <IndexPortrait character={this.props.team[0]} size={150} />
        <div
          style={{
            display: `flex`,
            justifyContent: `space-between`,
            marginTop: `-35px`,
          }}
        >
          <div>
            {this.props.team[1] && (
              <IndexPortraitSmall
                left
                src={this.props.team[1].image.url}
                name={this.props.team[1].name}
              />
            )}
          </div>
          <div>
            {this.props.team[2] && (
              <IndexPortraitSmall
                right
                src={this.props.team[2].image.url}
                name={this.props.team[2].name}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
