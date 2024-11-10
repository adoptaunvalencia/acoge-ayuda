import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import useFetch from "../../hooks/useFetch";

const FunctionContext = createContext();

export const FunctionProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(null)
  const [categorizedOffers, setCategorizedOffers] = useState({
    all: [],
    accommodation: [],
    hygiene: [],
    food: [],
    pet_fostering: [],
  });

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

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
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
  };

  const filterOffers = useCallback(
    (selectedCity, maxDistance) => {
      if (!assistanceOffers?.assistancesOffers) return;

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
    },
    [assistanceOffers, userLocation]
  );

  return (
    <FunctionContext.Provider
      value={{
        userLocation,
        showPopup, setShowPopup,
        categorizedOffers,
        load,
        filterOffers,
      }}
    >
      {children}
    </FunctionContext.Provider>
  );
};

export const useFunctionContext = () => {
  return useContext(FunctionContext);
};