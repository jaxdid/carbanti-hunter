import styled from 'styled-components'
import React from 'react'

function CharacterCard (props) {
  return (
    <CharacterCardContainer>
      <Name>{props.name}</Name>
      <CarbantisNeeded>
        {Object.values(props.map).reduce((total, current) => total + current)}
      </CarbantisNeeded>
      <Separator>//</Separator>
      <GearTable>
        {renderGearTableRows(props.map)}
      </GearTable>
    </CharacterCardContainer>
  )
}

function renderGearTableRows (map) {
  return Object.entries(map).map(([level, gearNeeded]) => {
    return (
      <GearTableRow>
        <Data gearLevel>GL {level}:</Data>
        <Data>{gearNeeded}</Data>
      </GearTableRow>
    )
  })
}

const CharacterCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  width: 18vw;
  margin: 15px 0;
  padding: 10px;
  font-family: 'Bungee', sans-serif;
  text-align: center;
  border: 4px solid #150701;
`

const Name = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`

const CarbantisNeeded = styled.div`
  margin: 15px 0 10px;
  font-size: 38px;
  color: lightseasgreen;
`

const Separator = styled.div`
  margin-bottom: 15px;
  color: dimgray;
  font-size: 16px;
`

const GearTable = styled.table`
  width: 75%;
`

const GearTableRow = styled.tr`
  margin: 15px;
  font-family: 'Bungee', sans-serif;
`

const Data = styled.td`
  text-align: ${props => props.gearLevel ? 'left' : 'right'};
  color: ${props => props.gearLevel ? 'black' : 'indianred'};
`

export default CharacterCard
