import React, { Component } from "react";
import LeaderBoardHeaderCell from "../../LeaderBoardHeaderCell";

class LeaderBoardHeaderRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerCells: [],
    };
  }

  componentDidMount() {
    this.setState({ headerCells: this.props.headerCells });
  }

  componentDidUpdate(prevProps) {
    if (this.props.headerCells !== prevProps.headerCells) {
      this.setState({ headerCells: this.props.headerCells });
    }
  }

  render() {
    return (
      <tr>
        {this.state.headerCells &&
          this.state.headerCells.map((current, index) => (
            <LeaderBoardHeaderCell
              cellStyle={this.props.cellStyle}
              key={index}
              onClick={current.onClick}
              params={current.params}
              title={current.title}
            />
          ))}
      </tr>
    );
  }
}

export default LeaderBoardHeaderRow;
