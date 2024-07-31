/* eslint-disable react/jsx-one-expression-per-line */
import { Navigation } from "@adminjs/design-system";
import {
  useNavigationResources,
  type SidebarResourceSectionProps,
} from "adminjs";
import React, { FC } from "react";

const SidebarResourceSection: FC<SidebarResourceSectionProps> = ({
  resources,
}) => {
  const elements = useNavigationResources(resources);

  return <Navigation label={"navigation"} elements={elements} />;
};

export default SidebarResourceSection;
