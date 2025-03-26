"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
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

    // Enhanced 3D Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Advanced Particle Systems
    const createParticleSystem = (count: number, color: number, size: number, spread: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const radius = spread + Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        velocities[i * 3] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
      
      const material = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      return new THREE.Points(geometry, material);
    };

    // Create multiple particle systems
    const particleSystem1 = createParticleSystem(4000, 0x2563eb, 0.02, 12); // Blue particles
    const particleSystem2 = createParticleSystem(2000, 0x4f46e5, 0.015, 15); // Indigo particles
    const particleSystem3 = createParticleSystem(1000, 0x7c3aed, 0.025, 10); // Purple particles

    scene.add(particleSystem1, particleSystem2, particleSystem3);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add point lights
    const pointLight1 = new THREE.PointLight(0x2563eb, 2, 50);
    pointLight1.position.set(10, 10, 10);
    const pointLight2 = new THREE.PointLight(0x7c3aed, 2, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight1, pointLight2);

    // Enhanced Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.8,  // increased strength
      0.5,  // increased radius
      0.85  // threshold
    );
    composer.addPass(bloomPass);

    camera.position.z = 15;

    // Improved Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.enablePan = false;

    // Enhanced Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();

      // Animate particle systems
      [particleSystem1, particleSystem2, particleSystem3].forEach((system, index) => {
        const positions = system.geometry.getAttribute('position');
        const velocities = system.geometry.getAttribute('velocity');
        const count = positions.count;

        for (let i = 0; i < count; i++) {
          positions.array[i * 3] += velocities.array[i * 3] * Math.sin(elapsedTime * 0.5 + index);
          positions.array[i * 3 + 1] += velocities.array[i * 3 + 1] * Math.cos(elapsedTime * 0.5 + index);
          positions.array[i * 3 + 2] += velocities.array[i * 3 + 2] * Math.sin(elapsedTime * 0.3 + index);
        }

        positions.needsUpdate = true;
        system.rotation.y += 0.0003 * (index + 1);
        system.rotation.x += 0.0001 * (index + 1);
      });

      // Animate lights
      pointLight1.position.x = Math.sin(elapsedTime * 0.5) * 15;
      pointLight1.position.y = Math.cos(elapsedTime * 0.3) * 15;
      pointLight2.position.x = Math.cos(elapsedTime * 0.5) * 15;
      pointLight2.position.y = Math.sin(elapsedTime * 0.3) * 15;
      
      controls.update();
      composer.render();
    };

    animate();

    // Improved Responsive Handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.resolution.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      composer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
    };
  }, []);

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
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-[1]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-blue-900/30 inline-block px-6 py-2 rounded-full text-blue-300 text-sm font-medium tracking-wider mb-4 border border-blue-500/20"
            >
              Next-Generation Drone Security
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-300 to-purple-500 mb-6"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
                  p-6 rounded-2xl backdrop-blur-lg transform transition-all duration-300
                  ${activeFeature === index 
                    ? 'bg-blue-900/20 border-2 border-blue-500/50 scale-105' 
                    : 'bg-black/30 border border-white/10 hover:border-blue-500/30'}
                `}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <feature.icon className="w-7 h-7 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                    {feature.title}
                  </h3>
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

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center mx-auto space-x-2"
            >
              <span>Explore Security Solutions</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CyberDroneSecurity;