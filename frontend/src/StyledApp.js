import styled, { createGlobalStyle } from "styled-components";

export const StyledApp = styled.div`
  height: 100%;
  max-width: 100%;

  @media (min-width: 768px) {
    width: 100%;
  }
`;

export const StyledAppSpacer = styled.div`
  left: 0;
  top: 0;
  height: 5rem;
  width: 100%;
`;


export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.font};
    font-family: "Segoe UI", "Helvetica Neue", sans-serif;
    font-size: 0.9rem;
    line-height: 1.2rem;

    @media (min-width: 768px) {
      font-size: 1rem;;
    }
  }

  * {
    margin: 0;
    padding: 0;
  }
  
  * :focus {
    outline: 0.125rem solid ${({ theme }) => theme.colors.highlight};
  }

  * :focus:not(:focus-visible) {
    border-color: ${({theme})=> theme.colors.highlight};
    outline: none;
  }

`;
