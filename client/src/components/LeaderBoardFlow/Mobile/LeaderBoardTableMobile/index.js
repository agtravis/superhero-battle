import React, { Component } from "react";
import LoadingAnimation from "../../../LoadingAnimation";
import LeaderBoardHeaderRow from "../../FullScreen/LeaderBoardHeaderRow";
import LeaderBoardDataRowMobile from "../LeaderBoardDataRowMobile";

class LeaderBoardTableMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerColumns: [],
      columnsLoaded: false,
      sortValue: `prestige`,
    };
  }

  render() {
    return (
      <div>
        <select
          onChange={event => this.props.changeMetric(event.target.value)}
          name={`metrics`}
          id={`metrics-selector`}
        >
          <option value={`none`}>Choose a Metric</option>
          <option value={`ranking`}>Ranking</option>
          <option value={`username`}>Username</option>
          <option value={`battles`}>Battles</option>
          <option value={`wins`}>Wins</option>
          <option value={`losses`}>Losses</option>
          <option value={`winPercentage`}>Win Percentage</option>
          <option value={`prestige`}>Prestige Level</option>
          <option value={`rosterLength`}>Currently In Roster</option>
        </select>
        {!this.props.usersLoaded ? (
          <LoadingAnimation divHeight={400} size={150} />
        ) : (
          <table>
            <tbody>
              <LeaderBoardHeaderRow
                headerCells={this.props.headerCells}
                cellStyle={this.props.cellStyle}
              />

              {this.props.topTen
                ? this.props.topTen.map((user, index) => (
                    <LeaderBoardDataRowMobile
                      metric={this.props.metric}
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

export default LeaderBoardTableMobile;
