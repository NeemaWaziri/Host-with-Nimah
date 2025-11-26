import React from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Theme } from '../types';

interface NavBarProps {
  theme: Theme;
  toggleTheme: () => void;
  scrollToSection: (id: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ theme, toggleTheme, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Inspiration', id: 'ai-chef' },
    { name: 'Services', id: 'services' },
    { name: 'Request Hosting', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-colors duration-300 bg-nimah-paper/90 dark:bg-nimah-black/90 backdrop-blur-md border-b border-nimah-rose/20 dark:border-nimah-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0 cursor-pointer group" onClick={() => handleNavClick('home')}>
            <h1 className="font-serif text-2xl tracking-widest text-nimah-black dark:text-nimah-cream group-hover:text-nimah-red transition-colors duration-300">
              HOST <span className="text-nimah-red dark:text-nimah-rose text-lg italic">with</span> NIMAH
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id)}
                className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-nimah-olive dark:text-nimah-cream/80 hover:text-nimah-red dark:hover:text-nimah-rose transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-nimah-cream/20 dark:hover:bg-nimah-rose/20 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === Theme.LIGHT ? (
                <Moon size={18} className="text-nimah-olive" />
              ) : (
                <Sun size={18} className="text-nimah-cream" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-nimah-black dark:text-nimah-cream"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-nimah-paper dark:bg-nimah-black border-b border-nimah-rose/20 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id)}
                className="block w-full text-left px-3 py-4 font-serif text-xl text-nimah-black dark:text-nimah-cream hover:bg-nimah-cream/20 dark:hover:bg-nimah-red/10"
              >
                {link.name}
              </button>
            ))}
            <div className="px-3 py-4 border-t border-nimah-rose/20 dark:border-nimah-cream/10 flex justify-between items-center">
              <span className="text-nimah-olive dark:text-nimah-rose font-sans text-sm uppercase tracking-wider">Switch Theme</span>
              <button onClick={toggleTheme}>
                {theme === Theme.LIGHT ? (
                  <Moon size={20} className="text-nimah-olive" />
                ) : (
                  <Sun size={20} className="text-nimah-cream" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;