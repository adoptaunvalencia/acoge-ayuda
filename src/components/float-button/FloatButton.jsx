import { handleCreateOffer } from "../../contexts/function.contexts/FunctionContext";

export const  FloatButton = ({
  icon,
  bgColor,
  disabled = false,
  arialLabel = "Boton de acción",
}) => {
  <button
    className="button-float-component"
    onClick={handleCreateOffer}
    disabled={disabled}
    style={{ backgroundColor: bgColor ? bgColor : "--bg-primary-red" }}
    aria-label={arialLabel}
  >
    {icon && <span className="icon">{icon}</span>}
  </button>;
};
