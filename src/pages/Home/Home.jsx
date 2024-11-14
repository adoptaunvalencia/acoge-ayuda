import { useContext, useEffect, useState } from "react";
import { ReducerContext } from "../../contexts/reducer.contexts/ReducerContext";
import { FunctionContext } from "../../contexts/function.contexts/FunctionContext";
import Button from "../../components/button/Button";
import FilterServicer from "../../components/filtro-services/FilterServices";
import Modal from "../../components/modal/Modal";
import WelcomePopUp from "../../components/welcome-pop-up/WelcomePopUp";
import { Map } from "../../components/map/Map";
import CardList from "../../components/card/CardList";
import "./Home.css";
import Select from "../../components/select/Select";

const Home = () => {
  const {
    stateIsAuth: { user, isAuth },
    stateOffer: { offers, offers_map },
  } = useContext(ReducerContext);

  const {
    showPopup,
    setShowPopup,
    filterOffers,
    userLocation,
    setUserLocation,
  } = useContext(FunctionContext);

  const selectOptionsObject = {
    1: "1km",
    2: "2km",
    3: "3km",
  };

  const selectOptionsLocation = {
    home: "Home",
    location: "Actually Location",
  };

  const allCategories = ["accommodation", "food", "hygiene", "pet_fostering"];
  const [activeTypes, setActiveTypes] = useState(allCategories);

  const handleChangeSelect = (value, type) => {
    setUserLocation((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const selectPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation((prev) => ({
        ...prev,
        latitude,
        longitude,
      }));
    });
  };

  const handleSendFilter = () => {
    if (
      !userLocation.latitude ||
      !userLocation.longitude ||
      !userLocation.radius
    ) {
      console.error("Error: Coordenadas o radio no definidos correctamente");
      return;
    }

    console.log("Coordenadas actuales (Home):", userLocation);
    console.log("Distancia máxima (Home):", userLocation.radius);

    filterOffers(null, userLocation.radius);
  };

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
    <div className="home__container-sections">
      <section className="home__container">
        <div className="home__content-title">
          <h2>Resultados de Ayuda Disponibles en Tu Zona</h2>
        </div>
        <div className="home__content-description">
          <p>
            Explora las opciones de ayuda cercanas para alojamiento, comida y
            apoyo en situaciones de emergencia
          </p>
        </div>
        <div className="home__content-buttons">
          <Select
            label="Ubicación"
            name="filer_location"
            id="filer_location"
            defaultOption={true}
            options={selectOptionsLocation}
            onChange={(value) => handleChangeSelect(value, "location")}
          />
          <Select
            label="Distancia máxima"
            name="filer_offers"
            id="filer_offers"
            defaultOption={true}
            options={selectOptionsObject}
            onChange={(value) => handleChangeSelect(value, "radius")}
          />
          <Button
            text="Buscar"
            bgColor="var(--bg-primary-red)"
            textColor="var(--text-primary-light)"
            borderRadius="50px"
            action={() => {
              selectPosition();
              handleSendFilter();
            }}
          />
        </div>
        <hr></hr>
      </section>
      <section>
        <FilterServicer
          onCategoryToggle={handleCategoryToggle}
          activeTypes={activeTypes}
        />
      </section>
      {!isAuth && (
        <Modal
          isModalOpen={showPopup}
          handleCloseModal={() => setShowPopup(false)}
        >
          <WelcomePopUp />
        </Modal>
      )}
      <section className="section__map">
        <Map activeTypes={activeTypes} maxDistance={userLocation.radius} />
      </section>
      <section className="section_card-offers">
        <CardList offers={offers} activeTypes={activeTypes} />
      </section>
    </div>
  );
};

export default Home;
