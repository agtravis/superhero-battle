import React, { Component } from "react";

class RosterSelectionSlot extends Component {
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
        onClick={() => this.props.getContender(this.props.character._id)}
        style={{
          cursor: `pointer`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          justifyContent: `space-evenly`,
          paddingBottom: `5px`,
          marginBottom: `5px`,
          borderBottom: `1px dashed black`,
        }}
      >
        <h3>
          {this.props.index + 1}. {this.props.character.name}
        </h3>
        <div style={{ display: `flex` }}>
          {this.state.imageValid ? (
            <img
              src={this.props.character.image.url}
              alt={this.props.character.name}
              style={{ height: `150px`, marginLeft: `2px` }}
              onError={() => this.noImage()}
            />
          ) : (
            <p>No Image on File!</p>
          )}
          <div style={{ marginRight: `2px` }}>
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
        </div>
      </div>
    );
  }
}

export default RosterSelectionSlot;
