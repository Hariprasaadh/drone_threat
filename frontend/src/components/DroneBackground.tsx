
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';

const DroneBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 15);
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x0A84FF, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x5E5CE6, 2, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Create Drone Model
    const createDrone = () => {
      const droneGroup = new THREE.Group();
      
      // Drone body
      const bodyGeometry = new THREE.BoxGeometry(2, 0.4, 2);
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        specular: 0x666666,
        shininess: 30,
        transparent: true,
        opacity: 0.9
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      droneGroup.add(body);
      
      // Electronics on top
      const electronicsGeometry = new THREE.BoxGeometry(1, 0.2, 1);
      const electronicsMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x0A84FF,
        emissive: 0x0A84FF,
        emissiveIntensity: 0.5
      });
      const electronics = new THREE.Mesh(electronicsGeometry, electronicsMaterial);
      electronics.position.y = 0.3;
      droneGroup.add(electronics);
      
      // Four arms
      const armPositions = [
        { x: 1.2, z: 1.2 },
        { x: -1.2, z: 1.2 },
        { x: -1.2, z: -1.2 },
        { x: 1.2, z: -1.2 }
      ];
      
      armPositions.forEach((pos, index) => {
        const armGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.2);
        const armMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
        const arm = new THREE.Mesh(armGeometry, armMaterial);
        arm.position.set(pos.x, 0, pos.z);
        
        // Propeller
        const propGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.05, 32);
        const propMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x888888,
          transparent: true,
          opacity: 0.7
        });
        const propeller = new THREE.Mesh(propGeometry, propMaterial);
        propeller.rotation.x = Math.PI / 2;
        propeller.position.y = 0.1;
        arm.add(propeller);
        
        // Motor
        const motorGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 16);
        const motorMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
        const motor = new THREE.Mesh(motorGeometry, motorMaterial);
        motor.rotation.x = Math.PI / 2;
        arm.add(motor);
        
        // LED light
        const ledGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const ledColor = index % 2 === 0 ? 0xff0000 : 0x00ff00; // Red and green navigation lights
        const ledMaterial = new THREE.MeshBasicMaterial({ 
          color: ledColor,
          emissive: ledColor,
          emissiveIntensity: 1
        });
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.y = 0.1;
        arm.add(led);
        
        droneGroup.add(arm);
      });
      
      // Camera gimbal at the bottom
      const gimbalGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const gimbalMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
      const gimbal = new THREE.Mesh(gimbalGeometry, gimbalMaterial);
      gimbal.position.y = -0.4;
      droneGroup.add(gimbal);
      
      // Camera lens
      const lensGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 16);
      const lensMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x111111,
        emissive: 0x0A84FF,
        emissiveIntensity: 0.3
      });
      const lens = new THREE.Mesh(lensGeometry, lensMaterial);
      lens.rotation.x = Math.PI / 2;
      lens.position.y = -0.6;
      droneGroup.add(lens);
      
      return droneGroup;
    };
    
    const drone = createDrone();
    scene.add(drone);

    // Add scanning effect (a circular grid)
    const createScanningEffect = () => {
      const scanGroup = new THREE.Group();
      
      // Circular grid
      const gridGeometry = new THREE.RingGeometry(3, 10, 36, 10);
      const gridMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x0A84FF, 
        transparent: true, 
        opacity: 0.3,
        side: THREE.DoubleSide,
        wireframe: true
      });
      const grid = new THREE.Mesh(gridGeometry, gridMaterial);
      grid.rotation.x = Math.PI / 2;
      scanGroup.add(grid);
      
      // Inner circle
      const innerCircleGeometry = new THREE.CircleGeometry(3, 32);
      const innerCircleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x0A84FF, 
        transparent: true, 
        opacity: 0.1,
        side: THREE.DoubleSide
      });
      const innerCircle = new THREE.Mesh(innerCircleGeometry, innerCircleMaterial);
      innerCircle.rotation.x = Math.PI / 2;
      scanGroup.add(innerCircle);
      
      // Radar sweep
      const radarGeometry = new THREE.CircleGeometry(10, 32, 0, Math.PI / 4);
      const radarMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x0A84FF, 
        transparent: true, 
        opacity: 0.4,
        side: THREE.DoubleSide
      });
      const radar = new THREE.Mesh(radarGeometry, radarMaterial);
      radar.rotation.x = Math.PI / 2;
      scanGroup.add(radar);
      
      scanGroup.position.y = -3;
      return { scanGroup, radar };
    };
    
    const { scanGroup, radar } = createScanningEffect();
    scene.add(scanGroup);

    // Add tech particles
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

    // Create particle systems
    const particleSystem1 = createParticleSystem(4000, 0x0A84FF, 0.02, 12); // Blue particles
    const particleSystem2 = createParticleSystem(2000, 0x5E5CE6, 0.015, 15); // Purple particles

    scene.add(particleSystem1, particleSystem2);

    // Create threat detection visualization
    const createThreatDetection = () => {
      const threatGroup = new THREE.Group();
      
      // Scanning beams
      const beamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 20, 8);
      const beamMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff3300, 
        transparent: true, 
        opacity: 0.7
      });
      
      // Add 3 scanning beams at different angles
      for (let i = 0; i < 3; i++) {
        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        beam.rotation.z = Math.PI / 2;
        beam.rotation.y = (i * Math.PI) / 3;
        beam.position.x = 10;
        beam.visible = false; // Initially hidden
        threatGroup.add(beam);
      }
      
      // Target box - will appear when "threat detected"
      const boxGeometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
      const boxMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff3300, 
        transparent: true, 
        opacity: 0.3,
        wireframe: true
      });
      const targetBox = new THREE.Mesh(boxGeometry, boxMaterial);
      targetBox.visible = false; // Initially hidden
      threatGroup.add(targetBox);
      
      return { threatGroup, beams: threatGroup.children.slice(0, 3) as THREE.Mesh[], targetBox };
    };
    
    const { threatGroup, beams, targetBox } = createThreatDetection();
    scene.add(threatGroup);

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Add bloom effect
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    composer.addPass(bloomPass);
    
    // Add outline pass for highlighting
    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );
    outlinePass.edgeStrength = 3;
    outlinePass.edgeGlow = 0.7;
    outlinePass.edgeThickness = 1;
    outlinePass.pulsePeriod = 2;
    outlinePass.visibleEdgeColor.set(0x0A84FF);
    outlinePass.hiddenEdgeColor.set(0x190a5a);
    composer.addPass(outlinePass);
    
    // Automatically select the drone for highlighting
    outlinePass.selectedObjects = [drone];

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enablePan = false;

    // Animation variables
    let threatDetectionMode = false;
    let threatDetectionTimer = 0;
    let scanAngle = 0;
    
    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Animate drone
      drone.rotation.y += 0.002;
      drone.position.y = Math.sin(elapsedTime * 0.5) * 0.2; // Gentle hover effect
      
      // Animate propellers - they're the 3rd child of each arm
      for (let i = 0; i < 4; i++) {
        const arm = drone.children[i + 2] as THREE.Mesh; // +2 to skip body and electronics
        const propeller = arm.children[0] as THREE.Mesh;
        propeller.rotation.z += 0.3; // Fast spinning
      }
      
      // Animate scanning effect
      scanGroup.rotation.y += 0.005;
      scanAngle += 0.02;
      radar.rotation.z = scanAngle;
      
      // Animate particle systems
      [particleSystem1, particleSystem2].forEach((system, index) => {
        const positions = system.geometry.getAttribute('position');
        const velocities = system.geometry.getAttribute('velocity');
        const count = positions.count;

        for (let i = 0; i < count; i++) {
          positions.array[i * 3] += velocities.array[i * 3] * Math.sin(elapsedTime * 0.5 + index);
          positions.array[i * 3 + 1] += velocities.array[i * 3 + 1] * Math.cos(elapsedTime * 0.5 + index);
          positions.array[i * 3 + 2] += velocities.array[i * 3 + 2] * Math.sin(elapsedTime * 0.3 + index);
        }

        positions.needsUpdate = true;
      });
      
      // Random threat detection simulations
      if (!threatDetectionMode && Math.random() < 0.002) { // 0.2% chance per frame to trigger detection
        threatDetectionMode = true;
        threatDetectionTimer = elapsedTime;
        
        // Show threat detection beams
        beams.forEach(beam => beam.visible = true);
      }
      
      // Handle threat detection animation
      if (threatDetectionMode) {
        const detectionDuration = elapsedTime - threatDetectionTimer;
        
        if (detectionDuration < 2) {
          // During first 2 seconds, beams scan
          beams.forEach((beam, i) => {
            beam.rotation.x = Math.sin(elapsedTime * 2 + i) * 0.3;
          });
        } else if (detectionDuration < 4) {
          // Show target box during next 2 seconds
          targetBox.visible = true;
          targetBox.position.copy(drone.position);
          targetBox.rotation.x += 0.02;
          targetBox.rotation.y += 0.02;
          targetBox.rotation.z += 0.02;
          
          // Flash effect on the drone
          if (Math.sin(elapsedTime * 10) > 0) {
            outlinePass.visibleEdgeColor.set(0xff0000);
          } else {
            outlinePass.visibleEdgeColor.set(0x0A84FF);
          }
        } else {
          // End threat detection
          threatDetectionMode = false;
          beams.forEach(beam => beam.visible = false);
          targetBox.visible = false;
          outlinePass.visibleEdgeColor.set(0x0A84FF);
        }
      }
      
      // Animate lights
      pointLight1.position.x = Math.sin(elapsedTime * 0.3) * 15;
      pointLight1.position.y = Math.cos(elapsedTime * 0.2) * 15;
      pointLight2.position.x = Math.cos(elapsedTime * 0.3) * 15;
      pointLight2.position.y = Math.sin(elapsedTime * 0.2) * 15;
      
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // Dispose resources
      renderer.dispose();
      controls.dispose();
      composer.dispose();
      
      // Clean up geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          }
        }
      });
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};

export default DroneBackground;
