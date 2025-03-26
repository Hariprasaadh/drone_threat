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
import { ShieldCheck, Wifi, Lock, Code, Cpu, Shield, ChevronRight, Menu, X } from 'lucide-react';

const CyberDroneLanding = () => {
  const canvasRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Advanced particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      // Spread particles in a more structured manner
      const radius = 5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = radius * Math.cos(phi);

      // Add velocity for dynamic movement
      velocityArray[i * 3] = (Math.random() - 0.5) * 0.01;
      velocityArray[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocityArray[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Post-processing for advanced visual effects
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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 10;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;

    // Animation loop with advanced particle dynamics
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      const positions = particlesMesh.geometry.getAttribute('position');
      const velocities = particlesMesh.geometry.getAttribute('velocity');

      // Update particle positions with fluid motion
      for (let i = 0; i < particlesCount; i++) {
        positions.array[i * 3] += velocities.array[i * 3];
        positions.array[i * 3 + 1] += velocities.array[i * 3 + 1];
        positions.array[i * 3 + 2] += velocities.array[i * 3 + 2];

        // Add subtle oscillation
        positions.array[i * 3] += Math.sin(elapsedTime + i) * 0.005;
        positions.array[i * 3 + 1] += Math.cos(elapsedTime + i) * 0.005;
      }

      positions.needsUpdate = true;
      
      // Rotate particles with more dynamic movement
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;
      
      controls.update();
      composer.render();
    };

    animate();

    // Resize handling
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

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2 
      }
    }
  };

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
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen w-full bg-black text-white overflow-hidden"
    >
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0 opacity-30"
      />

      

      {/* Hero Section */}
      <motion.section 
        variants={itemVariants}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-16 pb-32"
      >
        <Card className="w-full max-w-4xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <motion.div 
            variants={containerVariants}
            className="p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Text Content */}
            <motion.div 
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="space-y-3">
                <motion.div 
                  variants={itemVariants}
                  className="inline-block px-3 py-1 rounded-full bg-white/10 text-gray-300 text-sm font-medium mb-2"
                >
                  Advanced Cybersecurity
                </motion.div>
                <motion.h2 
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-bold tracking-tight text-white"
                >
                  Drone Security Evolved
                </motion.h2>
                <motion.p 
                  variants={itemVariants}
                  className="text-gray-400 text-lg"
                >
                  Cutting-edge protection for autonomous drone systems using advanced AI and encryption technologies
                </motion.p>
              </div>

              {/* Technical Features */}
              <motion.div 
                variants={containerVariants}
                className="space-y-4 py-2"
              >
                {[
                  { icon: Cpu, text: "AI-Powered Threat Detection" },
                  { icon: Lock, text: "Military-Grade Encryption" },
                  { icon: Code, text: "Advanced Cyber Resilience" }
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="flex items-center space-x-3 text-gray-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <Button className="bg-white text-black hover:bg-gray-200">
                  Get Started
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/5">
                  Explore Solutions
                </Button>
              </motion.div>
            </motion.div>

            {/* Intentionally left empty for 3D drone background */}
            <div className="hidden md:block"></div>
          </motion.div>
        </Card>
      </motion.section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4 bg-black/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Technical Capabilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive cybersecurity ecosystem designed for next-generation autonomous drone infrastructure
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: "Adaptive Defense", 
                description: "Machine learning algorithms that continuously evolve to counter emerging cyber threats" 
              },
              { 
                icon: Wifi, 
                title: "Secure Mesh Networks", 
                description: "Quantum-resistant communication protocols with dynamic routing" 
              },
              { 
                icon: Code, 
                title: "Software Integrity", 
                description: "Real-time code verification and automated vulnerability patching" 
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="bg-black/30 border border-white/10 p-6 transition-all duration-300 hover:border-white/30"
              >
                <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default CyberDroneLanding;