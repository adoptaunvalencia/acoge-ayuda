import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useFetch from "../../hooks/useFetch";

const { BaseLayer, Overlay } = LayersControl;

export const Map = () => {
  const { data: assistanceOffers, stateLoad } = useFetch({
    uri: "https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer",
    method: "GET",
  });

  const categorizedOffers = {
    accommodation: [],
    hygiene: [],
    food: [],
    pet_fostering: [],
    all: [],
  };

  assistanceOffers?.assistancesOffers.forEach((offer) => {
    offer.typeOffer.forEach((item) => {
      categorizedOffers.all.push(offer);
      if (categorizedOffers[item.type]) {
        categorizedOffers[item.type].push(offer);
      }
    });
  });

  return (
    <MapContainer
      center={[39.405, -0.38]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        <Overlay name="Todas las ofertas">
          <LayerGroup>
            {categorizedOffers.all.map((offer) => (
              <Marker
                key={offer._id}
                position={[
                  offer.location.coordinates[1],
                  offer.location.coordinates[0],
                ]}
              >
                <Popup>
                  <strong>{offer.title}</strong>
                  <br />
                  {offer.description}
                  <br />
                  Ciudad: {offer.city}
                  <br />
                  Dirección: {offer.address}
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </Overlay>

        {Object.keys(categorizedOffers).map((type) => {
          if (type !== "all") {
            return (
              <Overlay
                key={type}
                name={type.charAt(0).toUpperCase() + type.slice(1)}
              >
                <LayerGroup>
                  {categorizedOffers[type].map((offer) => (
                    <Marker
                      key={offer._id}
                      position={[
                        offer.location.coordinates[1],
                        offer.location.coordinates[0],
                      ]}
                    >
                      <Popup>
                        <strong>{offer.title}</strong>
                        <br />
                        {offer.description}
                        <br />
                        Ciudad: {offer.city}
                        <br />
                        Dirección: {offer.address}
                      </Popup>
                    </Marker>
                  ))}
                </LayerGroup>
              </Overlay>
            );
          }
          return null;
        })}
      </LayersControl>
    </MapContainer>
  );
};
