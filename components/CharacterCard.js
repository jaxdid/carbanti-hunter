import React from 'react'

function CharacterCard (props) {
  return (
    <div>
      <div>{props.name}</div>
      <div>
        <h5>Total salvage needed:</h5>
        <h1>{Object.values(props.map).reduce((total, current) => total + current)}</h1>
      </div>
    </div>
  )
}

export default CharacterCard
