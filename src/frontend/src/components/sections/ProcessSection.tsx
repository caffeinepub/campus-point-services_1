import { Card, CardContent } from '@/components/ui/card';
import { Phone, ClipboardList, Search, FileText, CheckCircle } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      icon: Phone,
      title: 'Initial Consultation',
      description: 'Free counselling call to understand your goals, preferences, and academic background.',
    },
    {
      icon: ClipboardList,
      title: 'Profile Assessment',
      description: 'Comprehensive evaluation of your academic records, test scores, and extracurricular achievements.',
    },
    {
      icon: Search,
      title: 'College Shortlisting',
      description: 'Curated list of colleges matching your profile, preferences, and career aspirations.',
    },
    {
      icon: FileText,
      title: 'Application Support',
      description: 'Guidance on applications, documentation, essays, and submission to selected colleges.',
    },
    {
      icon: CheckCircle,
      title: 'Follow-up & Admission',
      description: 'Continuous support through admission results, counselling rounds, and final enrollment.',
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our proven 5-step process ensures you get personalized guidance 
            from initial consultation to final admission.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border/40 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="border-border/40 hover:border-primary/40 transition-colors h-full">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        {/* Step Number */}
                        <div className="relative">
                          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="p-4 rounded-xl bg-primary/10">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
