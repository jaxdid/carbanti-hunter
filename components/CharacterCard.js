import React, { Fragment } from 'react'

function CharacterCard (props) {
  return (
    <Fragment>
      <div>{props.name}</div>
      <div>
        <h5>Total salvage needed:</h5>
        <h1>{Object.values(props.map).reduce((total, current) => total + current)}</h1>
      </div>
      <table>
        {renderGearTable(props.map)}
      </table>
    </Fragment>
  )
}

function renderGearTable (map) {
  return Object.entries(map).map(([level, gearNeeded]) => {
    return (
      <tr>
        <td>{level}</td>
        <td>{gearNeeded}</td>
      </tr>
    )
  })
}

export default CharacterCard
