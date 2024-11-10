import React from 'react';
import useFetch from '../../hooks/useFetch'
import Card from './Card';
import './card.css';

const CardList = ({ isAuth, user }) => {
  const {
    data: assistanceOffers,
    stateLoad: { load }
  } = useFetch({
    uri: 'https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer',
    method: 'GET'
  })

  return (
    <>
      {load ? (
        'Loading'
      ) : (
        <div className="card-list">
          {assistanceOffers?.assistancesOffers?.map((offer) => (
            <Card
              key={offer._id}
              isAuth={isAuth}
              user={user}
              offer={offer}
            />
          ))}
      </div>
      )}
    </>
  )
}

export default CardList