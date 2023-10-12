import React, { Component } from 'react';
// import { toast } from 'react-toastify';
import { StyledHeader, StyledSearchForm } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleSearchQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { query } = this.state;

    onSubmit(query);
  };

  render() {
    const { query } = this.state;

    return (
      <StyledHeader>
        <StyledSearchForm onSubmit={this.handleSubmit}>
          <button type="submit">
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.handleSearchQueryChange}
            value={query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </StyledSearchForm>
      </StyledHeader>
    );
  }
}
