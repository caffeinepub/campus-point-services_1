import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, School, FileCheck, Award, MapPin, Calendar } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: BookOpen,
      title: 'Course Selection',
      description: 'Expert guidance on choosing the right UG/PG program aligned with your interests, strengths, and career goals.',
    },
    {
      icon: School,
      title: 'College Shortlisting',
      description: 'Comprehensive analysis and shortlisting of top colleges in Punjab and North India based on your profile and preferences.',
    },
    {
      icon: FileCheck,
      title: 'Application Support',
      description: 'Complete assistance with application forms, documentation, and submission to ensure error-free applications.',
    },
    {
      icon: Calendar,
      title: 'Timeline Management',
      description: 'Stay on track with important deadlines, entrance exams, and admission schedules throughout the process.',
    },
    {
      icon: Award,
      title: 'Scholarship Guidance',
      description: 'Identify and apply for scholarships, financial aid, and merit-based opportunities to reduce education costs.',
    },
    {
      icon: MapPin,
      title: 'Campus Visits',
      description: 'Coordinate and guide campus visits to help you make informed decisions about your future college.',
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive counselling services designed to simplify your admission journey 
            and maximize your chances of getting into your dream college.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-border/40 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
