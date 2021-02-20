import React from "react";
import {
  StyledInputWrapper,
  StyledInput,
  StyledInputField,
  StyledLabel,
  StyledInputIcon,
  StyledInputError,
} from "./StyledInput";

const Input = ({
  id,
  label,
  type,
  autoComplete = "off",
  maxLength,
  value,
  placeholder,
  errorText,
  icon,
  iconText,
  onChange,
  onBlur,
  onIconClick,
}) => {
  return (
    <StyledInputWrapper>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInputField>
        <StyledInput
          id={id}
          errorText={errorText}
          type={type || "text"}
          maxLength={maxLength || 150}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
        ></StyledInput>
        {icon && (
          <StyledInputIcon
            alt={iconText}
            src={icon}
            onClick={onIconClick}
            role={onIconClick ? "button" : ""}
            tabIndex={onIconClick ? "0" : "-1"}
          />
        )}
      </StyledInputField>
      {!!errorText && <StyledInputError>{errorText}</StyledInputError>}
    </StyledInputWrapper>
  );
};

export default Input;
