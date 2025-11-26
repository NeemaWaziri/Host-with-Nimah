import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import AIChef from './components/AIChef';
import SignatureRecipes from './components/SignatureRecipes';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { Theme } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useEffect(() => {
    // Check system preference or localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme(Theme.DARK);
    }
  }, []);

  useEffect(() => {
    // Apply theme class to html element
    const html = document.documentElement;
    if (theme === Theme.DARK) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-nimah-paper dark:bg-nimah-black transition-colors duration-500 overflow-x-hidden selection:bg-nimah-red selection:text-white">
      <NavBar theme={theme} toggleTheme={toggleTheme} scrollToSection={scrollToSection} />
      <main>
        <Hero scrollToSection={scrollToSection} />
        <AIChef />
        <SignatureRecipes />
        <Services />
        <BookingForm />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
