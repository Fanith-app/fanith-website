interface Props {
  activeTab: string;
  onChange: (tab: string) => void;
}

const tabs = [
  "Installation Guide",
  "Brand & Sponsorships",
  "FanDom",
  "Beta Testing",
  "FanPedia",
  "Policies",
];

export default function FAQSidebar({ activeTab, onChange }: Props) {
  return (
    <div className="bg-white rounded-2xl lg:rounded-l-none shadow-[0_4px_6px_rgba(0,0,0,0.25)] overflow-hidden w-full md:w-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`w-full text-center px-6 py-4 font-medium border-b last:border-none transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95
            ${
              activeTab === tab
                ? "bg-[#FF0000] text-[#FFFFFF]"
                : "hover:bg-white text-[#000000]"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
