import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, TorusKnot, Sphere, MeshDistortMaterial, Environment, PerspectiveCamera, Float, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// 1. The Chrome Connector (Silver Tube)
const ChromeForm = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <TorusKnot args={[1, 0.25, 128, 32]} ref={meshRef} position={[0, 0, 0]} rotation={[0.5, 0, 0]}>
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.0} // Perfectly smooth chrome
          metalness={1.0} 
        />
      </TorusKnot>
    </Float>
  );
};

// 2. The Matte Aluminum Sphere
const AluminumForm = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <Sphere args={[1.2, 64, 64]} position={[0.6, 1.0, -0.5]}>
        <MeshDistortMaterial
          color="#A0A0A0" // Neutral Light Grey
          roughness={0.3} // Matte finish
          metalness={0.8} // Metallic
          distort={0.4} 
          speed={1.0}
        />
      </Sphere>
    </Float>
  );
};

// 3. The Black Obsidian/Oil Blob
const ObsidianForm = () => {
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <Sphere args={[1, 64, 64]} position={[-1, -1.5, 0.5]} scale={[1.4, 0.9, 1.2]}>
        <MeshDistortMaterial
          color="#111111" // Almost Black
          roughness={0.05} // Very glossy
          metalness={0.6}
          distort={0.7} // Fluid movement
          speed={2.0}   
        />
      </Sphere>
    </Float>
  );
};

const SceneComposition = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const rawProgress = Math.min(scrollY / viewportHeight, 1);
        
        const progress = Math.pow(rawProgress, 1.2);

        // Movement: Slide Right and Down, Deep into fog
        groupRef.current.position.x = 1.5 + (progress * 2.5);
        groupRef.current.position.y = -(progress * 4.0);
        groupRef.current.position.z = -(progress * 6.0);

        // Rotation
        groupRef.current.rotation.y = progress * 1.2; 
        groupRef.current.rotation.z = -progress * 0.4; 
        groupRef.current.rotation.x = progress * 0.2;

        // Scale
        const scale = 1 - (progress * 0.3);
        groupRef.current.scale.setScalar(scale);
    });

    return (
        <group ref={groupRef} position={[1.5, 0, 0]}>
            <ChromeForm />
            <AluminumForm />
            <ObsidianForm />
        </group>
    );
};

const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#E3E5E8]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />
        
        {/* Cold Industrial Lighting */}
        <ambientLight intensity={1.5} color="#ffffff" /> 
        
        {/* Main White Key Light */}
        <spotLight 
            position={[5, 10, 5]} 
            angle={0.5} 
            penumbra={1} 
            intensity={4} 
            color="#ffffff" 
            castShadow
        />
        
        {/* Cool Blue Rim Light for steel feel */}
        <spotLight 
            position={[-5, 5, -5]} 
            intensity={3} 
            color="#DCE5F5" 
        />
        
        {/* Subtle fill */}
        <pointLight position={[0, -5, 2]} intensity={0.5} color="#ffffff" />

        <SceneComposition />

        {/* 
            PROCEDURAL ENVIRONMENT (Pure Light, No Objects) 
            Using Lightformers to create abstract reflections on the chrome.
            This replaces the 'city' or 'studio' image-based presets.
        */}
        <Environment resolution={512}>
            <group rotation={[-Math.PI / 4, -0.3, 0]}>
                {/* 1. Main Broad Softbox (Top-Left) - Creates the main smooth sheen */}
                <Lightformer 
                    intensity={4} 
                    rotation-x={Math.PI / 2} 
                    position={[0, 5, -9]} 
                    scale={[10, 10, 1]} 
                />
                
                {/* 2. Sharp Side Strip (Left) - Creates a defined "cut" highlight */}
                <Lightformer 
                    intensity={8} // Brighter
                    rotation-y={Math.PI / 2} 
                    position={[-5, 1, -1]} 
                    scale={[20, 0.2, 1]} // Thin strip
                />

                 {/* 3. Lower Fill Strip (Right) - Balances the shadow side */}
                <Lightformer 
                    intensity={2} 
                    rotation-y={Math.PI / 2} 
                    position={[10, 1, 0]} 
                    scale={[20, 1, 1]} 
                    color="#E3E5E8" // Reflects the scene bg color slightly
                />
                
                {/* 4. Subtle Ring Light - Adds complex curvature to the reflection */}
                <Lightformer 
                    form="ring" 
                    color="#ffffff" 
                    intensity={2} 
                    scale={5} 
                    position={[0, 5, -10]}
                />
            </group>
        </Environment>
        
        {/* Fog matched to background for seamless fade */}
        <fog attach="fog" args={['#E3E5E8', 4, 12]} />
      </Canvas>
    </div>
  );
};

export default HeroScene;