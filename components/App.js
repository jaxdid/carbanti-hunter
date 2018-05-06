import _ from 'lodash'
import axios from 'axios'
import styled from 'styled-components'
import React, { Component } from 'react'
import SearchBar from './SearchBar'
import CharacterCard from './CharacterCard'

class App extends Component {
  constructor () {
    super()

    this.state = {
      carabantisData: null,
      error: 0
    }

    this.runSearch = _.debounce(this.runSearch.bind(this), 500)
    this.setError = _.debounce(this.setError.bind(this), 500)
  }

  runSearch (queries) {
    const json = queries.reduce((obj, { name, level }) => ({...obj, [name]: level}), {})
    axios.post('https://carbanti-hunter.herokuapp.com/api', json, {
      'Content-Type': 'application/json'
    }).then(resp => this.setState({
      carabantisData: resp.data,
      error: 0
    }))
  }

  setError (error) {
    window.setTimeout(() => {
      this.setState({
        carabantisData: null,
        error
      })
    }, error === 1 ? 1000 : 0)
  }

  getCarbantisTotal () {
    return Object.entries(this.state.carabantisData)
      .map(([name, map]) => <CharacterCard name={name} map={map} />)
  }

  render () {
    return (
      <Container>
        <SearchBar
          onQueryChange={query => this.runSearch(query)}
          clearRequestQueue={this.runSearch.cancel}
          onValidationError={error => this.setError(error)}
        />
        {this.state.error ? 'This isn\'t the character you\'re looking for...' : ''}
        {this.state.carabantisData ? this.getCarbantisTotal() : ''}
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export default App
