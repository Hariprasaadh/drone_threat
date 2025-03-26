"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, LogIn, UserCircle } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from 'next/link';

const NavLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/technology', label: 'Technology' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100 
      }
    }
  };

  const MobileMenu = () => (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="absolute top-full left-0 w-full bg-black/90 md:hidden"
        >
          <div className="container mx-auto px-4 py-6 space-y-4">
            {NavLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={link.href} 
                  className="block py-2 text-lg text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="pt-4 border-t border-white/10">
              <SignedOut>
                <div className="flex space-x-4">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full">
                      <LogIn className="mr-2 h-4 w-4" /> Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full">
                      <UserCircle className="mr-2 h-4 w-4" /> Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative w-full bg-black text-white">
      {/* Navigation */}
      <motion.nav 
        variants={itemVariants}
        className="relative z-10 p-4"
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-gray-300" />
            </div>
            <Link href="/" className="text-2xl font-bold text-white">
              DroneShield
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.div 
            variants={itemVariants}
            className="hidden md:flex items-center space-x-6"
          >
            {NavLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.href}
                className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Desktop Authentication */}
            <div className="ml-4">
              <SignedOut>
                <div className="flex space-x-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm">
                      <LogIn className="mr-2 h-4 w-4" /> Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm">
                      <UserCircle className="mr-2 h-4 w-4" /> Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </motion.div>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </motion.nav>
    </div>
  );
};

export default Navbar;