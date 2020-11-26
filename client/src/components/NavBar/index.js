import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import { Link } from "react-router-dom";

import colors from "../../config/colors";

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

  hideNav = () => {
    const navMobile = document.getElementsByClassName(`nav-mobile`)[0];
    if (navMobile.classList.contains(`translateNavMobile`)) {
      navMobile.classList.add(`translateNavMobileBack`);
      navMobile.classList.remove(`translateNavMobile`);
    }
  };

  render() {
    return (
      <div style={{}}>
        {this.props.loggedIn ? (
          <div onClick={this.hideNav}>
            <Breakpoint medium up>
              <div
                style={{
                  display: `flex`,
                  flexDirection: `row`,
                }}
              >
                {this.pageLinks.map((pageLink, index) => (
                  <div key={index} style={{ margin: `0 5px` }}>
                    <Link to={pageLink.to}>{pageLink.name}</Link>
                  </div>
                ))}
              </div>
            </Breakpoint>
            <Breakpoint small down>
              <div style={{ position: `relative` }}>
                <div
                  className={`nav-mobile`}
                  style={{
                    backgroundColor: colors.mediumGrey,
                    display: `flex`,
                    flexDirection: `column`,
                    position: `absolute`,
                    left: `0`,
                    height: `auto`,
                    width: window.innerWidth,
                  }}
                >
                  {this.pageLinks.map((pageLink, index) => (
                    <div key={index} style={{ margin: `5px 0` }}>
                      <Link to={pageLink.to}>{pageLink.name}</Link>
                    </div>
                  ))}
                </div>
              </div>
            </Breakpoint>
          </div>
        ) : (
          <div>
            <Breakpoint medium up>
              <Link to={`/about`}>About SuperHero Battle</Link>
            </Breakpoint>

            <Breakpoint small down>
              <Link to={`/about`}>About SuperHero Battle</Link>
            </Breakpoint>
          </div>
        )}
      </div>
    );
  }
}

export default NavBar;
