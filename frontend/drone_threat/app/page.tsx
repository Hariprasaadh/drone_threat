"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Radar, Lock, Cpu, Target, Hexagon, ChevronRight } from 'lucide-react';

const CyberDroneSecurity = () => {
  const canvasRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(null);

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

    // Complex Particle System with Drone-like Behavior
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 7000;
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      // Create a more structured, swarm-like particle distribution
      const radius = 10 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = radius * Math.cos(phi);

      // Advanced velocity simulation
      velocityArray[i * 3] = (Math.random() - 0.5) * 0.02;
      velocityArray[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocityArray[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Advanced Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.8,  // increased strength
      0.5,  // radius
      0.9   // threshold
    );
    composer.addPass(bloomPass);

    camera.position.z = 15;

    // Enhanced Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.15;

    // Dynamic Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      const positions = particlesMesh.geometry.getAttribute('position');
      const velocities = particlesMesh.geometry.getAttribute('velocity');

      // More complex particle movement
      for (let i = 0; i < particlesCount; i++) {
        positions.array[i * 3] += velocities.array[i * 3] * Math.sin(elapsedTime * 0.5);
        positions.array[i * 3 + 1] += velocities.array[i * 3 + 1] * Math.cos(elapsedTime * 0.5);
        positions.array[i * 3 + 2] += velocities.array[i * 3 + 2] * Math.sin(elapsedTime * 0.3);

        // Add more dynamic oscillation
        positions.array[i * 3] += Math.sin(elapsedTime + i * 0.1) * 0.01;
        positions.array[i * 3 + 1] += Math.cos(elapsedTime + i * 0.1) * 0.01;
      }

      positions.needsUpdate = true;
      
      // More dynamic rotation
      particlesMesh.rotation.y += 0.0008;
      particlesMesh.rotation.x += 0.0003;
      
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

  // Feature Details
  const featureDetails = [
    {
      icon: Radar,
      title: "Advanced Threat Detection",
      description: "AI-powered real-time threat monitoring with predictive analysis capabilities",
      details: [
        "Machine learning threat identification",
        "Predictive risk assessment",
        "Autonomous defense mechanisms"
      ]
    },
    {
      icon: Lock,
      title: "Quantum-Resistant Encryption",
      description: "Military-grade security protocols for unbreachable communication",
      details: [
        "End-to-end encryption",
        "Dynamic key generation",
        "Secure mesh network integration"
      ]
    },
    {
      icon: Hexagon,
      title: "Modular Security Architecture",
      description: "Flexible, adaptive cybersecurity framework for complex drone ecosystems",
      details: [
        "Plug-and-play security modules",
        "Real-time vulnerability patching",
        "Scalable infrastructure support"
      ]
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0 opacity-40"
      />

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="bg-cyan-500/20 inline-block px-4 py-2 rounded-full text-cyan-300 text-sm tracking-wide">
              Next-Gen Drone Cybersecurity
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">
              Intelligent Drone Security Ecosystem
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Comprehensive AI-driven cybersecurity platform designed to protect and optimize autonomous drone networks with unparalleled precision and resilience.
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button 
                className="bg-cyan-500 hover:bg-cyan-600 text-black"
                size="lg"
              >
                Explore Solutions
                <ChevronRight className="ml-2" />
              </Button>
              
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6">
            {featureDetails.map((feature, index) => (
              <div 
                key={index}
                className={`
                  p-6 rounded-xl border transition-all duration-300
                  ${activeFeature === index 
                    ? 'bg-cyan-500/10 border-cyan-500/50' 
                    : 'bg-white/5 border-white/10 hover:border-white/30'}
                `}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-cyan-500/20 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-cyan-300" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                {activeFeature === index && (
                  <ul className="space-y-2 text-sm text-gray-300">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Target className="w-3 h-3 text-cyan-500" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberDroneSecurity;