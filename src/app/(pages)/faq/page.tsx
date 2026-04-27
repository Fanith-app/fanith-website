import FAQWrapper from "@/src/components/ui/FAQWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fanith FAQ – Fan Room, FanDom, App Install & Feature Help",
  description: "Got questions about Fanith? Find answers on how to download the app, join live IPL Fan Rooms, earn FanDom badges, set up your profile, and brand partnership info.",
}

export default function Page() {
  return <FAQWrapper />;
}