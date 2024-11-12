import React, { useContext, useEffect, useState } from 'react'
import {
  MapContainer,
  Marker,
  TileLayer,
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
<<<<<<< HEAD

const { BaseLayer, Overlay } = LayersControl
=======
>>>>>>> 95c51c188088b2d4a9144f19920747db321c56ee

const defaultIcon = new L.Icon({
  iconUrl: def,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

export const Map = ({ activeTypes, selectedCity, maxDistance }) => {
  const { userLocation, categorizedOffers, load, filterOffers } = useContext(FunctionContext)
  const {
    stateOffer: { offers },
    stateIsAuth: { isAuth, user },
    dispatchOffer
  } = useContext(ReducerContext)

<<<<<<< HEAD
  const overlayNames = {
    all: 'Todas las ofertas',
    accommodation: 'Alojamientos',
    hygiene: 'Higiene',
    food: 'Comida',
    pet_fostering: 'Acogida de mascotas'
  }

=======
>>>>>>> 95c51c188088b2d4a9144f19920747db321c56ee
  useEffect(() => {
    filterOffers(selectedCity, maxDistance)
  }, [selectedCity, maxDistance, filterOffers])

  const initialPosition = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [40.42372525496708, -3.678864358280353] // MADRID

  return (
<<<<<<< HEAD
    <MapContainer
      center={initialPosition}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: '35vh', width: '100%' }}
    >
      <LayersControl position='topright'>
        <BaseLayer checked name='Ofertas'>
=======
    <>
      {load ? (
        'Loading...'
      ) : (
        <MapContainer
          center={initialPosition}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: '35vh', width: '100%' }}
        >
>>>>>>> 95c51c188088b2d4a9144f19920747db321c56ee
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
<<<<<<< HEAD
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
=======

          {activeTypes.map((type) => (
            categorizedOffers[type] && (
              <LayerGroup key={type}>
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
            )
          ))}
        </MapContainer>
      )}
    </>
>>>>>>> 95c51c188088b2d4a9144f19920747db321c56ee
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
<<<<<<< HEAD
    console.log(offer)
=======
>>>>>>> 95c51c188088b2d4a9144f19920747db321c56ee
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
