
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative z-10 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-drone-blue/5 to-transparent opacity-50"></div>
      <div className="relative container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-10 md:p-16 overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-drone-blue via-drone-purple to-drone-highlight"></div>
          <div className="absolute inset-0 bg-drone-blue/5 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/3 w-full h-full"></div>
          
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Secure Your Airspace with Next-Gen{' '}
              <span className="text-gradient-blue">
                Drone Intelligence
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Deploy our cutting-edge drone security platform to prevent unauthorized access and protect your critical infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="button-glow bg-gradient-to-r from-drone-blue to-drone-highlight text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-drone-blue/20 transition-all duration-300 w-full sm:w-auto">
                Request Demo
              </button>
              <button className="bg-transparent border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto">
                <span>Learn More</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
