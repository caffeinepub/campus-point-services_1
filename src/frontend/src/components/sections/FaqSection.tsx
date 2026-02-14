import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FaqSection() {
  const faqs = [
    {
      question: 'What services does Campus Point Services provide?',
      answer: 'We provide comprehensive UG and PG admission counselling including course selection, college shortlisting, application support, documentation guidance, scholarship assistance, and follow-up support throughout the admission process.',
    },
    {
      question: 'Which regions do you specialize in?',
      answer: 'Our primary focus is Punjab, with extensive coverage across North India including Haryana, Himachal Pradesh, Uttarakhand, Delhi NCR, Jammu & Kashmir, and Rajasthan. We have deep local knowledge and connections with top colleges in these regions.',
    },
    {
      question: 'When should I start the counselling process?',
      answer: 'Ideally, start 6-12 months before your intended admission date. For UG admissions, begin in Class 12; for PG admissions, start in your final year of graduation. However, we can assist at any stage of your admission journey.',
    },
    {
      question: 'Do you charge for initial consultation?',
      answer: 'No, we offer a free initial consultation call to understand your goals and explain how we can help. This allows you to make an informed decision about our services without any commitment.',
    },
    {
      question: 'Can you help with scholarship applications?',
      answer: 'Yes! We provide comprehensive guidance on identifying eligible scholarships, preparing applications, and meeting all requirements. We help maximize your chances of securing financial aid and merit-based scholarships.',
    },
    {
      question: 'What documents do I need for the counselling process?',
      answer: 'Typically, you\'ll need academic transcripts, test scores (if applicable), identity proof, and any relevant certificates. We\'ll provide a detailed checklist during your initial consultation based on your specific requirements.',
    },
    {
      question: 'Do you assist with entrance exam preparation?',
      answer: 'While our primary focus is admission counselling, we can guide you on entrance exam requirements, timelines, and preparation strategies. We can also recommend trusted coaching institutes if needed.',
    },
    {
      question: 'How long does the admission process take?',
      answer: 'The timeline varies by college and program, typically ranging from 2-6 months. We help you stay on track with all deadlines and ensure timely submission of applications and documents.',
    },
  ];

  return (
    <section id="faqs" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our counselling services and the admission process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/40 rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
