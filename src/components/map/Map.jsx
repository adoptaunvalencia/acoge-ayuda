import React, { useContext, useEffect, useState } from 'react'
import {
  MapContainer,
  Marker,
  TileLayer,
  LayersControl,
  LayerGroup,
  useMap
} from 'react-leaflet'
import L from 'leaflet'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import 'leaflet/dist/leaflet.css'
import def from '../../assets/icons/icon_map.svg'
import Modal from '../modal/Modal'
import Card from '../card/Card'

const { BaseLayer, Overlay } = LayersControl

const defaultIcon = new L.Icon({
  iconUrl: def,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

export const Map = ({ maxDistance, selectedCity }) => {
  const { userLocation, categorizedOffers, load, filterOffers } =
    useContext(FunctionContext)
  const [activeType, setActiveType] = useState('all')
  const {
    stateOffer: { offers },
    stateIsAuth: { isAuth, user },
    dispatchLoad,
    dispatchOffer
  } = useContext(ReducerContext)

  const overlayNames = {
    all: 'Todas las ofertas',
    accommodation: 'Alojamientos',
    hygiene: 'Higiene',
    food: 'Comida',
    pet_fostering: 'Acogida de mascotas'
  }

  useEffect(() => {
    filterOffers(selectedCity, maxDistance)
  }, [selectedCity, maxDistance, filterOffers])

  const initialPosition = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [40.42372525496708, -3.678864358280353] // MADRID

  const handleEventClickOffer = (offer) => {
    console.log(offer)
  }

  return (
    <MapContainer
      center={initialPosition}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: '35vh', width: '100%' }}
    >
      <LayersControl position='topright'>
        <BaseLayer checked name='Ofertas'>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </BaseLayer>
        {Object.keys(categorizedOffers).map((type) => (
          <Overlay
            key={type}
            checked={activeType === type}
            name={
              overlayNames[type] || type.charAt(0).toUpperCase() + type.slice(1)
            }
          >
            <LayerGroup>
              {categorizedOffers[type].map((offer) => (
                <CustomMarker
                  key={offer._id}
                  offer={offer}
                  dispatchOffer={dispatchOffer}
                  isAuth={isAuth}
                  user={user}
                />
              ))}
            </LayerGroup>
          </Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  )
}

const CustomMarker = ({ offer, dispatchOffer, isAuth, user }) => {
  const map = useMap()
  const [showPopup, setShowPopup] = useState(false)

  const handleClickPosition = () => {
    map.setView(
      [offer.location.coordinates[1], offer.location.coordinates[0]],
      13,
      { animate: true, duration: 0.8 }
    )
    dispatchOffer({ type: 'SET_OFFER', payload: offer })
    setShowPopup(true)
    console.log(offer)
  }

  return (
    <>
      <Modal
        isModalOpen={showPopup}
        handleCloseModal={() => setShowPopup(false)}
      >
        <Card offer={offer} />
      </Modal>
      <Marker
        position={[
          offer.location.coordinates[1],
          offer.location.coordinates[0]
        ]}
        icon={defaultIcon}
        eventHandlers={{ click: handleClickPosition }}
      />
    </>
  )
}
