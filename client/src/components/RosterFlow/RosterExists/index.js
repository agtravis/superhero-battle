import React, { Component } from "react";
// import AppButton from "../../AppButton";
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
    return (
      <div>
        <div
          style={{
            flex: 1,
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-around`,
          }}
        >
          <div
            style={{
              flex: 1,
              display: `flex`,
              justifyContent: `space-around`,
            }}
          >
            <div>
              <p
                style={{ cursor: `pointer` }}
                onClick={() => this.setRosterLocation(1)}
              >{`|<`}</p>
            </div>
            <div>
              <p
                style={{ cursor: `pointer` }}
                onClick={
                  this.state.startingIndex >= 10
                    ? () => this.changePage(`prev`)
                    : null
                }
              >{`<<`}</p>
            </div>
          </div>
          <div>
            <p>{`Page ${this.state.startingIndex / 10 + 1} / ${Math.ceil(
              this.props.roster.length / 10
            )}`}</p>
          </div>
          <div
            style={{
              flex: 1,
              display: `flex`,
              justifyContent: `space-around`,
            }}
          >
            <div>
              <p
                style={{ cursor: `pointer` }}
                onClick={
                  this.state.startingIndex + 10 <= this.props.roster.length - 1
                    ? () => this.changePage(`next`)
                    : null
                }
              >{`>>`}</p>
            </div>
            <div>
              <p
                style={{ cursor: `pointer` }}
                onClick={() => this.setRosterLocation(731)}
              >{`>|`}</p>
            </div>
          </div>
        </div>
        <div style={{ height: `500px`, overflow: `scroll` }}>
          {this.state.roster.map(
            (character, index) =>
              character && (
                <div key={index}>
                  <h2 style={{ textAlign: `center` }}>{index + 1}</h2>
                  <IndexPortrait character={character} showStats size={200} />
                  {this.state.roster[index + 1] &&
                    index < this.state.roster.length - 1 && <hr />}
                </div>
              )
          )}
        </div>
      </div>
    );
  }
}

export default RosterExists;
/*
        <div
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-around`,
          }}
        >
          <div>
            <AppButton
              width={`200px`}
              margin={`10px 0px`}
              onClick={
                this.state.startingIndex >= 10
                  ? () => this.changePage(`prev`)
                  : null
              }
            >
              Prev
            </AppButton>
          </div>
          <div>
            <p>
              Page {this.state.startingIndex / 10 + 1} /{" "}
              {Math.ceil(this.props.roster.length / 10)}
            </p>
          </div>
          <div>
            <AppButton
              width={`200px`}
              margin={`10px 0px`}
              onClick={
                this.state.startingIndex + 10 <= this.props.roster.length - 1
                  ? () => this.changePage(`next`)
                  : null
              }
            >
              Next
            </AppButton>
          </div>
        </div>*/
