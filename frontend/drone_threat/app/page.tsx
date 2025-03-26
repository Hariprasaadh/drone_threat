"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Button } from '@/components/ui/button';
import { 
  Cpu, 
  Shield, 
  Waves, 
  Zap, 
  ChevronRight, 
  TargetIcon 
} from 'lucide-react';

const CyberDroneSecurity = () => {
  const canvasRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Advanced 3D Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Sophisticated Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 6000;
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      // Spherical distribution with more structured swarm behavior
      const radius = 10 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = radius * Math.cos(phi);

      // Dynamic velocity simulation
      velocityArray[i * 3] = (Math.random() - 0.5) * 0.04;
      velocityArray[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      velocityArray[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.018,
      color: 0x2563eb,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Post-processing Effects
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    composer.addPass(bloomPass);

    camera.position.z = 15;

    // Enhanced Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.1;

    // Dynamic Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      const positions = particlesMesh.geometry.getAttribute('position');
      const velocities = particlesMesh.geometry.getAttribute('velocity');

      // Complex particle movement
      for (let i = 0; i < particlesCount; i++) {
        positions.array[i * 3] += velocities.array[i * 3] * Math.sin(elapsedTime * 0.5);
        positions.array[i * 3 + 1] += velocities.array[i * 3 + 1] * Math.cos(elapsedTime * 0.5);
        positions.array[i * 3 + 2] += velocities.array[i * 3 + 2] * Math.sin(elapsedTime * 0.3);
      }

      positions.needsUpdate = true;
      
      particlesMesh.rotation.y += 0.0006;
      particlesMesh.rotation.x += 0.0002;
      
      controls.update();
      composer.render();
    };

    animate();

    // Responsive Handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      composer.dispose();
    };
  }, []);

  // Refined Feature Details
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
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-hidden">
      {/* Background Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0 opacity-50"
      />

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-blue-600/20 inline-block px-4 py-2 rounded-full text-blue-300 text-sm tracking-wide mb-4"
            >
              Next-Generation Drone Security
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl font-bold tracking-tight text-white mb-6"
            >
              Intelligent Drone Security Platform
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed"
            >
              Cutting-edge cybersecurity solution leveraging AI and advanced signal intelligence to protect autonomous drone networks.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {featureDetails.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                className={`
                  p-6 rounded-2xl border-2 transform transition-all duration-300
                  ${activeFeature === index 
                    ? 'bg-blue-600/10 border-blue-500/50 scale-105' 
                    : 'bg-white/5 border-white/10 hover:border-white/30'}
                `}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <feature.icon className="w-7 h-7 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-400 mb-4 h-16">{feature.description}</p>
                {activeFeature === index && (
                  <motion.ul 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2 text-sm text-gray-300"
                  >
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <TargetIcon className="w-3 h-3 text-blue-500" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              Explore Security Solutions
              <ChevronRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CyberDroneSecurity;