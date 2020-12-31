import React, { Component } from "react";
import LeaderBoardTableCell from "../../LeaderBoardTableData";

class LeaderBoardDataRowMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      columnsLoaded: false,
    };
  }

  componentDidMount() {
    this.setThirdColumn(this.props.metric);
  }

  setThirdColumn = metric => {
    const columns = [
      { data: this.props.index + 1 },
      { data: this.props.user.username },
    ];
    switch (metric) {
      case `prestige`:
        columns.push({ data: this.props.user.prestige });
        break;
      case `battles`:
        columns.push({ data: this.props.user.fights });
        break;
      case `wins`:
        columns.push({ data: this.props.user.wins });
        break;
      case `losses`:
        columns.push({ data: this.props.user.losses });
        break;
      case `winPercentage`:
        columns.push({
          data: this.props.convertWinPercentage(
            this.props.user.wins,
            this.props.user.fights
          ),
        });
        break;
      case `rosterLength`:
        columns.push({ data: this.props.user.roster.length });
        break;
      default:
        columns.push({ data: this.props.user.prestige });
    }
    this.setState({ columns: columns, columnsLoaded: true });
  };

  componentDidUpdate(prevProps) {
    if (this.props.metric !== prevProps.metric) {
      this.setThirdColumn(this.props.metric);
    }
  }

  render() {
    return (
      <tr>
        {this.state.columnsLoaded &&
          this.state.columns.map((data, i) => (
            <LeaderBoardTableCell key={i} cellStyle={this.props.cellStyle}>
              {data.data}
            </LeaderBoardTableCell>
          ))}
      </tr>
    );
  }
}

export default LeaderBoardDataRowMobile;
