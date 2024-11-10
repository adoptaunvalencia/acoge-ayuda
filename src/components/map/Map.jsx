import React, { useEffect, useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  LayersControl,
  LayerGroup,
  useMap
} from 'react-leaflet'
import L from 'leaflet'
import useFetch from '../../hooks/useFetch'
import 'leaflet/dist/leaflet.css'
import accommodation from '../../assets/icons/accommodation.png'
import hygiene from '../../assets/icons/hygiene.png'
import food from '../../assets/icons/food.png'
import pet_fostering from '../../assets/icons/pet_fostering.png'
import def from '../../assets/icons/default.png'

const { BaseLayer, Overlay } = LayersControl
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

export const Map = () => {
  const [activeType, setActiveType] = useState('all')
  const [categorizedOffers, setCategorizedOffers] = useState({
    accommodation: [],
    hygiene: [],
    food: [],
    pet_fostering: [],
    all: []
  })
  const {
    data: assistanceOffers,
    stateLoad: { load }
  } = useFetch({
    uri: 'https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer',
    method: 'GET'
  })
  
  useEffect(() => {
    if (assistanceOffers?.assistancesOffers) {
      const newCategorizedOffers = {
        accommodation: [],
        hygiene: [],
        food: [],
        pet_fostering: [],
        all: []
      }
      assistanceOffers.assistancesOffers.forEach((offer) => {
        offer.typeOffer.forEach((item) => {
          newCategorizedOffers.all.push(offer)
          if (newCategorizedOffers[item.type]) {
            newCategorizedOffers[item.type].push(offer)
          }
        })
      })
      setCategorizedOffers(newCategorizedOffers)
    }
  }, [assistanceOffers])
  const initialPosition = assistanceOffers?.assistancesOffers.length
    ? [
        assistanceOffers.assistancesOffers[0].location.coordinates[1],
        assistanceOffers.assistancesOffers[0].location.coordinates[0]
      ]
    : [40.42372525496708, -3.678864358280353] // MADRID
  return (
    <>
      {load ? (
        'Loading'
      ) : (
        <MapContainer
          center={initialPosition}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: '35vh', width: '100%' }}
        >
          <LayersControl
            position='topright'
            onChange={(e) => setActiveType(e.name)}
          >
            <BaseLayer checked name='Ofertas'>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
            </BaseLayer>

            <Overlay checked={activeType === 'all'} name='Todas las ofertas'>
              <LayerGroup>
                {categorizedOffers.all.map((offer, index) => (
                  <CustomMarker key={`${offer._id}-${index}`} offer={offer} />
                ))}
              </LayerGroup>
            </Overlay>
            {Object.keys(categorizedOffers).map((type) => {
              if (type !== 'all') {
                return (
                  <Overlay
                    key={type}
                    checked={activeType === type}
                    name={type.charAt(0).toUpperCase() + type.slice(1)}
                  >
                    <LayerGroup>
                      {categorizedOffers[type].map((offer, index) => (
                        <CustomMarker
                          key={`${offer._id}-${index}`}
                          offer={offer}
                        />
                      ))}
                    </LayerGroup>
                  </Overlay>
                )
              }
              return null
            })}
          </LayersControl>
        </MapContainer>
      )}
    </>
  )
}
const CustomMarker = ({ offer }) => {
  const map = useMap()
  const handleClickPosition = () => {
    map.setView(
      [offer.location.coordinates[1], offer.location.coordinates[0]],
      13, // Nivel de zoom deseado
      { animate: true, duration: 0.8 }
    )
    console.log(offer)
  }
  const offerType =
    offer.typeOffer.length > 0 ? offer.typeOffer[0].type : 'default'
  const markerIcon = offerIcons[offerType] || offerIcons.default
  return (
    <Marker
      position={[offer.location.coordinates[1], offer.location.coordinates[0]]}
      icon={markerIcon}
      eventHandlers={{ click: handleClickPosition }}
    ></Marker>
  )
}
