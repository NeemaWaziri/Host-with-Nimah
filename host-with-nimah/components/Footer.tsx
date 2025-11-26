import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nimah-black text-nimah-cream py-16 border-t border-nimah-rose/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <h2 className="font-serif text-2xl tracking-widest text-nimah-cream mb-2">HOST <span className="italic text-nimah-red">with</span> NIMAH</h2>
          <p className="text-[10px] font-sans uppercase tracking-widest text-nimah-rose/60">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>

        <div className="flex space-x-10">
          <a 
            href="https://www.instagram.com/Host_with_Nimah" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-nimah-rose hover:text-nimah-cream transition-colors flex items-center gap-2 group"
          >
            <Instagram size={20} className="group-hover:scale-110 transition-transform"/>
            <span className="hidden md:inline font-sans text-xs tracking-widest">@Host_with_Nimah</span>
          </a>
           <a 
            href="https://www.instagram.com/Life_ov_Nimah" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-nimah-rose hover:text-nimah-cream transition-colors flex items-center gap-2 group"
          >
            <Instagram size={20} className="group-hover:scale-110 transition-transform"/>
            <span className="hidden md:inline font-sans text-xs tracking-widest">@Life_of_Nimah</span>
          </a>
          <a href="#contact" className="text-nimah-rose hover:text-nimah-cream transition-colors flex items-center gap-2 group">
            <Mail size={20} className="group-hover:scale-110 transition-transform"/>
            <span className="hidden md:inline font-sans text-xs tracking-widest">Contact</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;