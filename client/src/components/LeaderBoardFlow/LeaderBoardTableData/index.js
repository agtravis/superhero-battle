import React, { Component } from "react";

class LeaderBoardTableCell extends Component {
  render() {
    return (
      <td
        style={{
          ...this.props.cellStyle,
          fontSize: `.7rem`,
          textOverflow: `ellipsis`,
          maxWidth: `25px`,
          overflow: `hidden`,
          whiteSpace: `nowrap`,
        }}
      >
        {this.props.children}
      </td>
    );
  }
}

export default LeaderBoardTableCell;
