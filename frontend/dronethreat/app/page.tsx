"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Shield, 
  Waves, 
  Zap, 
  ChevronRight
} from 'lucide-react';

import FeatureCard from '@/components/FeatureCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsSection from '@/components/StatsSection';
import CTASection from '@/components/CTASection';
import DroneBackground from '@/components/DroneBackground';
import HowItWorksSection from '@/components/HowItWorksSection';
import DroneTrajectoryStats from '@/components/DroneTrajectoryStats';

export default function HomePage() {
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

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Drone Trajectory Stats Section */}
        <DroneTrajectoryStats />

        {/* Stats Section */}
        <StatsSection />



        

     
      </main>

      <Footer />
    </div>
  );
}