import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import { withRouter } from "react-router-dom";
import colors from "../../config/colors";
import pageLinks from "../../config/pageLinks";
import NavLink from "../NavLink";
import NavLinkMobile from "../NavLinkMobile";

class NavBar extends Component {
  styles = {
    mobileNavLinkStyle: {
      display: `flex`,
      fontWeight: `bold`,
      justifyContent: `center`,
      textAlign: `center`,
    },
    navContainerFull: {
      backgroundColor: colors.mediumPrimary,
      borderBottom: `2px solid ${colors.secondary}`,
      boxShadow: `0px -12px 10px 10px ${colors.secondary}`,
      display: `flex`,
      flexDirection: `row`,
      justifyContent: `space-evenly`,
    },
    navContainerMobile: {
      backgroundColor: colors.mediumPrimary,
      borderBottom: `2px solid ${colors.secondary}`,
      boxShadow: `0px -12px 10px 10px ${colors.secondary}`,
      display: `flex`,
      flexDirection: `column`,
      height: `auto`,
      left: `0`,
      position: `absolute`,
      width: `100%`,
      zIndex: 5,
    },
  };

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
      if (
        this.props.isNavShowing &&
        touchendY <= touchstartY &&
        Math.abs(touchendY - touchstartY) > 100
      ) {
        this.props.showNav();
      }
    };
  }

  render() {
    return (
      <div>
        {this.props.loggedIn ? (
          <div onClick={this.props.showNav}>
            <Breakpoint medium up>
              <div style={this.styles.navContainerFull}>
                {pageLinks.map((pageLink, index) => (
                  <div
                    key={index}
                    style={{ display: `flex`, justifyContent: `space-between` }}
                  >
                    <NavLink
                      index={index}
                      length={pageLinks.length}
                      style={this.styles.mobileNavLinkStyle}
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
                  style={this.styles.navContainerMobile}
                >
                  {pageLinks.map((pageLink, index) => (
                    <div key={index} style={{ margin: `5px 0` }}>
                      <NavLinkMobile
                        index={index}
                        length={pageLinks.length}
                        style={this.styles.mobileNavLinkStyle}
                        to={pageLink.to}
                        username={this.props.currentUser.username}
                      >
                        {pageLink.name}
                      </NavLinkMobile>
                    </div>
                  ))}
                  <div
                    onClick={this.props.logOut}
                    style={{
                      ...this.styles.mobileNavLinkStyle,
                      color: colors.secondary,
                      cursor: `pointer`,
                      paddingTop: `3px`,
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
              <div style={this.styles.navContainerFull}>
                <NavLink
                  index={0}
                  length={1}
                  style={this.styles.mobileNavLinkStyle}
                  to={
                    this.props.location.pathname === `/about` ? `/` : `/about`
                  }
                >
                  {this.props.location.pathname === `/about`
                    ? `Rules of the Game`
                    : `About SuperHero Battle`}
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
