import React from "react";
import { TodosBoard, TodosOverview } from "..";
import { Tabs } from "../../components";

const Todos = () => {
  const tabsMetadata = [
    {
      label: "Overview",
      renderContent: () => <TodosOverview />,
    },
    {
      label: "Board",
      renderContent: () => <TodosBoard />,
    },
  ];
  return <Tabs tabsMetadata={tabsMetadata} tabsPurpose="separator" />;
};

export default Todos;
