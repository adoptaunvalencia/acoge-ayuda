import Button from "../button/Button";
import accommodationIcon from "../../assets/icons/accommodation-icon.svg"
import foodIcon from "../../assets/icons/food-icon.svg"
import hygieneIcon from "../../assets/icons/hygiene-icon.svg"
import petsIcon from "../../assets/icons/pets-icon.svg"
import "./filterServices.css"

const FilterServices = ({ onCategoryToggle }) => {
  return (
    <>
      <section className="filter-services__container">
        <p className="filter__title">Filtros</p>
        <div className="filter__button-container">
          <Button
            text="Alojamiento"
            fontSize="var(--font-size-xs)"
            icon={accommodationIcon}
            textColor="var(--text-secondary)"
            bgColor="#FFFFFF"
            borderRadius="var(--spacing-xs)"
            action={() => onCategoryToggle('accommodation')}
          />
          <Button
            text="Comida"
            fontSize="var(--font-size-xs)"
            icon={foodIcon}
            textColor="var(--text-secondary)"
            bgColor="#FFFFFF"
            borderRadius="var(--spacing-xs)"
            action={() => onCategoryToggle('food')}
          />
          <Button
            text="Higiene"
            fontSize="var(--font-size-xs)"
            icon={hygieneIcon}
            textColor="var(--text-secondary)"
            bgColor="#FFFFFF"
            borderRadius="var(--spacing-xs)"
            action={() => onCategoryToggle('hygiene')}
          />
          <Button
            text="Mascotas"
            fontSize="var(--font-size-xs)"
            icon={petsIcon}
            textColor="var(--text-secondary)"
            bgColor="#FFFFFF"
            borderRadius="var(--spacing-xs)"
            action={() => onCategoryToggle('pet_fostering')}
          />
        </div>
      </section>
    </>
  );
};

export default FilterServices;
