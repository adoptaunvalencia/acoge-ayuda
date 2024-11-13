import Button from "../button/Button";
import accommodationIcon from "../../assets/icons/accommodation-icon.svg"
import foodIcon from "../../assets/icons/food-icon.svg"
import hygieneIcon from "../../assets/icons/hygiene-icon.svg"
import petsIcon from "../../assets/icons/pets-icon.svg"
import "./filterServices.css"

const FilterServices = ({ onCategoryToggle, activeTypes }) => {
  const isSelected = (category) => activeTypes.includes(category);
  const buttons = [
    {
      text: "Alojamiento",
      icon: accommodationIcon,
      category: "accommodation"
    },
    {
      text: "Comida",
      icon: foodIcon,
      category: "food"
    },
    {
      text: "Higiene",
      icon: hygieneIcon,
      category: "hygiene"
    },
    {
      text: "Mascotas",
      icon: petsIcon,
      category: "pet_fostering"
    }
  ]

  return (
    <section className="filter-services__container">
      <p className="filter__title">Filtros</p>
      <div className="filter__button-container">
        {buttons.map((button) => (
          <Button
            key={button.category}
            text={button.text}
            fontSize="var(--font-size-xs)"
            icon={button.icon}
            textColor={isSelected(button.category) ? "#000000" : "var(--text-secondary)"}
            bgColor={isSelected(button.category) ? "var(--selected-bg-color)" : "#FFFFFF"}
            borderRadius="var(--spacing-xs)"
            action={() => onCategoryToggle(button.category)}
          />
        ))}
      </div>
    </section>
  );
};

export default FilterServices