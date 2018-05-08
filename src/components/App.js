import _ from 'lodash'
import axios from 'axios'
import styled from 'styled-components'
import React, { Component } from 'react'
import SearchBar from './SearchBar'
import Results from './Results'

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

  render () {
    return (
      <Container>
        <Title>
          Carbanti Hunter
        </Title>
        <SearchBar
          onQueryChange={query => this.runSearch(query)}
          clearRequestQueue={this.runSearch.cancel}
          onValidationError={error => this.setError(error)}
        />
        <Results data={this.state.carabantisData} error={this.state.error} />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Title = styled.div`
  flex: 2 0 0;  
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: #150701;
  font-size: 56px;
  font-family: 'Bungee', sans-serif;
  background-image: url(//cdn.dribbble.com/users/1055192/screenshots/3370688/greedo_run_01.gif);
  background-size: 25%;
  background-position: calc(50% + 10px) calc(100% - 88px);
  background-repeat: no-repeat;
`

export default App
