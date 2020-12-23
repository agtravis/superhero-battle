import React, { Component } from "react";
import PageTitle from "../components/PageTitle";
import colors from "../config/colors";

class About extends Component {
  styles = {
    links: {
      color: colors.darkSecondary,
      fontWeight: `900`,
    },
  };
  render() {
    return (
      <div>
        <PageTitle>
          About <em>Superhero Battle</em>
        </PageTitle>
        <p>
          <em>{this.props.title}</em> was written and developed in entirety by
          myself. That said, there are various elements without which I could
          not have created this game:
        </p>
        <ul>
          <li>
            Any and all intellectual property featured (i.e. the characters) is
            owned by its respective copyright holder. I do not pretend to own
            any rights to the characters I am using. There is no advertising on
            my page, and I do not profit from the characters' usage in any way.
          </li>
          <li>
            The information and images for the characters are supplied by{" "}
            <a
              style={this.styles.links}
              href={`https://superheroapi.com/`}
              target={`_blank`}
            >
              superheroapi.com
            </a>
            .
          </li>
          <li>
            The game play is very similar to the style of play of{" "}
            <a
              style={this.styles.links}
              href={`https://en.wikipedia.org/wiki/Top_Trumps`}
              target={`_blank`}
            >
              Top Trumps
            </a>
            , which is the inspiration for this game.
          </li>
          <li>
            Get in touch with me through my{` `}
            <a
              style={this.styles.links}
              href={`https://agtravis.github.io/portfolio/`}
              target={`_blank`}
            >
              website
            </a>
            .
          </li>
        </ul>
      </div>
    );
  }
}

export default About;
