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
              key={index}
              cellStyle={this.props.cellStyle}
              onClick={current.onClick}
              title={current.title}
              params={current.params}
            />
          ))}
      </tr>
    );
  }
}

export default LeaderBoardHeaderRow;
