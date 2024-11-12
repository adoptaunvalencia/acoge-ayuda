import React, { useContext } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import Card from './Card'
import Spinner from '../spinner/Spinner'
import './card.css'

const CardList = ({ isAuth, user }) => {
  const {
    stateOffer: { offer, offers },
    stateLoad: { load }
  } = useContext(ReducerContext)

  return (
    <>
      {load ? (
        'Loading'
      ) : (
        <div className='card-list'>
          {offers?.map((offer) => (
            <Card key={offer._id} isAuth={isAuth} user={user} offer={offer} />
          ))}
        </div>
      )}
    </>
  )
}

export default CardList
