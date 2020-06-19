import React, { Component } from "react";

class RoundOnePost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h3>Round {this.props.round} - Fight!</h3>
        {!this.props.fightOver ? (
          <button onClick={() => this.props.fight()}>Fight!</button>
        ) : null}
        <p>
          Enemy had {this.props.fightStat}: {this.props.attackingStat} and
          attacked with{` `}
          {this.props.fightOver ? (
            <>{this.props.attackRating.toFixed(2)}</>
          ) : null}
        </p>
        <p>
          You had {this.props.fightStat}: {this.props.defendingStat} and
          defended with{` `}
          {this.props.fightOver ? (
            <>{this.props.defendRating.toFixed(2)} </>
          ) : null}
        </p>
        {this.props.winner ? (
          <>
            <p>The winner of this round is: {this.props.winner}</p>
            <button onClick={() => this.props.nextRound()}>Continue!</button>
          </>
        ) : null}
      </div>
    );
  }
}

export default RoundOnePost;
