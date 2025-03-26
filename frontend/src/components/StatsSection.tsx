
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Cpu, AlertTriangle, Zap } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const StatItem = ({ 
  icon: Icon, 
  value, 
  suffix = '',
  prefix = '',
  label, 
  delay 
}: { 
  icon: any, 
  value: number, 
  suffix?: string,
  prefix?: string,
  label: string,
  delay: number
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="text-center relative group"
    >
      <div className="absolute inset-0 bg-drone-blue/5 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
      <div className="relative">
        <motion.div 
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="mx-auto mb-3 bg-drone-blue/10 border border-drone-blue/20 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-drone-blue/20 transition-all duration-300"
        >
          <Icon className="w-8 h-8 text-drone-blue" />
        </motion.div>
        <h3 className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-drone-blue to-drone-highlight">
          {isInView ? (
            <AnimatedCounter 
              end={value} 
              suffix={suffix}
              prefix={prefix}
            />
          ) : (
            <>{prefix}{value}{suffix}</>
          )}
        </h3>
        <p className="text-gray-400 text-sm">{label}</p>
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="relative z-10 py-20">
      <div className="absolute inset-0 bg-drone-indigo/5 opacity-20 blur-3xl rounded-full"></div>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Security By The Numbers</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our advanced platform has been rigorously tested and proven effective across various high-security environments.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem 
            icon={Cpu} 
            value={99.9} 
            suffix="%" 
            label="Detection Accuracy" 
            delay={0.1}
          />
          
          <StatItem 
            icon={Zap} 
            value={50} 
            suffix="ms" 
            label="Response Time" 
            delay={0.2}
          />
          
          <StatItem 
            icon={AlertTriangle} 
            value={2500} 
            suffix="+" 
            label="Threats Neutralized" 
            delay={0.3}
          />
          
          <StatItem 
            icon={Shield} 
            value={100} 
            suffix="+" 
            label="Secured Sites" 
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
