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

    const validatedQuery = validate(query)

    if (validatedQuery) {
      this.props.onQueryChange(validatedQuery)
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
  const characters = getCharacters()
  const match = characters.filter(({ name, alts }) => {
    return name === formattedQuery || alts.includes(formattedQuery)
  })

  return match.length ? match[0].name : ''
}

export default SearchBar
