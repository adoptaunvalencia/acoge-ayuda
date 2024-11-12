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
import 'leaflet/dist/leaflet.css'
<<<<<<< HEAD
import accommodation from '../../assets/icons/accommodation.png'
import hygiene from '../../assets/icons/hygiene.png'
import food from '../../assets/icons/food.png'
import pet_fostering from '../../assets/icons/pet_fostering.png'
import def from '../../assets/icons/default.png'
import { fetchOffers } from '../../reducers/offers.reducer/offer.action'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
=======
import def from '../../assets/icons/icon_map.svg'
import Modal from '../modal/Modal'
import Card from '../card/Card'
<<<<<<< HEAD
>>>>>>> parent of 6b11729 (FEAT Spinner)

const { BaseLayer, Overlay } = LayersControl
=======
>>>>>>> 95c51c188088b2d4a9144f19920747db321c56ee

const offerIcons = {
  accommodation: new L.Icon({
    iconUrl: accommodation, // URL de tu icono
    iconSize: [32, 32], // Tamaño del icono
    iconAnchor: [16, 32], // Punto de anclaje del icono (la base del icono)
    popupAnchor: [0, -32] // Posición del popup
  }),
  hygiene: new L.Icon({
    iconUrl: hygiene,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  }),
  food: new L.Icon({
    iconUrl: food,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  }),
  pet_fostering: new L.Icon({
    iconUrl: pet_fostering,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  }),
  default: new L.Icon({
    iconUrl: def,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })
}

export const Map = ({ activeTypes, selectedCity, maxDistance }) => {
  const { userLocation, categorizedOffers, load, filterOffers } = useContext(FunctionContext)
  const {
    stateOffer: { offers },
<<<<<<< HEAD
    stateIsAuth: { isAuth },
    dispatchLoad,
=======
    stateIsAuth: { isAuth, user },
>>>>>>> parent of 6b11729 (FEAT Spinner)
    dispatchOffer
  } = useContext(ReducerContext)
  useEffect(() => {
    const getOffers = async () => {
      const uriApi = `assistance-offer`
      const data = await fetchOffers(uriApi, dispatchOffer, dispatchLoad)

      dispatchOffer({ type: 'SET_OFFERS', payload: data.assistancesOffers })
    }
    getOffers()
  }, [])

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
=======
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
>>>>>>> parent of 6b11729 (FEAT Spinner)
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
<<<<<<< HEAD
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
                  overlayNames[type] ||
                  type.charAt(0).toUpperCase() + type.slice(1)
                }
              >
                <LayerGroup>
                  {categorizedOffers[type].map((offer) => (
                    <CustomMarker key={offer._id} offer={offer} />
                  ))}
                </LayerGroup>
              </Overlay>
            ))}
          </LayersControl>
        </MapContainer>
      )}
    </>
=======
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
>>>>>>> parent of 6b11729 (FEAT Spinner)
  )
}

const CustomMarker = ({ offer }) => {
  const map = useMap()
  const handleClickPosition = () => {
    map.setView(
      [offer.location.coordinates[1], offer.location.coordinates[0]],
      13,
      { animate: true, duration: 0.8 }
    )
<<<<<<< HEAD
=======
    dispatchOffer({ type: 'SET_OFFER', payload: offer })
    setShowPopup(true)
<<<<<<< HEAD
    console.log(offer)
=======
>>>>>>> 95c51c188088b2d4a9144f19920747db321c56ee
>>>>>>> parent of 6b11729 (FEAT Spinner)
  }

  const offerType = offer.typeOffer[0]?.type || 'default'
  const markerIcon = offerIcons[offerType] || offerIcons.default
  return (
    <Marker
      position={[offer.location.coordinates[1], offer.location.coordinates[0]]}
      icon={markerIcon}
      eventHandlers={{ click: handleClickPosition }}
    />
  )
}
