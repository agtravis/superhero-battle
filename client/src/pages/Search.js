import React, { Component } from "react";
import API from "../utils/API";
import SuperHeroAPI from "../utils/SuperHeroAPI";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";
import ToggleSwitch from "../components/ToggleSwitch";
import LoadingAnimation from "../components/LoadingAnimation";
import { Redirect } from "react-router-dom";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isUserSearch: true,
      searched: false,
      searchField: ``,
      results: [],
      userId: null,
    };
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

  loadUser = userId => this.setState({ userId: userId });

  toggleSearchMode = () => {
    this.clearForm();
    this.setState({ isUserSearch: !this.state.isUserSearch });
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
    return (
      <div>
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
        {this.state.searched === `user` &&
          this.state.results.map((user, index) => (
            <SearchResult
              image={user.roster[0]}
              index={index}
              key={index}
              name={user.username}
              onClick={this.loadUser}
              userId={user._id}
              prestige={user.prestige + 1}
              registered={this.convertDate(user.registered)}
              rosterLength={user.roster.length}
              type={`user`}
            />
          ))}
        {this.state.searched === `hero` &&
          this.state.results.map((hero, index) => (
            <SearchResult
              image={hero.image.url}
              index={index}
              info={hero.connections[`group-affiliation`]}
              key={index}
              name={hero.name}
              type={`hero`}
            />
          ))}
      </div>
    );
  }
}

export default SearchPage;