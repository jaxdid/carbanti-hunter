import React, { Component } from 'react'
import styled from 'styled-components'
import { validateQuery } from '../lib/utils'

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
      <Field
        value={this.state.query}
        placeholder={'Search your feelings...'}
        onChange={event => this.handleInputChange(event.target.value)}
      />
    )
  }
}

const Field = styled.input`
  width: 80%;
  text-align: center;
  font-size: 24px;
`

export default SearchBar
