import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import { withRouter } from "react-router-dom";

import API from "../../utils/API";

import colors from "../../config/colors";

import NavLinkMobile from "../NavLinkMobile";
import NavLink from "../NavLink";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let touchstartY = 0;
    let touchendY = 0;
    let startTime;
    const gestureZone = document.getElementById(`root`);
    gestureZone.addEventListener(
      `touchstart`,
      function (event) {
        startTime = new Date().getTime();
        touchstartY = event.changedTouches[0].screenY;
      },
      false
    );
    gestureZone.addEventListener(
      `touchend`,
      function (event) {
        const elapsedTime = new Date().getTime() - startTime;
        touchendY = event.changedTouches[0].screenY;
        if (elapsedTime <= 300) {
          handleGesture(touchstartY, touchendY);
        }
      },
      false
    );
    const handleGesture = (touchstartY, touchendY) => {
      if (touchendY <= touchstartY && Math.abs(touchendY - touchstartY) > 100) {
        this.hideNav();
      }
    };
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

  mobileNavStyle = {
    textAlign: `center`,
    display: `flex`,
    justifyContent: `center`,
    fontWeight: `bold`,
  };

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
      <div>
        {this.props.loggedIn ? (
          <div onClick={this.hideNav}>
            <Breakpoint medium up>
              <div
                style={{
                  display: `flex`,
                  flexDirection: `row`,
                  justifyContent: `space-evenly`,
                  backgroundColor: colors.mediumPrimary,
                  borderBottom: `2px solid ${colors.secondary}`,
                }}
              >
                {this.pageLinks.map((pageLink, index) => (
                  <div
                    key={index}
                    style={{ display: `flex`, justifyContent: `space-between` }}
                  >
                    <NavLink
                      style={this.mobileNavStyle}
                      index={index}
                      length={this.pageLinks.length}
                      to={pageLink.to}
                      username={this.props.currentUser.username}
                    >
                      {pageLink.name}
                    </NavLink>
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
                    width: `100%`,
                  }}
                >
                  {this.pageLinks.map((pageLink, index) => (
                    <div key={index} style={{ margin: `5px 0` }}>
                      <NavLinkMobile
                        style={this.mobileNavStyle}
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
                      ...this.mobileNavStyle,
                      paddingTop: `3px, 0`,
                      cursor: `pointer`,
                      color: colors.secondary,
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
              <div
                style={{
                  display: `flex`,
                  flexDirection: `row`,
                  justifyContent: `space-evenly`,
                  backgroundColor: colors.mediumPrimary,
                  borderBottom: `2px solid ${colors.secondary}`,
                }}
              >
                <NavLink
                  style={this.mobileNavStyle}
                  index={0}
                  length={1}
                  to={
                    this.props.location.pathname === `/about` ? `/` : `/about`
                  }
                >
                  About SuperHero Battle
                </NavLink>
              </div>
            </Breakpoint>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(NavBar);
