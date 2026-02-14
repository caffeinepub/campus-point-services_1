import { useState } from 'react';
import { Menu, X, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentView: 'home' | 'enquiries';
  onNavigate: (view: 'home' | 'enquiries') => void;
}

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    onNavigate('home');
    setMobileMenuOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Coverage', id: 'coverage' },
    { label: 'Process', id: 'process' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'FAQs', id: 'faqs' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo and Brand */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity shrink-0"
          >
            <img
              src="/assets/IMG-20260214-WA0003.jpg"
              alt="Campus Point Services"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="block">
              <div className="text-sm sm:text-lg font-bold text-foreground leading-tight">
                Campus Point Services
              </div>
              <div className="text-xs text-muted-foreground hidden sm:block">
                Guiding Your College Journey
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium"
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              onClick={() => {
                onNavigate('enquiries');
                setMobileMenuOpen(false);
              }}
              className="text-sm font-medium"
            >
              <ClipboardList className="h-4 w-4 mr-1" />
              Enquiries
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border/40">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className="justify-start text-base font-medium"
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                onClick={() => {
                  onNavigate('enquiries');
                  setMobileMenuOpen(false);
                }}
                className="justify-start text-base font-medium"
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                Enquiries
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
