import styled from "styled-components";
import { Card } from "../../components";

export const StyledAuthentication = styled(Card)`
  margin: 2rem auto;
  width: 80;
  position: relative;

  ${({ isLoading }) =>
    isLoading
      ? `
      filter: blur(0.1rem);
      pointer-events: none; 
      user-select: none;
      `
      : ""}

  @media (min-width: 768px) {
    width: 60%;
  }

  @media (min-width: 1023px) {
    width: 40%;
  }
`;

export const StyledFormTitle = styled.h3`
  color: ${({ theme }) => theme.colors.highlight};
  font-weight: 400;
  text-align: center;
  margin-bottom: 1.3rem;
  font-size: 125%;
`;

export const StyledFormItem = styled.div`
  width: 90%;
  margin: 1.25rem auto;

  @media (min-width: 768px) {
    width: 70%;
  }
`;

export const StyledFormButton = styled.div`
  margin: 4rem auto;
  width: 90%;

  @media (min-width: 768px) {
    width: 70%;
  }
`;

export const StyledFormFooter = styled.footer`
  color: ${({ theme }) => theme.colors.highlight};
  font-style: italic;
  margin: auto 1.25rem;

  &:hover {
    cursor: pointer;
    border-bottom: 0.003rem solid var(--color-pink);
  }
`;
