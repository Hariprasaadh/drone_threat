
import React from 'react';
import { motion } from 'framer-motion';
import { Radar, Radio, Cpu, Shield } from 'lucide-react';

const steps = [
  {
    icon: Radar,
    title: "Advanced Detection",
    description: "Multi-spectrum sensors identify drones up to 10km away using RF detection, radar, and optical systems.",
    gradient: "from-drone-blue to-drone-purple",
    delay: 0.2
  },
  {
    icon: Radio,
    title: "Signal Analysis",
    description: "Proprietary algorithms analyze signal patterns to identify drone make, model, and operator location.",
    gradient: "from-drone-purple to-drone-highlight",
    delay: 0.4
  },
  {
    icon: Cpu,
    title: "AI Processing",
    description: "Neural networks determine threat level by analyzing flight path and comparing against behavioral databases.",
    gradient: "from-drone-highlight to-drone-blue",
    delay: 0.6
  },
  {
    icon: Shield,
    title: "Automated Response",
    description: "System deploys appropriate countermeasures and alerts security personnel with actionable intelligence.",
    gradient: "from-drone-blue to-drone-highlight",
    delay: 0.8
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-drone-indigo/5 to-black opacity-50"></div>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-drone-blue/10 rounded-full text-drone-blue text-sm font-medium mb-4">
            The Process
          </div>
          <h2 className="text-4xl font-bold mb-4">How Our Technology Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our end-to-end drone security platform combines multiple technologies to provide seamless protection.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connected line */}
          <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-drone-blue via-drone-purple to-drone-highlight hidden md:block"></div>
          
          <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: step.delay }}
                viewport={{ once: true }}
                className={`relative ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}
              >
                {/* Timeline node */}
                <div 
                  className={`
                    w-12 h-12 rounded-full 
                    bg-gradient-to-r ${step.gradient}
                    flex items-center justify-center
                    absolute top-0 
                    ${index % 2 === 0 ? 'md:right-0 md:-translate-x-1/2' : 'md:left-0 md:translate-x-1/2'}
                    left-0 md:left-auto
                    hidden md:flex
                  `}
                >
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                {/* Mobile icon (visible only on small screens) */}
                <div className={`
                  w-12 h-12 rounded-full 
                  bg-gradient-to-r ${step.gradient}
                  flex items-center justify-center
                  mb-4 md:hidden mx-auto
                `}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                <div className="glass-card rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-drone-blue to-drone-highlight">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
