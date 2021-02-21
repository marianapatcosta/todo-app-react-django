import React, { useState } from "react";
import { Tab } from "../index";
import {
  StyledTabs,
  StyledTabsListWrapper,
  StyledTabsList,
  StyledTabsContent,
  StyledTabsSpacer,
} from "./StyledTabs";

const Tabs = ({
  disabled,
  tabsPurpose,
  tabsMetadata,
  className,
  ...otherProps
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(
    +localStorage.getItem("activeTab") || 0
  );

  const onClickTab = (tabIndex) => {
    setActiveTabIndex(tabIndex);
    localStorage.setItem("activeTab", tabIndex);
  };

  return (
    <StyledTabs className={className} {...otherProps}>
      <StyledTabsListWrapper>
        <StyledTabsList
          disabled={disabled}
          role="tablist"
          aria-label={`Select ${tabsPurpose}`}
        >
          {tabsMetadata.map(({ label }, index) => (
            <Tab
              key={`tab-${index + Math.random()}`}
              label={label}
              isActive={index === activeTabIndex}
              onClick={() => onClickTab(index)}
            />
          ))}
        </StyledTabsList>
      </StyledTabsListWrapper>
      {/*    {tabsMetadata.map(({ label, renderContent }, index) => (
        <StyledTabsContent
          key={`tab-panel-${index + Math.random()}`}
          role="tabpanel"
          aria-labelledby={label}
          aria-hidden={index !== activeTabIndex}
          hidden={index !== activeTabIndex}
        >
          <StyledTabsSpacer />
          {renderContent()}
        </StyledTabsContent>
      ))}*/}
      <StyledTabsContent
        role="tabpanel"
        aria-labelledby={tabsMetadata[activeTabIndex].label}
      >
        <StyledTabsSpacer />
        {tabsMetadata[activeTabIndex].renderContent()}
      </StyledTabsContent>
    </StyledTabs>
  );
};

export default Tabs;
