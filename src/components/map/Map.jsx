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
import { useFunctionContext } from "../../contexts/function.contexts/FunctionContext";
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

export const Map = ({ maxDistance, selectedCity }) => {
  const { userLocation, categorizedOffers, load, filterOffers } =
    useFunctionContext();
  const [activeType, setActiveType] = useState("all");

  const overlayNames = {
    all: "Todas las ofertas",
    accommodation: "Alojamientos",
    hygiene: "Higiene",
    food: "Comida",
    pet_fostering: "Acogida de mascotas",
  };

  useEffect(() => {
    filterOffers(selectedCity, maxDistance);
  }, [selectedCity, maxDistance, filterOffers]);

  const initialPosition = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [40.42372525496708, -3.678864358280353]; // MADRID

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
          <LayersControl position="topright">
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
  const markerIcon = offerIcons[offerType] || offerIcons.default;
  return (
    <Marker
      position={[offer.location.coordinates[1], offer.location.coordinates[0]]}
      icon={markerIcon}
      eventHandlers={{ click: handleClickPosition }}
    />
  );
};
