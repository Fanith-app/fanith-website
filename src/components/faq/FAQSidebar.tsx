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
    <div className="overflow-hidden w-full md:w-auto flex flex-wrap gap-4 justify-center items-center pb-10 pl-5 pt-5">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`whitespace-nowrap w-auto sm:w-50 text-center px-5 py-4 font-medium rounded-full transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 bg-[#202020] text-[#c3c3c3]
            ${
              activeTab === tab
                ? "bg-[#960018] text-[#FFFFFF]"
                : "hover:bg-white hover:text-[#000000]"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
