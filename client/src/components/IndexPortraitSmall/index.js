import React, { Component } from "react";
import colors from "../../config/colors";

class IndexPortraitSmall extends Component {
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
      alignItems: `center`,
      display: `flex`,
      flexDirection: this.props.left ? `row` : `row-reverse`,
      margin: `10px 0`,
      position: `relative`,
      textAlign: `center`,
    },
    image: {
      borderRadius: `10px`,
      height: `100px`,
      objectFit: `cover`,
      objectPosition: `center top`,
      width: `70px`,
    },
    textContainer: {
      backgroundColor: colors.white,
      border: `1px solid ${colors.secondary}`,
      borderRadius: `50px`,
      fontSize: `0.7rem`,
      marginLeft: this.props.left ? `50px` : `0px`,
      marginRight: this.props.right ? `50px` : `0px`,
      padding: `2px`,
      position: `absolute`,
      width: `100px`,
    },
    textContainerText: {
      marginBottom: `0px`,
    },
    noImageDiv: {
      backgroundColor: colors.mediumPrimary,
      border: `1px solid ${colors.darkSecondary}`,
      borderRadius: `10px`,
      display: `flex`,
      height: `100px`,
      justifyContent: this.props.right ? `flex-end` : `flex-start`,
      width: `70px`,
    },
    noImageTextContainer: {
      backgroundColor: colors.extraLightPrimary,
      border: `1px solid ${colors.darkSecondary}`,
      borderRadius: `500px`,
      height: `30px`,
      marginLeft: this.props.left ? `3.5px` : `0px`,
      marginRight: this.props.right ? `3.5px` : `0px`,
      marginTop: `15%`,
      padding: `3px`,
      width: `75%`,
    },
    noImageText: {
      fontSize: `.5rem`,
      marginBottom: `0px`,
    },
  };

  render() {
    return (
      <div style={this.styles.container}>
        <div>
          {this.state.imageValid ? (
            <img
              alt={this.props.name}
              onError={() => this.noImage()}
              src={this.props.src}
              style={this.styles.image}
            />
          ) : (
            <div style={this.styles.noImageDiv}>
              <div style={this.styles.noImageTextContainer}>
                <p style={this.styles.noImageText}>No image on file!</p>
              </div>
            </div>
          )}
        </div>
        <div style={this.styles.textContainer}>
          <p style={this.styles.textContainerText}>{this.props.name}</p>
        </div>
      </div>
    );
  }
}

export default IndexPortraitSmall;
