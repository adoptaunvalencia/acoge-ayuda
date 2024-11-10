import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  LayersControl,
  LayerGroup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import useFetch from "../../hooks/useFetch";
import "leaflet/dist/leaflet.css";
import accommodation from "../../assets/icons/accommodation.png";
import hygiene from "../../assets/icons/hygiene.png";
import food from "../../assets/icons/food.png";
import pet_fostering from "../../assets/icons/pet_fostering.png";
import def from "../../assets/icons/default.png";

const { BaseLayer, Overlay } = LayersControl;

const offerIcons = {
  accommodation: new L.Icon({
    iconUrl: accommodation, // URL de tu icono
    iconSize: [32, 32], // Tamaño del icono
    iconAnchor: [16, 32], // Punto de anclaje del icono (la base del icono)
    popupAnchor: [0, -32], // Posición del popup
  }),
  hygiene: new L.Icon({
    iconUrl: hygiene,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  food: new L.Icon({
    iconUrl: food,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  pet_fostering: new L.Icon({
    iconUrl: pet_fostering,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  default: new L.Icon({
    iconUrl: def,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const Map = ({ maxDistance, selectedCity }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [activeType, setActiveType] = useState("all");
  const [categorizedOffers, setCategorizedOffers] = useState({
    all: [],
    accommodation: [],
    hygiene: [],
    food: [],
    pet_fostering: [],  
  });

  const overlayNames = {
    "all": "Todas las ofertas",
    "accommodation": "Alojamientos",
    "hygiene": "Higiene",
    "food": "Comida",
    "pet_fostering": "Acogida de mascotas",
  }

  const {
    data: assistanceOffers,
    stateLoad: { load },
  } = useFetch({
    uri: "https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer",
    method: "GET",
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (assistanceOffers?.assistancesOffers) {
      let offersToFilter = assistanceOffers.assistancesOffers;

      if (selectedCity && selectedCity !== "all") {
        offersToFilter = offersToFilter.filter(
          (offer) => offer.city === selectedCity
        );
      }

      if (userLocation && maxDistance > 0) {
        offersToFilter = offersToFilter.filter((offer) => {
          const distance = getDistanceFromLatLonInKm(
            userLocation.latitude,
            userLocation.longitude,
            offer.location.coordinates[1],
            offer.location.coordinates[0]
          );
          return distance <= maxDistance;
        });
      }

      const newCategorizedOffers = {
        accommodation: [],
        hygiene: [],
        food: [],
        pet_fostering: [],
        all: [],
      };

      offersToFilter.forEach((offer) => {
        newCategorizedOffers.all.push(offer);
        offer.typeOffer.forEach((item) => {
          if (newCategorizedOffers[item.type]) {
            newCategorizedOffers[item.type].push(offer);
          }
        });
      });

      setCategorizedOffers(newCategorizedOffers);
    }
  }, [assistanceOffers, userLocation, maxDistance, selectedCity]);

  const initialPosition = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [40.42372525496708, -3.678864358280353]; //MADRID

  return (
    <>
      {load ? (
        "Loading..."
      ) : (
        <MapContainer
          center={initialPosition}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: "35vh", width: "100%" }}
        >
          <LayersControl
            position="topright"
            onChange={(e) => setActiveType(e.name)}
          >
            <BaseLayer checked name="Ofertas">
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>
            {Object.keys(categorizedOffers).map((type) => (
              <Overlay
                key={type}
                checked={activeType === type}
                name={overlayNames[type] || type.charAt(0).toUpperCase() + type.slice(1)}
              >
                <LayerGroup>
                  {categorizedOffers[type].map((offer, index) => (
                    <CustomMarker key={`${offer._id}-${index}`} offer={offer} />
                  ))}
                </LayerGroup>
              </Overlay>
            ))}
          </LayersControl>
        </MapContainer>
      )}
    </>
  );
};

const CustomMarker = ({ offer }) => {
  const map = useMap();
  const handleClickPosition = () => {
    map.setView(
      [offer.location.coordinates[1], offer.location.coordinates[0]],
      13,
      { animate: true, duration: 0.8 }
    );
  };
  const offerType = offer.typeOffer[0]?.type || "default";
  const markerIcon = offerIcons[offerType];

  return (
    <Marker
      position={[offer.location.coordinates[1], offer.location.coordinates[0]]}
      icon={markerIcon}
      eventHandlers={{ click: handleClickPosition }}
    />
  );
};
