import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import RosterCard from "../RosterCard";

class RosterExists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      roster: [],
      startingIndex: 0,
    };
  }

  componentDidMount() {
    this.resetRoster();
  }

  componentDidUpdate(prevProps) {
    if (this.props.roster !== prevProps.roster) {
      this.resetRoster();
    }
  }

  resetRoster = () => {
    const roster = [];
    for (let i = 0; i < 10; ++i) {
      roster.push(this.props.roster[i]);
    }
    this.setState({ roster: roster });
  };

  styles = {
    mockLink: { cursor: `pointer` },
    paginationContainer: {
      display: `flex`,
      flex: 1,
      flexWrap: `wrap`,
      justifyContent: `space-around`,
    },
    paginationNavContainer: {
      display: `flex`,
      flex: 1,
      justifyContent: `space-around`,
    },
    rosterContainer: { height: `500px`, overflow: `scroll` },
  };

  changePage = direction => {
    const roster = [];
    const startingIndex =
      direction === `next`
        ? this.state.startingIndex + 10
        : this.state.startingIndex - 10;
    for (let i = startingIndex; i < startingIndex + 10; ++i) {
      if (this.props.roster[i]) {
        roster.push(this.props.roster[i]);
      }
    }
    this.setState({ roster: roster, startingIndex: startingIndex });
  };

  loadCharacter = character => this.setState({ character: character });

  setRosterLocation = slot => {
    if (slot > this.props.roster.length) {
      slot = this.props.roster.length;
    }
    let index = slot - 1;
    const roster = [];
    const startingIndex = Math.floor(index / 10) * 10;
    for (let i = startingIndex; i < startingIndex + 10; ++i) {
      if (this.props.roster[i]) {
        roster.push(this.props.roster[i]);
      }
    }
    this.setState({ roster: roster, startingIndex: startingIndex });
  };

  render() {
    if (this.state.character) {
      return (
        <Redirect
          to={{
            pathname: `/character`,
            state: {
              character: this.state.character,
            },
          }}
        />
      );
    }
    return (
      <div>
        <div style={this.styles.paginationContainer}>
          <div style={this.styles.paginationNavContainer}>
            <div>
              <p
                onClick={() => this.setRosterLocation(1)}
                style={this.styles.mockLink}
              >{`|<`}</p>
            </div>
            <div>
              <p
                onClick={
                  this.state.startingIndex >= 10
                    ? () => this.changePage(`prev`)
                    : null
                }
                style={this.styles.mockLink}
              >{`<<`}</p>
            </div>
          </div>
          <div>
            <p>{`Page ${this.state.startingIndex / 10 + 1} / ${Math.ceil(
              this.props.roster.length / 10
            )}`}</p>
          </div>
          <div style={this.styles.paginationNavContainer}>
            <div>
              <p
                onClick={
                  this.state.startingIndex + 10 <= this.props.roster.length - 1
                    ? () => this.changePage(`next`)
                    : null
                }
                style={this.styles.mockLink}
              >{`>>`}</p>
            </div>
            <div>
              <p
                onClick={() => this.setRosterLocation(731)}
                style={this.styles.mockLink}
              >{`>|`}</p>
            </div>
          </div>
        </div>
        <div style={this.styles.rosterContainer}>
          {this.state.roster.map(
            (character, index) =>
              character && (
                <RosterCard
                  character={character}
                  hr={index < this.state.roster.length - 1}
                  index={index + this.state.startingIndex}
                  key={index}
                  nextCharacter={this.state.roster[index + 1]}
                  onClick={this.loadCharacter}
                />
              )
          )}
        </div>
      </div>
    );
  }
}

export default RosterExists;
