import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import colors from "../../../config/colors";
import LogInSignUp from "../LogInSignUp";
import LogInSignUpMobile from "../LogInSignUpMobile";
import Logo from "../Logo";
import LogOut from "../LogOut";
import NavControllerMobile from "../NavControllerMobile";

class HeaderComponent extends Component {
  styles = {
    header: {
      alignItems: `center`,
      backgroundColor: colors.primary,
      display: `flex`,
      justifyContent: `space-between`,
      padding: `10px 20px`,
      position: `relative`,
      zIndex: 10,
    },
    headerTitleText: {
      color: colors.black,
      fontFamily: `Impact, Charcoal, sans-serif`,
    },
    logoContainer: { position: `relative` },
    signUpLinkContainer: { padding: `2px` },
    userButtons: {
      display: `flex`,
      flexDirection: `row`,
      position: `absolute`,
      top: `-25px`,
      left: `-140px`,
    },
  };

  render() {
    return (
      <div style={this.styles.header}>
        <div style={this.styles.logoContainer}>
          <Breakpoint medium up>
            <Logo />
          </Breakpoint>
        </div>
        <div>
          <Breakpoint medium up>
            <h1 style={this.styles.headerTitleText}>{this.props.title}</h1>
          </Breakpoint>
          <Breakpoint small down>
            <NavControllerMobile
              loggedIn={this.props.loggedIn}
              headerTitleTextStyle={this.styles.headerTitleText}
              pathname={this.props.pathname}
              showNav={this.props.showNav}
              title={this.props.title}
            />
          </Breakpoint>
        </div>
        {!this.props.loggedIn ? (
          <div>
            <Breakpoint medium up>
              <LogInSignUp
                showLogIn={this.props.showLogIn}
                showSignUp={this.props.showSignUp}
                userButtonsStyle={this.styles.userButtons}
              />
            </Breakpoint>
            <Breakpoint small down>
              <LogInSignUpMobile
                showLogInMobile={this.props.showLogInMobile}
                showSignUpMobile={this.props.showSignUpMobile}
              />
            </Breakpoint>
          </div>
        ) : (
          <div>
            <Breakpoint medium up>
              <LogOut
                currentUser={this.props.currentUser}
                logOut={this.props.logOut}
                userButtonsStyle={this.styles.userButtons}
              />
            </Breakpoint>
          </div>
        )}
      </div>
    );
  }
}

export default HeaderComponent;
