import React, { Component } from "react";
import LeaderBoardDataRow from "../LeaderBoardDataRow";
import LeaderBoardHeaderRow from "../LeaderBoardHeaderRow";

class LeaderBoardTable extends Component {
  headerCells = [
    {
      onClick: this.props.getTopScorers,
      title: `Ranking`,
      params: [],
    },
    {
      onClick: this.props.findAll,
      title: `Username`,
      params: [`username`],
    },
    // {
    //   onClick: this.props.sortByPropertyName,
    //   title: `Fighting Since`,
    //   params: [`registered`, `asc`],
    // },
    {
      onClick: this.props.sortByPropertyName,
      title: `Battles`,
      params: [`fights`, `desc`],
    },
    {
      onClick: this.props.sortByPropertyName,
      title: `Ranking`,
      params: [`wins`, `desc`],
    },
    {
      onClick: this.props.sortByPropertyName,
      title: `Losses`,
      params: [`losses`, `desc`],
    },
    {
      onClick: this.props.findAll,
      title: `Win Percentage`,
      params: [`percentage`],
    },
    {
      onClick: this.props.sortByPropertyName,
      title: `Prestige Level`,
      params: [`prestige`, `desc`],
    },
    {
      onClick: this.props.findAll,
      title: `Currently in Roster`,
      params: [`roster`],
    },
  ];

  render() {
    return (
      <table style={{ borderCollapse: `collapse`, marginTop: `20px` }}>
        <tbody>
          <LeaderBoardHeaderRow
            headerCells={this.headerCells}
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
    );
  }
}

export default LeaderBoardTable;
