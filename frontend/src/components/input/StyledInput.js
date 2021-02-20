import styled from "styled-components";

export const StyledInputWrapper = styled.div`
  margin: 1rem 0;
  width: 100%;
`;

export const StyledInputField = styled.div`
  position: relative;
`;

export const StyledInput = styled.input`
  display: block;
  color: ${({ theme }) => theme.colors.font};
  width: 100%;
  border: 0.063rem solid ${({ theme }) => theme.colors.transparent};
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0.063rem 0.25rem ${({ theme }) => theme.colors.shadow};
  box-sizing: border-box;
  padding: 0.3rem 0.625rem;
  position: relative;
  height: 2rem;

  :focus {
    outline: 0.125rem solid ${({ theme }) => theme.colors.highlight};
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.font};
    -webkit-box-shadow: 0 0 0 2rem ${({ theme }) => theme.colors.primary} inset !important;
  }

  ${({ errorText, theme }) =>
    `border-color: ${errorText ? theme.colors.red : ""};
    `}
`;
export const StyledLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.highlight};
  margin-bottom: 0.3rem;
  margin-left: 0.3rem;
  font-size: 95%;
`;

export const StyledInputIcon = styled.img`
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 5%;
  filter: invert(23%) sepia(43%) saturate(3232%) hue-rotate(100deg)
    brightness(92%) contrast(104%);
`;

export const StyledInputError = styled.p`
  color: ${({ theme }) => theme.colors.red};
  font-weight: bold;
  font-size: 90%;
  margin-top: 0.3rem;
`;
