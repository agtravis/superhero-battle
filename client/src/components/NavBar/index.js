import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pageLinks = [
    {
      name: `Home`,
      to: `/home`,
    },
    {
      name: `Profile`,
      to: `/profile`,
    },
    {
      name: `Fight`,
      to: `/fight`,
    },
    {
      name: `Stats`,
      to: `/stats`,
    },
    {
      name: `Roster`,
      to: `/roster`,
    },
    {
      name: `Teams`,
      to: `/teams`,
    },
    {
      name: `Leader Board`,
      to: `/leaderboard`,
    },
    {
      name: `Search`,
      to: `/search`,
    },
    {
      name: `Settings`,
      to: `/settings`,
    },
  ];

  render() {
    return (
      <div style={{}}>
        {this.props.loggedIn ? (
          <div>
            <Breakpoint medium up>
              <div style={{ display: `flex`, flexDirection: `row` }}>
                {this.pageLinks.map((pageLink, index) => (
                  <div key={index} style={{ margin: `0 5px` }}>
                    <Link to={pageLink.to}>{pageLink.name}</Link>
                  </div>
                ))}
              </div>
            </Breakpoint>
            <Breakpoint small down>
              <div style={{ display: `flex`, flexDirection: `column` }}>
                {this.pageLinks.map((pageLink, index) => (
                  <div key={index} style={{ margin: `5px 0` }}>
                    <Link to={pageLink.to}>{pageLink.name}</Link>
                  </div>
                ))}
              </div>
            </Breakpoint>
          </div>
        ) : (
          <div>
            <Breakpoint medium up>
              <Link to={`/about`}>About SuperHero Battle</Link>
            </Breakpoint>

            <Breakpoint small down></Breakpoint>
          </div>
        )}
      </div>
    );
  }
}

export default NavBar;
