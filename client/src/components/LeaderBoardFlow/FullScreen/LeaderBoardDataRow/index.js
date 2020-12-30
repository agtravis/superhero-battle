import React, { Component } from "react";
import LeaderBoardTableCell from "../../LeaderBoardTableData";

class LeaderBoardDataRow extends Component {
  rowData = [
    { data: this.props.index + 1 },
    { data: this.props.user.username },
    // { data: this.props.convertDate(this.props.user.registered) },
    { data: this.props.user.fights },
    { data: this.props.user.wins },
    { data: this.props.user.losses },
    {
      data: this.props.convertWinPercentage(
        this.props.user.wins,
        this.props.user.fights
      ),
    },
    { data: this.props.user.prestige },
    { data: this.props.user.roster.length },
  ];

  render() {
    return (
      <tr>
        {this.rowData.map((data, i) => (
          <LeaderBoardTableCell key={i} cellStyle={this.props.cellStyle}>
            {data.data}
          </LeaderBoardTableCell>
        ))}
      </tr>
    );
  }
}

export default LeaderBoardDataRow;
