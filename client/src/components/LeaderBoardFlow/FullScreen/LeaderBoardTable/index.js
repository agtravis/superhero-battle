import React, { Component } from "react";
import LeaderBoardDataRow from "../LeaderBoardDataRow";
import LeaderBoardHeaderRow from "../LeaderBoardHeaderRow";
import LoadingAnimation from "../../../LoadingAnimation";

class LeaderBoardTable extends Component {
  styles = {
    table: { borderCollapse: `collapse`, marginTop: `20px` },
  };

  render() {
    return (
      <div>
        {!this.props.usersLoaded ? (
          <LoadingAnimation divHeight={400} size={150} />
        ) : (
          <table style={this.styles.table}>
            <tbody>
              <LeaderBoardHeaderRow
                cellStyle={this.props.cellStyle}
                headerCells={this.props.headerCells}
              />
              {this.props.topTen &&
                this.props.topTen.map((user, index) => (
                  <LeaderBoardDataRow
                    onClick={this.props.onClick}
                    cellStyle={this.props.cellStyle}
                    convertDate={this.props.convertDate}
                    convertWinPercentage={this.props.convertWinPercentage}
                    index={index}
                    key={index}
                    user={user}
                  />
                ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default LeaderBoardTable;
