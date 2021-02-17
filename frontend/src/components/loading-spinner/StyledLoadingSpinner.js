import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
`;

export const StyledLoadingSpinner = styled.div`
  border: 1rem solid ${({ theme }) => theme.colors.secondary};
  border-top: 1rem solid ${({ theme }) => theme.colors.highlight};
  border-bottom: 1rem solid ${({ theme }) => theme.colors.highlight};
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  animation: ${spin} 2s linear infinite;
  -webkit-animation: ${spin} 2s linear infinite; /* Safari */
`;

export const StyledLoadingSpinnerOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.shadow};
  opacity: 0.5;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
