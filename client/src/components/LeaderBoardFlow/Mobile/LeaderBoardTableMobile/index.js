import React, { Component } from "react";
import LeaderBoardDataRowMobile from "../LeaderBoardDataRowMobile";
import LeaderBoardHeaderRow from "../../FullScreen/LeaderBoardHeaderRow";
import LoadingAnimation from "../../../LoadingAnimation";
import Selector from "../../../Selector";

class LeaderBoardTableMobile extends Component {
  styles = {
    selectorContainer: {
      display: `flex`,
      justifyContent: `center`,
      marginTop: `5px`,
    },
    tableContainer: { marginTop: `20px` },
  };

  options = [
    { value: `none`, title: `Choose a Metric` },
    { value: `ranking`, title: `Ranking` },
    { value: `username`, title: `Username` },
    { value: `battles`, title: `Battles` },
    { value: `wins`, title: `Wins` },
    { value: `losses`, title: `Losses` },
    { value: `winPercentage`, title: `Win Percentage` },
    { value: `prestige`, title: `Prestige Level` },
    { value: `rosterLength`, title: `Currently In Roster` },
  ];

  render() {
    return (
      <div>
        <div style={this.styles.selectorContainer}>
          <Selector options={this.options} onChange={this.props.changeMetric} />
        </div>
        {!this.props.usersLoaded ? (
          <LoadingAnimation divHeight={400} size={150} />
        ) : (
          <div style={this.styles.tableContainer}>
            <table>
              <tbody>
                <LeaderBoardHeaderRow
                  cellStyle={this.props.cellStyle}
                  headerCells={this.props.headerCells}
                />
                {this.props.topTen.map((user, index) => (
                  <LeaderBoardDataRowMobile
                    cellStyle={this.props.cellStyle}
                    convertDate={this.props.convertDate}
                    convertWinPercentage={this.props.convertWinPercentage}
                    index={index}
                    key={index}
                    metric={this.props.metric}
                    user={user}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default LeaderBoardTableMobile;
