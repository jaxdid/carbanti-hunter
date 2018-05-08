import React, { Component } from 'react'
import styled from 'styled-components'
import { validateQuery } from '../../lib/utils'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      query: ''
    }
  }

  handleInputChange (query) {
    this.setState({ query })
    this.props.clearRequestQueue()
    this.props.onValidationError(0)

    if (query.length < 2) return

    const validQueries = validateQuery(query)

    if (validQueries.length) {
      this.props.onQueryChange(validQueries)
    } else {
      this.props.onValidationError(1)
    }
  }

  render () {
    return (
      <SearchBarContainer>
        <Field
          value={this.state.query}
          placeholder={'Search your feelings...'}
          onChange={event => this.handleInputChange(event.target.value)}
        />
      </SearchBarContainer>
    )
  }
}

const SearchBarContainer = styled.div`
  flex: 1 0 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 5px 10px -2px rgba(0,0,0,0.55);
  z-index: 1;
`

const Field = styled.input`
  width: 80%;
  text-align: center;
  color: white;
  font-size: 24px;
  font-family: 'Bungee', sans-serif;
  padding: 15px;
  border: 8px solid transparent;
  border-image: linear-gradient(to bottom left, firebrick 0%, peru 100%);
  border-image-slice: 1;
  background-color: #150701;
`

export default SearchBar
