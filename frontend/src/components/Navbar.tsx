
import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12 py-4 ${
        scrolled ? 'backdrop-blur-lg bg-black/70 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-drone-blue/20 p-1.5 rounded-lg">
              <Shield className="w-5 h-5 text-drone-blue" />
            </div>
            <span className="text-lg font-semibold">CyberDrone</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="nav-link text-sm text-gray-300 hover:text-white">Features</a>
            <a href="#technology" className="nav-link text-sm text-gray-300 hover:text-white">Technology</a>
            <a href="#security" className="nav-link text-sm text-gray-300 hover:text-white">Security</a>
            <a href="#about" className="nav-link text-sm text-gray-300 hover:text-white">About</a>
          </nav>
          
          <button className="bg-drone-blue/10 border border-drone-blue/20 text-drone-blue px-5 py-2 rounded-full text-sm font-medium hover:bg-drone-blue/20 transition-all duration-300">
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
