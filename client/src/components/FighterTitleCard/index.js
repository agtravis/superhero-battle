import React, { Component } from "react";

class FighterTitleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageValid: true,
    };
  }

  cardHeader = {
    textAlign: `center`,
  };

  imageContainer = {
    display: `flex`,
    justifyContent: `center`,
  };

  contenderImageStyle = {
    display: this.props.display || `block`,
    maxWidth: `250px`,
    maxHeight: `400px`,
    width: `auto`,
    height: `auto`,
  };

  noImage = () => {
    this.setState({ imageValid: false });
  };

  render() {
    return (
      <div>
        <div style={this.cardHeader}>
          <p>{this.props.title}</p>
          <h3>{this.props.character.name}</h3>
        </div>
        <div style={this.imageContainer}>
          {this.props.character.image.url && this.state.imageValid ? (
            <img
              src={this.props.character.image.url}
              alt={this.props.character.name}
              style={this.contenderImageStyle}
              onError={() => this.noImage()}
            />
          ) : (
            <p>No Image on File!</p>
          )}
        </div>
      </div>
    );
  }
}

export default FighterTitleCard;
