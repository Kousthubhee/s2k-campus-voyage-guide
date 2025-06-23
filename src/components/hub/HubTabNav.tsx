
import React from "react";

interface HubTabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { key: "qa", label: "Q&A" },
  { key: "blogs", label: "Blogs" },
  { key: "reels", label: "Reels" },
  { key: "polls", label: "Polls" },
];

export function HubTabNav({ activeTab, setActiveTab }: HubTabNavProps) {
  return (
    <div className="mt-4 flex justify-center space-x-4">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`px-4 py-2 rounded ${activeTab === tab.key ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
