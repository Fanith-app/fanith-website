"use client";

import { motion } from "framer-motion";
import { communityContent } from "../lib/data";
import CommunityHighlightCard from "./CommunityHighlightCard";

interface Props {
    activeTab: string;
}

export default function CommunityContent({ activeTab }: Props) {
    const contentList =
        communityContent[activeTab as keyof typeof communityContent] ||
        communityContent.All;

    return (
        <section className="bg-linear-to-r from-[#9e1d1d] to-[#FF0000] lg:[clip-path:ellipse(75%_100%_at_50%_100%)] lg:-mt-50 min-h-[600px]">
            <div className="space-y-0">
                {contentList.map((item, index) => (
                    <CommunityHighlightCard
                        key={`${activeTab}-${index}`}
                        category={item.category}
                        title={item.title}
                        description={item.description}
                        date={item.date}
                        author={item.author}
                        image={item.image}
                    />
                ))}
            </div>
        </section>
    );
}
