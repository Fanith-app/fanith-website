import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  items: { q: string; a: string; }[];
}

export default function PopularQuestions({ items }: Props) {
  return (
    <div className="max-w-6xl mx-auto mt-28 px-4 md:px-15">
      <h2 className="text-3xl font-bold text-center text-[#FFFFFF] mb-10">
        Popular Questions
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <Accordion type="single" collapsible key={index}>
            <AccordionItem
              value={`popular-${index}`}
              className="rounded-xl border border-[#FFFFFF]/50"
            >
              <AccordionTrigger className="px-6 py-5 text-md text-[#FFFFFF] font-bold">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 font-semibold text-[#C3C3C3]">
            {item.a}  
          </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
