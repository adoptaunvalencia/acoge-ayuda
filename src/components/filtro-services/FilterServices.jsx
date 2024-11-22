import Button from "../button/Button";
import accommodationIcon from "../../assets/icons/accommodation-icon.svg";
import foodIcon from "../../assets/icons/food-icon.svg";
import hygieneIcon from "../../assets/icons/hygiene-icon.svg";
import petsIcon from "../../assets/icons/pets-icon.svg";
import othersIcon from "../../assets/icons/others-icon.svg";
import "./filterServices.css";

const FilterServices = ({ onCategoryToggle, activeTypes }) => {
  const isSelected = (category) => activeTypes.includes(category);
  const buttons = [
    {
      text: "Alojamiento",
      icon: accommodationIcon,
      category: "accommodation",
    },
    {
      text: "Comida",
      icon: foodIcon,
      category: "food",
    },
    {
      text: "Higiene",
      icon: hygieneIcon,
      category: "hygiene",
    },
    {
      text: "Mascotas",
      icon: petsIcon,
      category: "pet_fostering",
    },
    {
      text: "Otros",
      icon: othersIcon,
      category: "other",
    },
  ];

  return (
    <section className="filter-services__container">
      <div className="filter__button-container">
        {buttons.map((button) => (
          <Button
            key={button.category}
            text={button.text}
            fontSize="var(--font-size-xs)"
            icon={button.icon}
            textColor={
              isSelected(button.category) ? "#000000" : "var(--text-secondary)"
            }
            bgColor={
              isSelected(button.category)
                ? "var(--selected-bg-color)"
                : "#FFFFFF"
            }
            borderRadius="var(--spacing-xs)"
            action={() => onCategoryToggle(button.category)}
          />
        ))}
      </div>
      <p className="filter__title">
        <span>
          <span role="img" aria-label="Activo">
            Activo🟡
          </span>
          <span role="img" aria-label="Desactivado">
            ⚪Inactivo
          </span>
        </span>
      </p>
    </section>
  );
};

export default FilterServices;
