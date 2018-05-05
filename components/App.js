import _ from 'lodash'
import axios from 'axios'
import React, { Component } from 'react'
import SearchBar from './SearchBar'

class App extends Component {
  constructor () {
    super()

    this.state = {
      carbantisMap: null
    }

    this.runSearch = _.debounce(this.runSearch.bind(this), 500)
  }

  runSearch (query) {
    const formattedQuery = query.replace(/\s/g, '-')
    const json = { [formattedQuery]: 1 }

    axios.post('https://carbanti-hunter.herokuapp.com/api', json, {
      'Content-Type': 'application/json'
    }).then(resp => this.setState({
      carbantisMap: resp.data[formattedQuery]
    }))
  }

  getCarbantisTotal () {
    return Object.values(this.state.carbantisMap)
      .reduce((total, current) => total + current)
  }

  render () {
    return (
      <div>
        <SearchBar onQueryChange={query => this.runSearch(query)} />
        {this.state.carbantisMap ? this.getCarbantisTotal() : ''}
      </div>
    )
  }
}

export default App
