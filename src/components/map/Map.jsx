import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  LayerGroup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { FunctionContext } from "../../contexts/function.contexts/FunctionContext";
import { ReducerContext } from "../../contexts/reducer.contexts/ReducerContext";
import "leaflet/dist/leaflet.css";
import def from "../../assets/icons/icon_map.svg";
import Modal from "../modal/Modal";
import Card from "../card/Card";

const defaultIcon = new L.Icon({
  iconUrl: def,
  iconSize: [72, 72],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const Map = ({ offers }) => {
  const { userLocation } = useContext(FunctionContext);
  const {
    stateIsAuth: { isAuth, user },
    dispatchOffer,
  } = useContext(ReducerContext);

  const initialPosition =
    userLocation.latitude && userLocation.longitude
      ? [userLocation.latitude, userLocation.longitude]
      : [40.42372525496708, -3.678864358280353]; // MADRID

  return (
    <MapContainer
      center={initialPosition}
      zoom={5}
      maxZoom={13}
      scrollWheelZoom={false}
      style={{ height: "35vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LayerGroup>
        {offers?.filter(offer => offer.status !== false).map((offer) => (
          <CustomMarker
            key={offer._id}
            offer={offer}
            dispatchOffer={dispatchOffer}
            isAuth={isAuth}
            user={user}
          />
        ))}
      </LayerGroup>
    </MapContainer>
  );
};

const CustomMarker = ({ offer, dispatchOffer, isAuth, user }) => {
  const map = useMap();
  const [showPopup, setShowPopup] = useState(false);

  const handleClickPosition = () => {
    map.setView(
      [offer.location.coordinates[1], offer.location.coordinates[0]],
      13,
      { animate: true, duration: 0.8 }
    );
    dispatchOffer({ type: "SET_OFFER", payload: offer });
    setShowPopup(true);
  };

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
          offer.location.coordinates[0],
        ]}
        icon={defaultIcon}
        eventHandlers={{ click: handleClickPosition }}
      />
    </>
  );
};
