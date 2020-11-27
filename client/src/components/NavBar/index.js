import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import { Link } from "react-router-dom";

import API from "../../utils/API";

import colors from "../../config/colors";

import NavLinkMobile from "../NavLinkMobile";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pageLinks = [
    {
      name: `Landing Page`,
      to: `/`,
    },
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

  logOut = () => {
    API.logOut()
      .then(() => this.props.changeUser())
      .catch(err => console.error(err));
  };

  hideNav = () => {
    if (document.getElementsByClassName(`nav-mobile`)[0]) {
      const navMobile = document.getElementsByClassName(`nav-mobile`)[0];
      if (navMobile.classList.contains(`translateNavMobile`)) {
        navMobile.classList.add(`translateNavMobileBack`);
        navMobile.classList.remove(`translateNavMobile`);
      }
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
                    backgroundColor: colors.mediumPrimary,
                    borderBottom: `2px solid ${colors.secondary}`,
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
                      <NavLinkMobile
                        index={index}
                        length={this.pageLinks.length}
                        to={pageLink.to}
                        username={this.props.currentUser.username}
                      >
                        {pageLink.name}
                      </NavLinkMobile>
                    </div>
                  ))}
                  <div
                    onClick={this.logOut}
                    style={{
                      color: colors.secondary,
                      textAlign: `center`,
                      display: `flex`,
                      justifyContent: `center`,
                      paddingTop: `3px, 0`,
                      fontWeight: `bold`,
                      cursor: `pointer`,
                    }}
                  >
                    <p style={{ marginBottom: `5px` }}>
                      Log Out {this.props.currentUser.username}
                    </p>
                  </div>
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
