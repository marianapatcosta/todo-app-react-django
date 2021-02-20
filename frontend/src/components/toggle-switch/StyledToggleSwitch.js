import styled from "styled-components";

export const StyledToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 3.5rem;
  font-size: 95%;
  color: ${({ theme }) => theme.colors.highlight};
  font-style: italic;

  ${({ label }) =>
    !!label
      ? `
      width: auto;
        `
      : ""}

  ${({ disabled, theme  }) =>
    disabled
      ? `
      color: ${theme.colors.disabled};
      :hover {
        cursor: default;
      }
    `
      : ""}
`;

export const StyledToggleSwitchLabel = styled.span`
  line-height: 0.75rem;
  padding: 0 0.125rem;
  align-self: center;
  white-space: nowrap;
  user-select: none;

  :hover {
    cursor: pointer;
  }

  ${({ disabled, theme }) =>
    disabled
      ? `
      color: ${theme.colors.disabled};
      :hover {
        cursor: default;
      }
    `
      : ""}
`;

export const StyledToggleSwitchSlider = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-radius: 2rem;
  border: 0.063rem solid ${({ theme }) => theme.colors.highlight};
  cursor: pointer;
  height: 1rem;
  width: 2.4rem;
  line-height: 85%;
  position: relative;
  padding: 0.125rem;
  transition: 0.4s;
  -webkit-transition: 0.4s;
  margin-left: 0.5rem;

  :hover {
    opacity: 0.75;
  }

  :before {
    background-color: ${({ theme }) => theme.colors.primary};
    opacity: 0.5;
    border-radius: 50%;
    content: "";
    height: 1.25rem;
    width: 1.25rem;
    left: -0.063rem;
    bottom: 0.015rem;
    position: absolute;
    transition: 0.4s;
    -webkit-transition: 0.4s;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }

  ${({ disabled, theme }) =>
    disabled
      ? `
      border: 0.063rem solid ${theme.colors.disabled};
      opacity: 0.3;
      pointer-events: none;
      :before {
        background-color: ${ theme.colors.disabled};
        opacity: 0.8;
      }

      :hover {
        cursor: default;
      }
     `
      : ""}

  ${({ checked, theme }) =>
    checked
      ? `
      background-color: ${theme.colors.secondary};
      :before {
        opacity: 1;
        transform: translateX(1.5rem);
      }
    `
      : ""}
`;

export const StyledToggleInput = styled.input`
  position: absolute;
  opacity: 0;
  z-index: 1;
  // when focus, adds a border to its sibling StyledCheckboxToggle
  :focus + ${StyledToggleSwitchSlider} {
    outline: 0.125rem solid ${({ theme }) => theme.colors.highlight};
  }

  :focus:not(:focus-visible) + ${StyledToggleSwitchSlider} {
    outline: none;
  }
`;
