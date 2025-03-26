
import React from 'react';
import { Shield, Mail, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 py-16 border-t border-white/10 backdrop-blur-sm bg-black/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-drone-blue/20 p-1.5 rounded-lg">
                <Shield className="w-5 h-5 text-drone-blue" />
              </div>
              <span className="text-lg font-semibold">CyberDrone</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Next-generation AI-powered drone security platform for advanced threat detection and prevention.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-drone-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-drone-blue transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-drone-blue transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">Security</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">Technology</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">Partners</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">Terms</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">Licenses</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-drone-blue transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">© 2023 CyberDrone Security. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-2 md:mt-0">Designed with precision. Built with security.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
