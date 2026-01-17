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
    <Accordion type="single" collapsible className="space-y-5">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`faq-${index}`}
          className="rounded-xl border border-[#111111]"
        >
          <AccordionTrigger className="px-6 py-5 text-md text-[#111111] font-bold text-left">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5 font-semibold text-[#333333]/60">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
