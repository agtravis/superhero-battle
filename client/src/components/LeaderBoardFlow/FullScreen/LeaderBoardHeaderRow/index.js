import React, { Component } from "react";
import LeaderBoardHeaderCell from "../../LeaderBoardHeaderCell";

class LeaderBoardHeaderRow extends Component {
  render() {
    return (
      <tr>
        {this.props.headerCells.map((current, index) => (
          <LeaderBoardHeaderCell
            key={index}
            cellStyle={this.props.cellStyle}
            onClick={current.onClick}
            title={current.title}
            params={current.params}
          />
        ))}
      </tr>
    );
  }
}

export default LeaderBoardHeaderRow;
