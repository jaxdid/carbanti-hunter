import styled from 'styled-components'
import React from 'react'
import CharacterCard from './CharacterCard'

function Results (props) {
  const renderCharacterCards = () => {
    if (!props.data) return

    return Object.entries(props.data)
      .map(([name, map]) => <CharacterCard name={name} map={map} />)
  }

  const renderLookupError = () => {
    return (
      <LookupError>
        <video preload="auto" autoPlay="autoplay" muted="muted" loop="loop">
          <source src="//i.imgur.com/SRkhtAS.mp4" type="video/mp4" />
        </video>
        <Message>
          Sorry, I didn't get that.
          <br />
          Please <span>try</span> search again.
        </Message>
      </LookupError>
    )
  }

  return (
    <ResultsContainer>
      {props.error === 0 ? renderCharacterCards() : renderLookupError()}
    </ResultsContainer>
  )
}

const ResultsContainer = styled.div`
  flex: 3 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  background-color: gainsboro;
`

const LookupError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  video {
    width: 50%;
  }
`

const Message = styled.div`
  margin-top: 10px;  
  font-family: 'Bungee', sans-serif;
  font-size: 18px;
  text-align: center;
  color: #150701;

  > span {
    text-decoration: line-through;
  }
`

export default Results
