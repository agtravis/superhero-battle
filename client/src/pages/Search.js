import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../utils/API";
import SuperHeroAPI from "../utils/SuperHeroAPI";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";
import ToggleSwitch from "../components/ToggleSwitch";
import LoadingAnimation from "../components/LoadingAnimation";
import { Redirect } from "react-router-dom";
import PageTitle from "../components/PageTitle";

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
    resultsContainer: { maxHeight: `500px`, overflow: `scroll` },
  };

  componentDidMount() {
    document.getElementById(`user-search`).focus();
  }

  clearForm = () => {
    document.getElementById(`user-search`).value = ``;
    this.setState({ searchField: `` });
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
        {this.state.searched === `user` && (
          <div style={this.styles.resultsContainer}>
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
          <div style={this.styles.resultsContainer}>
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
