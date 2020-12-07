import React, { Component } from "react";

class Stat extends Component {
  styles = {
    stat: {
      fontWeight: `900`,
    },
  };
  render() {
    return (
      <div>
        {this.props.left && (
          <div>
            <p>
              {this.props.statTitle}:{` `}
              <span style={this.styles.stat}>
                {this.props.statRating !== `null`
                  ? this.props.statRating
                  : `Unknown`}
              </span>
            </p>
          </div>
        )}
        {this.props.right && (
          <div>
            <p>
              <span style={this.styles.stat}>
                {this.props.statRating !== `null`
                  ? this.props.statRating
                  : `Unknown`}
              </span>
              {` `}:{this.props.statTitle}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Stat;
