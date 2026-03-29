"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

function Character() {
  const { scene } = useGLTF("/models/Untitled.glb");

  // --- TWEAK THESE VALUES TO FIT YOUR EXACT MODEL SIZE ---
  // If the character is tiny, increase this number (e.g., 3, 5, or 10)
  // If the character is huge, decrease it (e.g., 0.5, 0.1)
  const SCALE = 0.7;

  // Tweak this to move the character up or down. 
  // Lowering the Y value (e.g. -4) moves it down.
  const POSITION_Y = -8;

  // --- ROTATION (in degrees, converted to radians) ---
  // Positive X rotation = tilts forward, Negative = tilts backward
  // Positive Y rotation = turns left, Negative = turns right
  const ROTATION_X = 10;   // e.g., 15 to tilt forward 15°
  const ROTATION_Y = -45;   // e.g., -30 to turn right 30°

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <group position={[0, POSITION_Y, 0]} scale={SCALE} rotation={[toRad(ROTATION_X), toRad(ROTATION_Y), 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function HeroCanvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full h-full min-h-[500px] lg:h-screen bg-transparent">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Custom Lighting Environment instead of Stage to prevent re-scaling glitches on refresh */}
          <Environment preset="city" />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />

          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Character />
          </Float>

          {/* Ground shadow plane positioned beneath the floating model */}
          <ContactShadows
            position={[0, -3.2, 0]}
            opacity={0.7}
            scale={12}
            blur={2.5}
            far={4.5}
            color="#000000"
          />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// --- Mobile-only mini canvas (non-interactive, scroll passes through) ---
export function MobileHeroCanvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-[140px] h-[180px] pointer-events-none flex-shrink-0">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />

          <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3}>
            <Character />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/Untitled.glb");
