import React, { Component } from "react";
import colors from "../../config/colors";

class IndexPortraitImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageValid: true,
    };
  }

  noImage = () => {
    this.setState({ imageValid: false });
  };

  styles = {
    container: {
      display: `flex`,
      justifyContent: `center`,
      position: `relative`,
    },
    image: {
      borderRadius: this.props.round
        ? `${this.props.size ? this.props.size / 2 : 150}px`
        : `0px`,
      height: this.props.size ? `${this.props.size}px` : `300px`,
      objectFit: this.props.size ? `scale-down` : `none`,
      objectPosition: `center top`,
      width: this.props.size ? `${this.props.size}px` : `300px`,
    },
    noImageDiv: {
      backgroundColor: colors.mediumPrimary,
      border: `1px solid ${colors.darkSecondary}`,
      borderRadius: this.props.round
        ? `${this.props.size ? this.props.size / 2 : 150}px`
        : `0px`,
      display: `flex`,
      height: this.props.size ? `${this.props.size}px` : `300px`,
      justifyContent: `center`,
      width: this.props.size ? `${this.props.size}px` : `300px`,
    },
    noImageText: {
      marginBottom: `0px`,
      fontSize: `.7rem`,
    },
    noImageTextContainer: {
      backgroundColor: colors.extraLightPrimary,
      border: `1px solid ${colors.darkSecondary}`,
      borderRadius: `500px`,
      height: `26px`,
      marginTop: `25%`,
      padding: `3px`,
    },
    textContainer: {
      alignItems: `center`,
      border: `1px solid ${colors.darkSecondary}`,
      borderRadius: `500px`,
      display: `flex`,
      height: `50px`,
      justifyContent: `center`,
      padding: `5px`,
      position: `absolute`,
      top: `${this.props.size ? this.props.size / 2 : 150}px`,
      width: `200px`,
    },
    textContainerBackground: {
      backgroundColor: colors.white,
      opacity: `0.4`,
    },
    textContainerText: {
      fontWeight: `900`,
      marginBottom: `0`,
    },
  };

  render() {
    return (
      <div>
        {this.state.imageValid ? (
          <div style={this.styles.container}>
            <div>
              <img
                src={
                  this.props.character
                    ? this.props.character.image.url
                    : this.props.image
                }
                alt={
                  this.props.character
                    ? this.props.character.name
                    : this.props.name
                }
                onError={() => this.noImage()}
                style={this.styles.image}
              />
            </div>
            <div
              style={{
                ...this.styles.textContainer,
                ...this.styles.textContainerBackground,
              }}
            ></div>
            <div style={this.styles.textContainer}>
              <p style={this.styles.textContainerText}>
                {this.props.character
                  ? this.props.character.name
                  : this.props.name}
              </p>
            </div>
          </div>
        ) : (
          <div style={this.styles.container}>
            <div style={this.styles.noImageDiv}>
              <div style={this.styles.noImageTextContainer}>
                <p style={this.styles.noImageText}>No image on file!</p>
              </div>
            </div>
            <div
              style={{
                ...this.styles.textContainer,
                backgroundColor: colors.extraLightPrimary,
              }}
            >
              <p style={this.styles.textContainerText}>
                {this.props.character
                  ? this.props.character.name
                  : this.props.name}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default IndexPortraitImage;
