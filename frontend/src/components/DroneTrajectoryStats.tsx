
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { LineBasic } from 'three';
import { Shield, Radar, Database, Cpu } from 'lucide-react';

const DroneTrajectoryStats = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create a curved path for the drone trajectory
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-5, 0, 0),
      new THREE.Vector3(-2, 4, 3),
      new THREE.Vector3(2, -2, -2),
      new THREE.Vector3(5, 0, 0)
    );
    
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    const material = new THREE.LineBasicMaterial({ 
      color: 0x0A84FF,
      linewidth: 3,
    });
    
    const curveObject = new THREE.Line(geometry, material);
    scene.add(curveObject);
    
    // Add a small drone that moves along the path
    const droneGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.3);
    const droneMaterial = new THREE.MeshBasicMaterial({ color: 0x0A84FF });
    const drone = new THREE.Mesh(droneGeometry, droneMaterial);
    scene.add(drone);
    
    // Add point lights for better visualization
    const light1 = new THREE.PointLight(0x0A84FF, 1, 10);
    light1.position.set(2, 2, 2);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0x5E5CE6, 1, 10);
    light2.position.set(-2, -2, -2);
    scene.add(light2);
    
    // Position camera
    camera.position.z = 8;
    
    // Animation variables
    let progress = 0;
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the entire curve for a dynamic effect
      curveObject.rotation.y += 0.005;
      curveObject.rotation.z += 0.002;
      
      // Move drone along the path
      progress += 0.002;
      if (progress > 1) progress = 0;
      
      const point = curve.getPointAt(progress);
      drone.position.copy(point);
      
      // Point drone in direction of travel
      if (progress < 0.99) {
        const nextPoint = curve.getPointAt(progress + 0.01);
        drone.lookAt(nextPoint);
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Clean up resources
      geometry.dispose();
      material.dispose();
      droneGeometry.dispose();
      droneMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-drone-blue/10 rounded-full text-drone-blue text-sm font-medium mb-4">
            Performance Metrics
          </div>
          <h2 className="text-4xl font-bold mb-4">AI-Driven Flight Analytics</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-time trajectory analysis and airspace monitoring with industry-leading precision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* 3D Trajectory Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-[400px] relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-drone-blue/5 to-drone-purple/5 rounded-2xl"></div>
            <div className="absolute inset-0 backdrop-blur-sm rounded-2xl overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold mb-2 text-drone-blue">Flight Path Analysis</h3>
              <p className="text-sm text-gray-300">
                AI algorithms predict and analyze drone flight patterns for threat detection.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                icon: Shield, 
                title: "Threat Detection", 
                value: "99.8%", 
                description: "Accuracy in identifying unauthorized drones",
                color: "from-drone-blue to-drone-highlight"
              },
              { 
                icon: Radar, 
                title: "Detection Range", 
                value: "12km", 
                description: "Maximum detection distance for small drones",
                color: "from-drone-purple to-drone-blue"
              },
              { 
                icon: Cpu, 
                title: "Processing Time", 
                value: "50ms", 
                description: "Average AI classification speed per drone",
                color: "from-drone-highlight to-drone-purple"
              },
              { 
                icon: Database, 
                title: "Drone Database", 
                value: "2,500+", 
                description: "Known drone models in identification system",
                color: "from-drone-blue to-drone-purple"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-4 rounded-xl border border-white/10 overflow-hidden relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2 bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-drone-blue mb-1">{stat.title}</div>
                    <div className="text-xs text-gray-400">{stat.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DroneTrajectoryStats;
