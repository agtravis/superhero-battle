import React, { Component } from "react";

class RosterSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageValid: true,
    };
  }

  noImage = () => {
    this.setState({ imageValid: false });
  };

  render() {
    return (
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-evenly`,
          paddingBottom: `10px`,
          marginBottom: `10px`,
          borderBottom: `1px dashed black`,
        }}
      >
        <h3>
          {this.props.index !== undefined ? `${this.props.index + 1}. ` : null}
          {this.props.character.name}
        </h3>
        {this.props.character.image.url && this.state.imageValid ? (
          <img
            src={this.props.character.image.url}
            alt={this.props.character.name}
            style={{ width: `100px`, marginLeft: `5px` }}
            onError={() => this.noImage()}
          />
        ) : (
          <p>No Image on File!</p>
        )}
        <div style={{ marginRight: `10px` }}>
          <ul>
            <li>
              Combat:{" "}
              {this.props.character.powerstats.combat !== `null`
                ? this.props.character.powerstats.combat
                : `Unknown`}
            </li>
            <li>
              Durability:{" "}
              {this.props.character.powerstats.durability !== `null`
                ? this.props.character.powerstats.durability
                : `Unknown`}
            </li>
            <li>
              Intelligence:{" "}
              {this.props.character.powerstats.intelligence !== `null`
                ? this.props.character.powerstats.intelligence
                : `Unknown`}
            </li>
            <li>
              Power:{" "}
              {this.props.character.powerstats.power !== `null`
                ? this.props.character.powerstats.power
                : `Unknown`}
            </li>
            <li>
              Speed:{" "}
              {this.props.character.powerstats.speed !== `null`
                ? this.props.character.powerstats.speed
                : `Unknown`}
            </li>
            <li>
              Strength:{" "}
              {this.props.character.powerstats.strength !== `null`
                ? this.props.character.powerstats.strength
                : `Unknown`}
            </li>
          </ul>
        </div>
        {/* {this.props.index !== 0 ? (
          <button
            onClick={() =>
              this.props.removeFromRoster(this.props.character._id)
            }
          >
            Remove from Roster
          </button>
        ) : null} */}
      </div>
    );
  }
}

export default RosterSlot;
