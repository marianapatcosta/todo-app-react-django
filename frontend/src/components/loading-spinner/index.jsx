import React, { useEffect } from "react";
import {StyledLoadingSpinner, StyledLoadingSpinnerOverlay} from "./StyledLoadingSpinner";

const LoadingSpinner = () => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "scroll";
    };
  }, []);

  return (
    <StyledLoadingSpinnerOverlay >
      <StyledLoadingSpinner />
    </StyledLoadingSpinnerOverlay>
  );
};

export default LoadingSpinner;
