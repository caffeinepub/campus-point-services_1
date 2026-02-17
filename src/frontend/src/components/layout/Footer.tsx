import { Separator } from '@/components/ui/separator';
import { Heart, Phone, Mail, ExternalLink, Copy } from 'lucide-react';
import { CONTACT_PHONE, CONTACT_EMAIL } from '@/constants/contact';
import { toast } from 'sonner';

interface FooterProps {
  currentView: 'home' | 'enquiries';
  onNavigate: (view: 'home' | 'enquiries') => void;
}

export function Footer({ currentView, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'campus-point-services'
  );

  const websiteUrl = 'campus-point-services.icp0.io';
  const websiteFullUrl = `https://${websiteUrl}`;

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const copyWebsiteUrl = () => {
    navigator.clipboard.writeText(websiteFullUrl);
    toast.success('Website URL copied to clipboard!');
  };

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <img
              src="/assets/IMG-20260214-WA0003.jpg"
              alt="Campus Point Services"
              className="h-16 w-auto object-contain"
            />
            <p className="text-sm text-muted-foreground max-w-xs">
              Expert UG & PG admission counselling for top colleges in North India, with specialized focus on Punjab.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={CONTACT_PHONE.tel}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{CONTACT_PHONE.display}</span>
              </a>
              <a
                href={CONTACT_EMAIL.mailto}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{CONTACT_EMAIL.display}</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground group">
                <ExternalLink className="h-4 w-4" />
                <a
                  href={websiteFullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors select-all"
                >
                  {websiteUrl}
                </a>
                <button
                  onClick={copyWebsiteUrl}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
                  title="Copy URL"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-primary transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('process')}
                  className="hover:text-primary transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('enquiries')}
                  className="hover:text-primary transition-colors"
                >
                  View Enquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get In Touch</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ready to start your college journey? Reach out to us for personalized admission counselling.
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-primary hover:underline"
            >
              Contact Us →
            </button>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Campus Point Services. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
