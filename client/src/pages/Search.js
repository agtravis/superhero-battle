import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Jumbotron } from "react-bootstrap";
import Nav from "../components/Nav";
import API from "../utils/API";
import SideFeedComponent from "../components/SideFeedComponent";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      redirect: null,
      username: null,
      userID: null,
    };
  }

  componentDidMount() {
    this.setSearchTerm();
  }
  handleUserChoice = chosenUser => {
    this.setState({
      redirect: `/userdetails`,
      userID: chosenUser,
    });
  };

  setSearchTerm = search => {
    if (search) {
      API.searchUser(search)
        .then(response => {
          this.setState({ users: response.data });
        })
        .catch(err => console.error(err));
    } else {
      API.searchUser(this.props.location.state.searchTerm)
        .then(response => {
          this.setState({ users: response.data });
        })
        .catch(err => console.error(err));
    }
  };

  render() {
    if (this.state.redirect) {
      const redir = this.state.redirect;
      this.setState({ redirect: null });
      return (
        <Redirect
          to={{
            pathname: redir,
            state: {
              userID: this.state.userID,
            },
          }}
        />
      );
    }

    return (
      <div>
        <Nav setSearchTerm={this.setSearchTerm} />
        <Row>
          <Col xl={4}>
            <div className="d-none d-xl-block">
              <SideFeedComponent />
            </div>
          </Col>
          <Col xl={8}>
            <Jumbotron className="maincontain" fluid>
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  fontSize: 40,
                }}
              >
                Users
              </p>
              <br></br>
              {this.state.users.length > 0
                ? this.state.users.map(user => (
                    <button
                      style={{
                        margin: 20,
                        fontSize: 20,
                      }}
                      id={user._id}
                      onClick={event => {
                        this.handleUserChoice(event.target.id);
                      }}
                    >
                      {user.username}
                    </button>
                  ))
                : null}
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
