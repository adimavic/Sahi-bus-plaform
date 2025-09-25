'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: 'How can I find the best last minute bus deals?',
    answer:
      'Flexibility is key. Try searching for different dates and times. Also, consider different bus operators as prices can vary. Signing up for alerts can also help you grab a deal when prices drop.',
  },
  {
    question: 'How can I stay updated on bus deals and low fares?',
    answer:
      "You can subscribe to our newsletter for weekly deals. We also recommend following bus operators on social media, as they often post exclusive offers there.",
  },
  {
    question: "What happens after I've booked my bus ticket?",
    answer:
      "You'll receive a confirmation email with your e-ticket. You can usually show this on your phone when boarding, but it's a good idea to check the operator's policy. Some may require a printout.",
  },
  {
    question: 'Where should I book a bus ticket to right now?',
    answer:
      "That depends on your sense of adventure! Popular routes right now include scenic journeys through the mountains or quick trips to vibrant cities. Check our 'Popular Routes' section for some inspiration.",
  },
];

export function Faq() {
  return (
    <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">
                Finding bus deals: frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                        {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
        </div>
    </section>
  );
}
