"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, TorusKnot } from "@react-three/drei";

export default function HeroCanvas() {
  return (
    <div className="w-full h-full min-h-[500px] lg:h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00e5ff" />
        
        {/* Placeholder geometry: Replace TorusKnot with useGLTF later */}
        <TorusKnot args={[1, 0.3, 128, 16]}>
          <meshStandardMaterial color="#c3f5ff" wireframe />
        </TorusKnot>

        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          maxAzimuthAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
