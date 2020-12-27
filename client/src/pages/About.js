import React, { Component } from "react";
import colors from "../config/colors";
import PageTitle from "../components/PageTitle";

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
              href={`https://superheroapi.com/`}
              style={this.styles.links}
              target={`_blank`}
            >
              superheroapi.com
            </a>
            .
          </li>
          <li>
            The game play is very similar to the style of play of{" "}
            <a
              href={`https://en.wikipedia.org/wiki/Top_Trumps`}
              style={this.styles.links}
              target={`_blank`}
            >
              Top Trumps
            </a>
            , which is the inspiration for this game.
          </li>
          <li>
            Get in touch with me through my{` `}
            <a
              href={`https://agtravis.github.io/portfolio/`}
              style={this.styles.links}
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
