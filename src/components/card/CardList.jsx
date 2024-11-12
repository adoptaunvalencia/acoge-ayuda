import React, { useContext } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import Card from './Card'
import Spinner from '../spinner/Spinner'
import './card.css'

const CardList = ({ offers }) => {
  return (
    <div className='card-list'>
      {offers?.map((offer) => (
        <Card key={offer._id} offer={offer} />
      ))}
    </div>
  )
}

export default CardList
