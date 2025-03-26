"use client";
import React, { useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    }
  };

  const burgerButtonVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 }
  };

  return (
    <>
      {/* Burger Button - Fixed Position */}
      <motion.div 
        initial={false}
        animate={isSidebarOpen ? "open" : "closed"}
        className="fixed top-4 left-4 z-50"
      >
        <Button 
          variant="ghost" 
          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          onClick={toggleSidebar}
        >
          <motion.div variants={burgerButtonVariants}>
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </Button>
      </motion.div>

      {/* Overlay */}
      {isSidebarOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 w-80 h-full bg-gradient-to-br from-black via-gray-900 to-blue-900 shadow-2xl z-40 overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              {/* Logo Section */}
              <div className="flex items-center space-x-3 mb-12">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">DroneShield</h2>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-4">
                {NavLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300
                      }
                    }}
                  >
                    <Link 
                      href={link.href} 
                      className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      onClick={toggleSidebar}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Authentication Section */}
              <div className="mt-12">
                <SignedOut>
                  <div className="space-y-4">
                    <SignInButton mode="modal">
                      <Button className="w-full" variant="outline">
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
                  <div className="flex justify-center">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;