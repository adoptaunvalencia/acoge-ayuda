import { Map } from '../../components/map/Map'
import CardList from '../../components/card/CardList'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import './Dashboard.css'
import { useContext, useState } from 'react'
import FilterServices from '../../components/filtro-services/FilterServices'

const Dashboard = () => {
  const {
    stateOffer: { offers },
  } = useContext(ReducerContext)

  const allCategories = ["accommodation", "food", "hygiene", "pet_fostering"];
  const [activeTypes, setActiveTypes] = useState(allCategories);

  const handleCategoryToggle = (category) => {
    setActiveTypes((prevTypes) => {
      if (prevTypes.includes(category)) {
        return prevTypes.filter((type) => type !== category);
      } else {
        return [...prevTypes, category];
      }
    });
  };

  return (
    <div className='dashborad__container'>
      <div>
        <FilterServices onCategoryToggle={handleCategoryToggle} />
      </div>
      <div>
        <Map activeTypes={activeTypes} />
      </div>
      <div>
        <CardList offers={offers} />
      </div>
    </div>
  )
}

export default Dashboard
