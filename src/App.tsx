import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { MySqlLab } from './components/MySqlLab';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

function PortfolioApp() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('');

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForContact(serviceTitle);
  };

  const handleSelectProjectForContact = (projectTitle: string) => {
    setSelectedServiceForContact(`Consulta sobre proyecto: ${projectTitle}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-rose-500/20 selection:text-rose-600 dark:selection:text-rose-400 transition-colors duration-200">
      {/* Top Navbar with Theme Toggle */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onSelectService={handleSelectService}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Featured Projects with Architecture & Code Viewers */}
        <ProjectsSection
          onSelectProjectForContact={handleSelectProjectForContact}
        />

        {/* Interactive MySQL & Laravel Architecture Lab */}
        <MySqlLab />

        {/* Technical Skills & Competencies */}
        <SkillsSection />

        {/* Professional Services */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Career Experience & Methodology */}
        <ExperienceSection />

        {/* Direct Contact & Interactive Form */}
        <ContactSection
          initialSubject={selectedServiceForContact}
          onOpenBooking={handleOpenBooking}
        />
      </main>

      {/* Discovery Call Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
