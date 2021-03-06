import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import API from "../utils/API";
import SuperHeroAPI from "../utils/SuperHeroAPI";
import colors from "../config/colors";
import LoadingAnimation from "../components/LoadingAnimation";
import PageTitle from "../components/PageTitle";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";
import ToggleSwitch from "../components/ToggleSwitch";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      isLoading: false,
      isUserSearch: true,
      searched: false,
      searchField: ``,
      results: [],
      userId: null,
    };
  }

  styles = {
    resultsContainer: { maxHeight: `500px`, overflow: `auto` },
    resultsText: {
      display: `flex`,
      justifyContent: `center`,
      textAlign: `center`,
    },
  };

  componentDidMount() {
    document.getElementById(`user-search`).focus();
  }

  clearForm = () => {
    document.getElementById(`user-search`).value = ``;
    this.setState({ searchField: ``, searched: false });
  };

  convertDate = date => {
    const dateArr = new Date(date).toDateString().split(` `);
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  };

  handleChange = (event, stateKey) => {
    this.setState({ [stateKey]: event.target.value });
  };

  handleSubmit = () => {
    this.setState({ searched: false, isLoading: true });
    if (this.state.isUserSearch) {
      API.findOneUserByName({ search: this.state.searchField })
        .then(response => {
          this.setState({
            results: response.data,
            searched: `user`,
            isLoading: false,
          });
        })
        .catch(err => console.error(err));
    } else {
      SuperHeroAPI.findCharacterByName(this.state.searchField)
        .then(response => {
          this.setState({
            results: response.data,
            searched: `hero`,
            isLoading: false,
          });
        })
        .catch(err => console.error(err));
    }
  };

  loadUser = userId => {
    const { history } = this.props;
    if (history) {
      history.push(`/search`);
    }
    this.setState({ userId: userId });
  };

  loadCharacter = character => {
    const { history } = this.props;
    if (history) {
      history.push(`/search`);
    }
    this.setState({ character: character });
  };

  toggleSearchMode = () => {
    this.clearForm();
    this.setState({ isUserSearch: !this.state.isUserSearch });
    document.getElementById(`user-search`).focus();
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    if (this.state.userId) {
      return (
        <Redirect
          to={{
            pathname: `/profile`,
            state: {
              userId: this.state.userId,
            },
          }}
        />
      );
    }
    if (this.state.character) {
      return (
        <Redirect
          to={{
            pathname: `/character`,
            state: {
              character: this.state.character,
            },
          }}
        />
      );
    }
    return (
      <div>
        <PageTitle>Search</PageTitle>
        <ToggleSwitch
          height={`100px`}
          leftText={`USER`}
          rightText={`HERO`}
          toggleFunction={this.toggleSearchMode}
        />
        <SearchForm
          clearForm={this.clearForm}
          fieldName={`searchField`}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          id={`user-search`}
        />
        {this.state.isLoading && (
          <LoadingAnimation divHeight={400} size={150} />
        )}
        {this.state.searched !== false && this.state.results.length < 1 && (
          <div style={this.styles.resultsText}>
            <p>
              Your search for a{" "}
              {this.state.searched === `user` ? `username ` : `hero's name `}
              containing{` `}
              <em>"{this.state.searchField}"</em> returned no results. Try
              again?
            </p>
          </div>
        )}
        {this.state.searched !== false && this.state.results.length > 0 && (
          <div
            style={{
              ...this.styles.resultsText,
              borderBottom: `1px solid ${colors.darkSecondary}`,
              marginBottom: `24px`,
            }}
          >
            <p>Your search returned {this.state.results.length} results:</p>
          </div>
        )}
        {this.state.searched === `user` && (
          <div className={`custom-scroll`} style={this.styles.resultsContainer}>
            {this.state.results.map((user, index) => (
              <SearchResult
                image={user.roster[0]}
                index={index}
                key={index}
                name={user.username}
                onClick={this.loadUser}
                param={user._id}
                prestige={user.prestige + 1}
                registered={this.convertDate(user.registered)}
                rosterLength={user.roster.length}
                type={`user`}
              />
            ))}
          </div>
        )}
        {this.state.searched === `hero` && (
          <div className={`custom-scroll`} style={this.styles.resultsContainer}>
            {this.state.results.map((hero, index) => (
              <SearchResult
                image={hero.image.url}
                index={index}
                info={hero.connections[`group-affiliation`]}
                key={index}
                name={hero.name}
                onClick={this.loadCharacter}
                param={hero}
                type={`hero`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(SearchPage);
