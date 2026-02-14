import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { CoverageSection } from './components/sections/CoverageSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FaqSection } from './components/sections/FaqSection';
import { ContactSection } from './components/sections/ContactSection';
import { EnquiriesView } from './components/sections/EnquiriesView';
import { Toaster } from '@/components/ui/sonner';
import { updateRuntimePublicUrl } from './utils/runtimePublicUrl';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'enquiries'>('home');

  // Update og:url metadata on app startup
  useEffect(() => {
    updateRuntimePublicUrl();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <CoverageSection />
            <ProcessSection />
            <TestimonialsSection />
            <FaqSection />
            <ContactSection />
          </>
        ) : (
          <EnquiriesView />
        )}
      </main>
      <Footer currentView={currentView} onNavigate={setCurrentView} />
      <Toaster />
    </div>
  );
}

export default App;
