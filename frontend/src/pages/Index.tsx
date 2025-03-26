
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Shield, 
  Waves, 
  Zap, 
  ChevronRight
} from 'lucide-react';

import FeatureCard from '../components/FeatureCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';
import DroneBackground from '../components/DroneBackground';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import HowItWorksSection from '../components/HowItWorksSection';
import DroneTrajectoryStats from '../components/DroneTrajectoryStats';

const Index = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const featureDetails = [
    {
      icon: Cpu,
      title: "AI Object Recognition",
      description: "Advanced machine learning for precise drone environment analysis",
      details: [
        "Multi-object tracking",
        "Contextual threat assessment",
        "Real-time pattern recognition"
      ]
    },
    {
      icon: Waves,
      title: "RF Signal Intelligence",
      description: "Comprehensive radio frequency monitoring and interference detection",
      details: [
        "Spectrum analysis",
        "Signal anomaly detection",
        "Wireless threat mitigation"
      ]
    },
    {
      icon: Shield,
      title: "Adaptive Security",
      description: "Intelligent threat classification and dynamic defense mechanisms",
      details: [
        "Predictive risk modeling",
        "Autonomous response protocols",
        "Continuous security optimization"
      ]
    },
    {
      icon: Zap,
      title: "Instant Threat Response",
      description: "Rapid alert and mitigation system for critical security events",
      details: [
        "Real-time threat notifications",
        "Automated incident response",
        "Intelligent threat prioritization"
      ]
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* New 3D Drone Background */}
      <DroneBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-[1]" />

      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-32">
          <div className="container mx-auto">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-drone-blue/10 inline-block px-6 py-2 rounded-full text-drone-blue text-sm font-medium tracking-wider mb-6 border border-drone-blue/20"
              >
                Next-Generation Drone Security
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gradient-blue mb-8 leading-tight"
              >
                AI-Powered Drone <br />Threat Detection
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12"
              >
                Our advanced AI system detects, classifies, and analyzes drones in real-time to prevent unauthorized access and secure your airspace.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button className="button-glow bg-gradient-to-r from-drone-blue to-drone-highlight text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-drone-blue/20 transition-all duration-300 w-full sm:w-auto">
                  Get Started
                </button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto backdrop-blur-sm">
                  <span>Watch Demo</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-drone-indigo/5 to-black opacity-50"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block px-4 py-1.5 bg-drone-blue/10 rounded-full text-drone-blue text-sm font-medium mb-4">
                Core Features
              </div>
              <h2 className="text-4xl font-bold mb-4">Unparalleled Security Features</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our platform combines cutting-edge technologies to deliver comprehensive drone security solutions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {featureDetails.map((feature, index) => (
                <FeatureCard
                  key={index}
                  index={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  details={feature.details}
                  isActive={activeFeature === index}
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(null)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* NEW: How It Works Section */}
        <HowItWorksSection />

        {/* NEW: Drone Trajectory Stats Section */}
        <DroneTrajectoryStats />

        {/* Stats Section */}
        <StatsSection />

        {/* NEW: Testimonials Section */}
        <TestimonialsCarousel />

        {/* Technology Section */}
        <section id="technology" className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="inline-block px-4 py-1.5 bg-drone-blue/10 rounded-full text-drone-blue text-sm font-medium mb-4">
                  Advanced Technology
                </div>
                <h2 className="text-4xl font-bold mb-6">The Science Behind Our Security</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Our drone security platform leverages cutting-edge technologies to provide comprehensive protection against unauthorized access and potential threats.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Machine learning algorithms that adapt to new threat patterns",
                    "Real-time signal processing for instant detection",
                    "Quantum-resistant encryption for secure communications",
                    "Distributed sensor network for comprehensive coverage"
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <div className="bg-drone-blue/20 p-1 rounded-full mt-1">
                        <ChevronRight className="w-3 h-3 text-drone-blue" />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <button className="bg-drone-blue/10 border border-drone-blue/20 text-drone-blue px-6 py-3 rounded-full text-sm font-medium hover:bg-drone-blue/20 transition-all duration-300">
                  Explore Technology
                </button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="bg-gradient-to-br from-drone-blue/10 to-drone-purple/10 p-1 rounded-2xl border border-white/10">
                  <div className="glass-card rounded-2xl aspect-[4/3] overflow-hidden relative backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-drone-blue/20 via-transparent to-drone-purple/20"></div>
                    <div className="flex items-center justify-center h-full p-8">
                      <div className="animate-float">
                        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-drone-blue/30 to-drone-purple/30 flex items-center justify-center">
                          <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-drone-purple/40 to-drone-blue/40 flex items-center justify-center animate-pulse-slow">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-drone-blue/50 to-drone-purple/50 flex items-center justify-center animate-glow">
                              <Shield className="w-16 h-16 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
