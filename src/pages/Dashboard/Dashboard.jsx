import { Map } from '../../components/map/Map'
import CardList from '../../components/card/CardList'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import './Dashboard.css'
import { useContext } from 'react'
import FilterServices from '../../components/filtro-services/FilterServices'

const Dashboard = () => {
  const {
    stateOffer: { offers },
    handleCategoryToggle
  } = useContext(ReducerContext)
  return (
    <div className='dashborad__container'>
      <div>
        <FilterServices onCategoryToggle={handleCategoryToggle} />
      </div>
      <div>
        <Map />
      </div>
      <div>
        <CardList offers={offers} />
      </div>
    </div>
  )
}

export default Dashboard
