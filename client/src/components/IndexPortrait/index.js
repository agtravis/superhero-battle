import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import colors from "../../config/colors";
import IndexPortraitStatsMobile from "../IndexPortraitStatsMobile";
import IndexPortraitStats from "../IndexPortraitStats";

class IndexPortrait extends Component {
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
    image: {
      objectFit: this.props.size ? `scale-down` : `none`,
      objectPosition: `center top`,
      width: this.props.size ? `${this.props.size}px` : `300px`,
      height: this.props.size ? `${this.props.size}px` : `300px`,
      borderRadius: this.props.round
        ? `${this.props.size ? this.props.size / 2 : 150}px`
        : `0px`,
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
    textContainerText: { marginBottom: `0`, fontWeight: `900` },
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <Breakpoint medium up>
              <div
                style={{
                  display: `flex`,
                  justifyContent: `space-around`,
                  alignItems: `center`,
                }}
              >
                {this.state.imageValid ? (
                  <div
                    style={{
                      position: `relative`,
                      display: `flex`,
                      justifyContent: `center`,
                    }}
                  >
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
                  <p>No image on file!</p>
                )}
                {this.props.showStats && (
                  <div>
                    <IndexPortraitStats character={this.props.character} />
                  </div>
                )}
              </div>
            </Breakpoint>
            <Breakpoint small down>
              <div
                style={{
                  display: `flex`,
                  justifyContent: `space-around`,
                  alignItems: `center`,
                }}
              >
                {this.state.imageValid ? (
                  <div
                    style={{
                      position: `relative`,
                      display: `flex`,
                      justifyContent: `center`,
                    }}
                  >
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
                  <p>No image on file!</p>
                )}
              </div>
            </Breakpoint>
            {/** */}
            {this.props.showStats && (
              <Breakpoint small down>
                <IndexPortraitStatsMobile character={this.props.character} />
              </Breakpoint>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default IndexPortrait;
