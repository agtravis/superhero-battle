import React, { Component } from "react";
import "./style.css";

class LeaderBoardHeaderCell extends Component {
  render() {
    return (
      <th
        className={`header-cell`}
        style={{
          ...this.props.cellStyle,
          cursor: `pointer`,
          height: `100px`,
        }}
        onClick={
          this.props.onClick
            ? () => this.props.onClick(...this.props.params)
            : null
        }
      >
        <div
          style={{
            transform: `rotate(-70deg)`,
            fontSize: `.7rem`,
          }}
        >
          {this.props.title}
        </div>
      </th>
    );
  }
}

export default LeaderBoardHeaderCell;
