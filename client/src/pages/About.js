import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div>
        <p>
          <em>{this.props.title}</em> was developed in entirety by me. That
          said, there are various elements without which I could not have
          created the game. They are:
        </p>
        <ul>
          <li>
            Any and all intellectual property featured (i.e. the characters) is
            owned by its respective copyright holder. I do not pretend to own
            any right to the characters I am using. There is no advertising on
            my page, and I do not profit from the characters' usage in any way.
          </li>
          <li>
            The information and images for the characters are supplied by{" "}
            <a href={`https://superheroapi.com/`} target={`_blank`}>
              superheroapi.com
            </a>
            .
          </li>
          <li>
            The game play is very similar to the style of play of{" "}
            <a
              href={`https://en.wikipedia.org/wiki/Top_Trumps`}
              target={`_blank`}
            >
              Top Trumps
            </a>
            , which is the inspiration for this game.
          </li>
        </ul>
      </div>
    );
  }
}

export default About;
