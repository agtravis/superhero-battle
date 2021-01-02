import React, { Component } from "react";
import "./style.css";

class LeaderBoardHeaderCell extends Component {
  styles = {
    headerCell: {
      cursor: `pointer`,
      height: `100px`,
    },
    headerCellContent: {
      fontSize: `.7rem`,
      transform: `rotate(-70deg)`,
    },
  };

  render() {
    return (
      <th
        className={`header-cell`}
        onClick={
          this.props.onClick
            ? () => this.props.onClick(...this.props.params)
            : null
        }
        style={{
          ...this.props.cellStyle,
          ...this.styles.headerCell,
        }}
      >
        <div style={this.styles.headerCellContent}>{this.props.title}</div>
      </th>
    );
  }
}

export default LeaderBoardHeaderCell;
