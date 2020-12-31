import React, { Component } from "react";
import LoadingAnimation from "../../../LoadingAnimation";
import Selector from "../../../Selector";
import LeaderBoardHeaderRow from "../../FullScreen/LeaderBoardHeaderRow";
import LeaderBoardDataRowMobile from "../LeaderBoardDataRowMobile";

class LeaderBoardTableMobile extends Component {
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
        <div
          style={{
            display: `flex`,
            justifyContent: `center`,
            marginTop: `5px`,
          }}
        >
          <Selector options={this.options} onChange={this.props.changeMetric} />
        </div>
        {!this.props.usersLoaded ? (
          <LoadingAnimation divHeight={400} size={150} />
        ) : (
          <div
            style={{
              marginTop: `20px`,
            }}
          >
            <table>
              <tbody>
                <LeaderBoardHeaderRow
                  headerCells={this.props.headerCells}
                  cellStyle={this.props.cellStyle}
                />
                {this.props.topTen.map((user, index) => (
                  <LeaderBoardDataRowMobile
                    metric={this.props.metric}
                    key={index}
                    index={index}
                    user={user}
                    convertDate={this.props.convertDate}
                    convertWinPercentage={this.props.convertWinPercentage}
                    cellStyle={this.props.cellStyle}
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
