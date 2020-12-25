import React, { Component } from "react";
import IndexPortrait from "../../IndexPortrait";

class RosterCard extends Component {
  styles = {
    header: { textAlign: `center` },
  };

  render() {
    return (
      <div>
        <h2 style={this.styles.header}>{this.props.index + 1}</h2>
        <IndexPortrait character={this.props.character} showStats size={200} />
        {this.props.nextCharacter && this.props.hr && <hr />}
      </div>
    );
  }
}

export default RosterCard;
