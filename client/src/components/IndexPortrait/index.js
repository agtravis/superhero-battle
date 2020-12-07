import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import IndexPortraitStatsMobile from "../IndexPortraitStatsMobile";
import IndexPortraitStats from "../IndexPortraitStats";
import IndexPortraitImage from "../IndexPortraitImage";

class IndexPortrait extends Component {
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
                <IndexPortraitImage
                  size={this.props.size}
                  round={this.props.round}
                  character={this.props.character}
                  image={this.props.image}
                  name={this.props.name}
                />
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
                <IndexPortraitImage
                  size={this.props.size}
                  round={this.props.round}
                  character={this.props.character}
                  image={this.props.image}
                  name={this.props.name}
                />
              </div>
            </Breakpoint>
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
