import React, { Component } from 'react'
import { getCharacters } from '../lib/utils'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      query: ''
    }
  }

  handleInputChange (query) {
    this.setState({ query })

    const validQueries = validate(query)

    if (validQueries.length) {
      this.props.onQueryChange(validQueries)
    } else {
      this.props.onValidationError(1)
    }
  }

  render () {
    return (
      <div className="search-bar">
        <input
          value={this.state.query}
          placeholder={'Search your feelings...'}
          onChange={event => this.handleInputChange(event.target.value)}
        />
      </div>
    )
  }
}

function validate (query) {
  const formattedQuery = query.toLowerCase()
  const formattedQueryParts = formattedQuery.split(' ')
  const characters = getCharacters()

  return characters
    .filter(({ name, alts }) => {
      const formattedName = name.toLowerCase()
      return formattedName === formattedQuery ||
        formattedQueryParts.every(part => formattedName.includes(part)) ||
        alts.includes(formattedQuery)
    })
    .map(match => match.name)
}

export default SearchBar
