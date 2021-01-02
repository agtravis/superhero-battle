import React, { Component } from "react";

class LeaderBoardTableCell extends Component {
  styles = {
    dataCell: {
      fontSize: `.7rem`,
      maxWidth: `25px`,
      overflow: `hidden`,
      textOverflow: `ellipsis`,
      whiteSpace: `nowrap`,
    },
  };

  render() {
    return (
      <td
        style={{
          ...this.props.cellStyle,
          ...this.styles.dataCell,
        }}
      >
        {this.props.children}
      </td>
    );
  }
}

export default LeaderBoardTableCell;
