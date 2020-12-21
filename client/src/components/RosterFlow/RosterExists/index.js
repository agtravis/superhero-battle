import React, { Component } from "react";
import AppButton from "../../AppButton";
import IndexPortrait from "../../IndexPortrait";

class RosterExists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: [],
      startingIndex: 0,
    };
  }

  componentDidMount() {
    const roster = [];
    for (let i = 0; i < 10; ++i) {
      roster.push(this.props.roster[i]);
    }
    this.setState({ roster: roster });
  }

  nextPage = () => {
    const roster = [];
    const startingIndex = this.state.startingIndex + 10;
    for (let i = startingIndex; i < startingIndex + 10; ++i) {
      if (this.props.roster[i]) {
        roster.push(this.props.roster[i]);
      }
    }
    this.setState({ roster: roster, startingIndex: startingIndex });
  };

  render() {
    return (
      <div>
        <div>
          <AppButton onClick={this.nextPage}>Next</AppButton>
        </div>
        <div style={{ height: `500px`, overflow: `scroll` }}>
          {this.state.roster.map((character, index) => (
            <div key={index}>
              <h2 style={{ textAlign: `center` }}>{index + 1}</h2>
              <IndexPortrait character={character} showStats size={200} />
              {index < this.state.roster.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RosterExists;
