import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      program: 'B.Tech Computer Science',
      location: 'Chandigarh',
      rating: 5,
      text: 'Campus Point Services made my college admission journey so smooth. Their guidance helped me get into my dream engineering college in Chandigarh. Highly recommended!',
    },
    {
      name: 'Rajat Singh',
      program: 'MBA',
      location: 'Ludhiana',
      rating: 5,
      text: 'The team\'s knowledge of Punjab colleges is exceptional. They helped me navigate the entire MBA admission process and even secured a scholarship. Thank you!',
    },
    {
      name: 'Ananya Verma',
      program: 'B.Sc Nursing',
      location: 'Patiala',
      rating: 5,
      text: 'Professional, knowledgeable, and always available to answer questions. They guided me through every step and I got admission to my preferred nursing college.',
    },
    {
      name: 'Karan Mehta',
      program: 'BBA',
      location: 'Mohali',
      rating: 5,
      text: 'Excellent counselling service! They understood my career goals and suggested colleges that perfectly matched my profile. Very satisfied with their support.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Student Success Stories
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from students who achieved their college admission goals with our guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/40 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col space-y-4">
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-primary/40" />

                  {/* Rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>

                  {/* Student Info */}
                  <div className="pt-4 border-t border-border/40">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.program} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
