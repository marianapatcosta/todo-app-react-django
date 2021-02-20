import React from "react";
import { Tick } from "../../assets/icons";
import { isEventValid } from "../../utils/utils";
import {
  StyledCheckbox,
  StyledCheckboxToggle,
  StyledCheckboxToggleTick,
  StyledCheckboxLabel,
} from "./StyledCheckbox";

const Checkbox = ({ onChange, checked, name, disabled, label, className }) => {
  const handleCheckboxClick = (event) => isEventValid(event) && onChange();

  return (
    <StyledCheckbox>
      <StyledCheckboxToggle
        role="checkbox"
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        disabled={disabled}
        onClick={handleCheckboxClick}
        onKeyDown={handleCheckboxClick}
      >
        {checked && (
          <StyledCheckboxToggleTick
            alt="checkbox tick"
            src={Tick}
          ></StyledCheckboxToggleTick>
        )}
      </StyledCheckboxToggle>
      <StyledCheckboxLabel
        className={className}
        htmlFor={name || label}
        disabled={disabled}
        onClick={handleCheckboxClick}
      >
        {label}
      </StyledCheckboxLabel>
    </StyledCheckbox>
  );
};

export default Checkbox;
