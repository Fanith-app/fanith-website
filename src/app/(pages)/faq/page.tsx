"use client";
import Banner from "@/src/components/common/Banner";
import FAQContent from "@/src/components/faq/FAQContent";
import FAQSidebar from "@/src/components/faq/FAQSidebar";
import PopularQuestions from "@/src/components/faq/PopularQuestion";
import SupportCard from "@/src/components/SupportCard";
import { faqData } from "@/src/lib/data";
import { useState } from "react";

const page = () => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof faqData>("Installation Guide");

  const handleTabChange = (tab: string) => {
    if (tab in faqData) {
      setActiveTab(tab as keyof typeof faqData);
    }
  };

  return (
    <main className="w-full space-y-4 bg-[#141414]">
      <div className="relative  ">
        {/* Keep the Banner content above the glow */}
        <div className="relative z-10">
          <Banner
            title="How Can We Help You?"
            description="Find answers about installation, features, FanDom, FanPedia, policies, and beta testing."
            backgroundImage="/assets/images/faq-page-banner.webp"
            bottomcurve="lg:h-150 lg:[clip-path:ellipse(70%_90%_at_50%_0%)]  "
          />
        </div>

        {/* Full-width curved glow element (Tailwind only) */}
        {/* <div
          aria-hidden
          className={
            "pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-10 " +
            "lg:w-200 xl:w-250 2xl:w-300 max-w-none h-60 rounded-t-[100%] " +
            "bg-[radial-gradient(ellipse_at_50%_0%,rgba(160,16,16,0.88)_0%,rgba(128,12,12,0.6)_30%,rgba(96,10,10,0.25)_55%,transparent_85%)] " +
            "blur-[30px] z-0"+"overflow-hidden"
          }
        /> */}
        
      </div>
      
      <div className="max-w-full mx-auto py-10 px-4 lg:px-0 lg:pr-10 ">
        <FAQSidebar activeTab={activeTab} onChange={handleTabChange} />
        <FAQContent items={faqData[activeTab].faqs} />
      </div>
      
      <PopularQuestions items={faqData[activeTab].popular} />
      
      <SupportCard />
    </main>
  );
};

export default page;