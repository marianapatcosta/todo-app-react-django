import React, { useEffect, useState } from "react";
import {
  StyledSearchWrapper,
  StyledSearch,
  StyledSearchIcon,
  StyledMoStyledSearchIconClear,
} from "./StyledSearch";
import { MagnifyingGlass } from "../../assets/icons";

const Search = ({ className, value, isExpansible, onChange, onClear }) => {
  const [isExpanded, setIsExpanded] = useState();

  useEffect(() => setIsExpanded(isExpansible ? false : true), [isExpansible]);

  const toggleIsExpanded = () =>
    isExpansible && setIsExpanded((prevIsExpanded) => !prevIsExpanded);

  const handleClear = () => {
    if (isExpansible) setIsExpanded(false);
    onClear();
  };

  return (
    <StyledSearchWrapper
      className={className}
      isExpanded={!isExpansible ? true : isExpanded}
    >
      <StyledSearch
        maxLength={150}
        placeholder={isExpanded ? "Search" : ""}
        type="search"
        value={value}
        onChange={onChange}
      />
      {!value ? (
        <StyledSearchIcon
          alt="magnifier icon"
          src={MagnifyingGlass}
          isExpansible={isExpansible}
          isExpanded={!isExpansible ? true : isExpanded}
          onClick={toggleIsExpanded}
        />
      ) : (
        <StyledMoStyledSearchIconClear onClick={handleClear}>
          x
        </StyledMoStyledSearchIconClear>
      )}
    </StyledSearchWrapper>
  );
};

export default Search;
