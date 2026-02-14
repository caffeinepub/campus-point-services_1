import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, CheckCircle2 } from 'lucide-react';

export function CoverageSection() {
  const primaryRegion = {
    name: 'Punjab',
    description: 'Our primary focus area with deep local knowledge and extensive college network.',
    cities: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Mohali'],
  };

  const secondaryRegions = [
    'Haryana',
    'Himachal Pradesh',
    'Uttarakhand',
    'Delhi NCR',
    'Jammu & Kashmir',
    'Rajasthan',
  ];

  const benefits = [
    'On-ground familiarity with college campuses',
    'Direct connections with admission offices',
    'Local insights on college culture and environment',
    'Regional scholarship and quota guidance',
    'Support in local language if needed',
  ];

  return (
    <section id="coverage" className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Coverage Area
          </h2>
          <p className="text-lg text-muted-foreground">
            Specialized expertise in North India's top educational institutions, 
            with primary focus on Punjab and surrounding states.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Primary Region */}
          <Card className="border-primary/40 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{primaryRegion.name}</h3>
                  <Badge variant="default" className="mt-1">Primary Focus</Badge>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">{primaryRegion.description}</p>
              <div className="flex flex-wrap gap-2">
                {primaryRegion.cities.map((city) => (
                  <Badge key={city} variant="secondary">
                    {city}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Secondary Regions */}
          <Card className="border-border/40">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/20">
                  <MapPin className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Extended Coverage</h3>
                  <Badge variant="outline" className="mt-1">North India</Badge>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                We also provide counselling services for colleges across other North Indian states.
              </p>
              <div className="flex flex-wrap gap-2">
                {secondaryRegions.map((region) => (
                  <Badge key={region} variant="outline">
                    {region}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <Card className="border-border/40">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              Why Our Regional Expertise Matters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
