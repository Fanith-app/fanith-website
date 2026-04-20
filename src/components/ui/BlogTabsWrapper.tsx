"use client";

import CommunityHeroTabs from "@/src/components/CommunityHeroTabs";
import { useState } from "react";

export default function BlogTabsWrapper({ categories }: any) {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <CommunityHeroTabs
      tabs={[{ id: "all", name: "All" }, ...categories]}
      active={activeTab}
      onChange={(tab) => setActiveTab(tab.name)}
    />
  );
}