
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, PerspectiveCamera, Lightformer, Icosahedron, Torus } from '@react-three/drei';
import * as THREE from 'three';

const NoiseBall: React.FC<{ 
  position: [number, number, number], 
  delay: number,
  size?: number
}> = ({ position, delay, size = 1.3 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    // 基础波动
    meshRef.current.position.y = position[1] + Math.sin(time * 0.7 + delay) * 0.35;
    meshRef.current.rotation.y = time * 0.25;
  });

  return (
    <Icosahedron ref={meshRef} args={[size, 20]} position={position}>
      <MeshDistortMaterial 
        color="#020202" // 极致黑
        speed={2.2} 
        distort={0.55} 
        radius={1}
        metalness={1}
        roughness={0.03}
        reflectivity={1}
        clearcoat={1}
        clearcoatRoughness={0.05}
      />
    </Icosahedron>
  );
};

const ChainLink: React.FC<{ 
  position: [number, number, number], 
  rotation: [number, number, number],
  delay: number 
}> = ({ position, rotation, delay }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    // 连动漂浮
    meshRef.current.position.y = position[1] + Math.sin(time * 0.7 + delay) * 0.35;
    meshRef.current.rotation.z = rotation[2] + Math.sin(time * 0.5 + delay) * 0.1;
  });

  return (
    <Torus ref={meshRef} args={[0.78, 0.2, 32, 64]} position={position} rotation={rotation} scale={[1, 1.4, 1]}>
      <meshPhysicalMaterial 
        color="#040404" 
        metalness={1} 
        roughness={0.02} 
        reflectivity={1}
        clearcoat={1}
        clearcoatRoughness={0.02}
      />
    </Torus>
  );
};

const HybridChain = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / (window.innerHeight * 0.8), 1);
    
    // 整体斜向放置
    groupRef.current.rotation.z = -0.4; 
    groupRef.current.rotation.x = 0.2;

    // 滚动动画：淡出并向侧边移动
    groupRef.current.position.x = 3.5 + progress * 5;
    groupRef.current.position.z = -progress * 8;
  });

  return (
    <group ref={groupRef} position={[3.5, 0, 0]}>
      {/* 顶部 Noise 球体 */}
      <NoiseBall position={[0, 2.6, 0]} delay={0} size={1.4} />
      
      {/* 中间两个交替连锁的圆环 */}
      <ChainLink position={[0, 0.6, 0]} rotation={[0, Math.PI / 2, 0]} delay={0.4} />
      <ChainLink position={[0, -0.6, 0]} rotation={[0, 0, 0]} delay={0.8} />
      
      {/* 底部 Noise 球体 */}
      <NoiseBall position={[0, -2.6, 0]} delay={1.2} size={1.5} />
    </group>
  );
};

const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#E3E5E8]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        
        <ambientLight intensity={0.15} />
        {/* 强聚光灯营造截图中的高对比度黑色流质感 */}
        <spotLight position={[15, 20, 15]} angle={0.25} penumbra={1} intensity={12} color="#ffffff" />
        <spotLight position={[-15, 0, 10]} angle={0.2} penumbra={1} intensity={6} color="#ffffff" />
        <pointLight position={[0, 0, 5]} intensity={2} color="#ffffff" />
        
        <HybridChain />

        <Environment resolution={1024}>
          <group rotation={[-Math.PI / 4, 0, 0]}>
            <Lightformer intensity={10} rotation-x={Math.PI / 2} position={[0, 15, -5]} scale={[30, 30, 1]} />
            <Lightformer intensity={5} rotation-y={Math.PI / 2} position={[-15, 5, 5]} scale={[30, 5, 1]} />
          </group>
        </Environment>
        
        <fog attach="fog" args={['#E3E5E8', 12, 28]} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
