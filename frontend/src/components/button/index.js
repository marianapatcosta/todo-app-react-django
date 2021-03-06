import React, { forwardRef } from "react";
import { StyledButton, StyledButtonLarge } from "./StyledButton";

const Button = forwardRef(({ disabled, onClick, type, label, isLarge, className }, ref) => {
  return isLarge ? (
    <StyledButtonLarge
      className={className}
      type={type || "button"}
      disabled={disabled}
      ref={ref}
      onClick={onClick}
    >
      {label}
    </StyledButtonLarge>
  ) : (
    <StyledButton
      className={className}
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
});

export default Button;
