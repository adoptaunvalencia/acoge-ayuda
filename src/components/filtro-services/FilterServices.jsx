import Button from "../button/Button";
import accommodationIcon from "../../assets/icons/accommodation-icon.svg"
import foodIcon from "../../assets/icons/food-icon.svg"
import hygieneIcon from "../../assets/icons/hygiene-icon.svg"
import petsIcon from "../../assets/icons/pets-icon.svg"
import "./filterServices.css"

const FilterServices = () => {
  return (
    <>
      <section className="filter-services__container">
        <p className="filter__title">Filtros</p>
        <div className="filter__button-container">
            <Button text="Alojamiento" icon={accommodationIcon} textColor="var(--text-secondary)" bgColor="#FFFFFF" borderRadius="var(--spacing-xs)"/>
            <Button text="Comida" icon={foodIcon} textColor="var(--text-secondary)" bgColor="#FFFFFF" borderRadius="var(--spacing-xs)"/>
            <Button text="Higiene" icon={hygieneIcon} textColor="var(--text-secondary)" bgColor="#FFFFFF" borderRadius="var(--spacing-xs)"/>
            <Button text="Mascotas" icon={petsIcon} textColor="var(--text-secondary)" bgColor="#FFFFFF" borderRadius="var(--spacing-xs)"/>
        </div>
      </section>
    </>
  );
};

export default FilterServices;
