import React, { Component } from "react";
import LoadingAnimation from "../../../LoadingAnimation";
import LeaderBoardDataRow from "../LeaderBoardDataRow";
import LeaderBoardHeaderRow from "../LeaderBoardHeaderRow";

class LeaderBoardTable extends Component {
  render() {
    return (
      <div>
        {!this.props.usersLoaded ? (
          <LoadingAnimation divHeight={400} size={150} />
        ) : (
          <table style={{ borderCollapse: `collapse`, marginTop: `20px` }}>
            <tbody>
              <LeaderBoardHeaderRow
                headerCells={this.props.headerCells}
                cellStyle={this.props.cellStyle}
              />
              {this.props.topTen
                ? this.props.topTen.map((user, index) => (
                    <LeaderBoardDataRow
                      key={index}
                      index={index}
                      user={user}
                      convertDate={this.props.convertDate}
                      convertWinPercentage={this.props.convertWinPercentage}
                      cellStyle={this.props.cellStyle}
                    />
                  ))
                : null}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default LeaderBoardTable;
