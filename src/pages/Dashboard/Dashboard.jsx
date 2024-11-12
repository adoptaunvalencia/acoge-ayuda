import React, { useContext } from 'react'
import { Map } from '../../components/map/Map'
import CardList from '../../components/card/CardList'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'

const Dashboard = () => {
  const {
    stateOffer: { offers }
  } = useContext(ReducerContext)
  return (
    <div>
      <Map />
      <CardList offers={offers} />
    </div>
  )
}

export default Dashboard
