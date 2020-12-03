import React, { Component } from "react";
import IndexPortrait from "../components/IndexPortrait";
import Rules from "../components/Rules";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // imageName: ``,
      // imagePath: `1`,
    };
  }

  // handleChange = (event, stateKey) => {
  //   this.setState({ [stateKey]: event.target.value });
  // };

  // handleClick = () => {
  //   this.setState({ imagePath: this.state.imageName });
  //   this.setState({ imageName: `` });
  // };

  render() {
    return (
      <div>
        <h1>
          Welcome
          {this.props.loggedIn ? ` ${this.props.currentUser.username}` : null}!
        </h1>
        {this.props.loggedIn ? (
          <div>
            <div style={{ display: `flex`, justifyContent: `space-between` }}>
              {this.props.captain ? (
                <IndexPortrait
                  title={`Captain`}
                  image={this.props.captain.image.url}
                  name={this.props.captain.name}
                />
              ) : null}
              {this.props.recruit ? (
                <IndexPortrait
                  title={`Latest Recruit`}
                  image={this.props.recruit.image.url}
                  name={this.props.recruit.name}
                />
              ) : (
                <IndexPortrait title={false} />
              )}
            </div>
          </div>
        ) : (
          <div>
            <p>
              {this.props.title} is a game in which you can face off all your
              favorite heroes and villains against eachother!
            </p>
            <p>
              There are 731 characters from all sides, and all franchises. You
              can fight solo, or you can form a team and go all in: the greater
              the risk, the greater the reward. Recruit allies and defeat foes,
              and try to get everyone on your side!
            </p>
            <Rules />
          </div>
        )}
      </div>
    );
  }
}

export default Index;
