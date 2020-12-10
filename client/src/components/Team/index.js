import React, { Component } from "react";
import AppButton from "../AppButton";
import IndexPortrait from "../IndexPortrait";
import IndexPortraitSmall from "../IndexPortraitSmall";

class Team extends Component {
  render() {
    return (
      <div>
        {this.props.team[0] ? (
          <div>
            <IndexPortrait character={this.props.team[0]} size={150} />

            {this.props.onClickRemove && (
              <div style={{ display: `flex`, justifyContent: `center` }}>
                <AppButton
                  margin={`10px 0`}
                  width={`200px`}
                  onClick={() =>
                    this.props.onClickRemove(this.props.team[0]._id)
                  }
                >
                  Remove
                </AppButton>
              </div>
            )}
          </div>
        ) : this.props.onClickAdd ? (
          <div>
            <p>add</p>
          </div>
        ) : null}
        <div
          style={{
            display: `flex`,
            justifyContent: `space-between`,
            marginTop: `-35px`,
          }}
        >
          <div>
            {this.props.team[1] && (
              <div>
                <IndexPortraitSmall
                  left
                  src={this.props.team[1].image.url}
                  name={this.props.team[1].name}
                />
                {this.props.onClickRemove && (
                  <div>
                    <AppButton
                      margin={`10px 0`}
                      width={`100px`}
                      onClick={() =>
                        this.props.onClickRemove(this.props.team[1]._id)
                      }
                    >
                      Remove
                    </AppButton>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            {this.props.team[2] && (
              <div>
                <IndexPortraitSmall
                  right
                  src={this.props.team[2].image.url}
                  name={this.props.team[2].name}
                />
                {this.props.onClickRemove && (
                  <div>
                    <AppButton
                      margin={`10px 0`}
                      width={`100px`}
                      onClick={() =>
                        this.props.onClickRemove(this.props.team[2]._id)
                      }
                    >
                      Remove
                    </AppButton>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
