import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

export function AboutSection() {
  const highlights = [
    {
      icon: Target,
      title: 'Focused Guidance',
      description: 'Personalized counselling tailored to your academic goals and career aspirations.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced counsellors with deep knowledge of North India\'s education landscape.',
    },
    {
      icon: Award,
      title: 'Proven Track Record',
      description: 'Hundreds of successful admissions to top colleges and universities.',
    },
    {
      icon: TrendingUp,
      title: 'End-to-End Support',
      description: 'From college selection to admission completion, we\'re with you every step.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About Campus Point Services
          </h2>
          <p className="text-lg text-muted-foreground">
            We are dedicated to helping students navigate the complex world of college admissions. 
            With specialized expertise in UG and PG programs across North India, particularly Punjab, 
            we provide comprehensive counselling services that turn your educational dreams into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="border-border/40 hover:border-primary/40 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
