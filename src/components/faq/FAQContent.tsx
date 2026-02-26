import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  items: { q: string; a: string }[];
}

export default function FAQContent({ items }: Props) {
  return (
    <Accordion type="single" collapsible className="space-y-5 pl-0 sm:pl-10">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`faq-${index}`}
          className="rounded-xl border border-[#FFFFFF]/50"
        >
          <AccordionTrigger className="px-6 py-5 text-md text-[#FFFFFF] font-bold text-left">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5 font-semibold text-[#C3C3C3]">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
