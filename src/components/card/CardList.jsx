import React, { useContext } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import Card from './Card'
import './card.css'

const CardList = ({offers}) => {
  const {
    stateLoad: { load }
  } = useContext(ReducerContext)

  return (
    <>
      {load ? (
        'Loading'
      ) : (
        <div className='card-list'>
          {offers?.map((offer) => (
            <Card key={offer._id} offer={offer} />
          ))}
        </div>
      )}
    </>
  )
}

export default CardList
