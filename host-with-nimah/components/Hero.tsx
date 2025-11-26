import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-nimah-black">
      {/* Parallax Background Image Container */}
      <div 
        className="absolute left-0 w-full h-[140%] -top-[20%] z-0 will-change-transform"
        style={{ transform: `translateY(${offsetY * 0.4}px)` }}
      >
        {/* Skeleton Placeholder */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-nimah-rose/20 dark:bg-nimah-black animate-pulse z-0" />
        )}
        
        <img 
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" 
          alt="Vibrant aesthetic dinner setting with diverse elements" 
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isImageLoaded ? 'opacity-100 dark:opacity-80' : 'opacity-0'}`}
        />
      </div>

      {/* Static Gradient Overlay - Keeps text readable and bottom fade consistent */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-nimah-cream/30 via-transparent to-nimah-paper dark:from-nimah-black/60 dark:via-nimah-black/20 dark:to-nimah-black"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <p className="font-sans uppercase tracking-[0.4em] text-xs md:text-sm text-nimah-red dark:text-nimah-cream mb-6 animate-fade-in-up font-bold drop-shadow-md bg-white/20 dark:bg-black/20 backdrop-blur-sm py-2 px-4 inline-block rounded-full">
          The Art of Hosting
        </p>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-nimah-black dark:text-nimah-cream mb-6 leading-[0.9] animate-fade-in-up delay-100 drop-shadow-lg">
          Life <span className="italic text-nimah-red dark:text-nimah-rose font-light">of</span> Nimah
        </h1>
        <p className="font-sans text-lg md:text-xl text-nimah-black dark:text-nimah-cream/90 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200 font-medium drop-shadow-md bg-white/10 dark:bg-black/10 backdrop-blur-[1px] rounded-lg p-2">
          Curating unforgettable moments through taste, texture, and time.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center animate-fade-in-up delay-300">
            <button 
                onClick={() => scrollToSection('ai-chef')}
                className="px-10 py-4 bg-nimah-red text-nimah-cream font-sans uppercase tracking-[0.2em] text-xs hover:bg-nimah-black hover:text-white transition-all duration-500 min-w-[220px] shadow-xl border border-transparent hover:border-white/20"
            >
                Consult the Agent
            </button>
            <button 
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 border border-nimah-black dark:border-nimah-cream text-nimah-black dark:text-nimah-cream font-sans uppercase tracking-[0.2em] text-xs hover:bg-nimah-black hover:text-white dark:hover:bg-nimah-cream dark:hover:text-nimah-black transition-all duration-500 min-w-[220px] bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-lg"
            >
                Request Hosting
            </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10" onClick={() => scrollToSection('ai-chef')}>
        <ArrowDown className="text-nimah-black dark:text-nimah-cream opacity-80 hover:opacity-100 transition-opacity drop-shadow-lg" size={24} />
      </div>
    </section>
  );
};

export default Hero;