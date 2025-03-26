"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Twitter, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

const FooterLinks = {
  Products: [
    { href: '/drone-security', label: 'Drone Security Suite' },
    { href: '/threat-detection', label: 'Threat Detection' },
    { href: '/encryption', label: 'Encryption Services' },
    { href: '/consulting', label: 'Security Consulting' }
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/blog', label: 'Blog' },
    { href: '/press', label: 'Press' }
  ],
  Resources: [
    { href: '/documentation', label: 'Documentation' },
    { href: '/support', label: 'Support' },
    { href: '/community', label: 'Community' },
    { href: '/integrations', label: 'Integrations' }
  ]
};

const Footer = () => {
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

  return (
    <footer className="relative w-full bg-black text-white py-12 px-4">
      <div className="container mx-auto">
        {/* Footer Top Section */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-white">CyberShield</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Advanced cybersecurity solutions for autonomous drone systems, protecting the future of intelligent technology.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: 'https://twitter.com/cybershield' },
                { icon: Linkedin, href: 'https://linkedin.com/company/cybershield' },
                { icon: Github, href: 'https://github.com/cybershield' }
              ].map((social, index) => (
                <Link 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(FooterLinks).map(([section, links], index) => (
            <motion.div 
              key={section}
              variants={itemVariants}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

         
        </div>

        {/* Footer Bottom */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CyberShield. All rights reserved.
          </p>
          
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;