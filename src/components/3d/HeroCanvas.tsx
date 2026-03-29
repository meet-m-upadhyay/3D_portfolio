"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Environment, ContactShadows, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";

// --- Stylish loading overlay ---
function LoaderOverlay({ compact = false }: { compact?: boolean }) {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      // Delay hiding so the fade-out animation plays
      const t = setTimeout(() => setShow(false), 600);
      return () => clearTimeout(t);
    }
  }, [active, progress]);

  if (!show) return null;

  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500"
      style={{ opacity: active ? 1 : 0 }}
    >
      {/* Pulsing silhouette icon */}
      <div className={`${compact ? "mb-2" : "mb-6"}`}>
        <svg
          className={`${compact ? "w-10 h-10" : "w-16 h-16"} text-primary/60 animate-pulse`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
      </div>

      {!compact && (
        <>
          {/* Progress bar track */}
          <div className="w-40 h-1.5 bg-surface-container-high/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-gradient rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(0,229,255,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage text */}
          <p className="mt-3 font-label text-xs text-on-surface-variant/70 tracking-widest uppercase">
            Loading model… {Math.round(progress)}%
          </p>
        </>
      )}
    </div>
  );
}

function Character() {
  const { scene } = useGLTF("/models/Meet_character.glb");

  // --- TWEAK THESE VALUES TO FIT YOUR EXACT MODEL SIZE ---
  const SCALE = 0.7;
  const POSITION_Y = -8;

  // --- ROTATION (in degrees, converted to radians) ---
  const ROTATION_X = 10;
  const ROTATION_Y = -45;

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
    <div className="relative w-full h-full min-h-[500px] lg:h-screen bg-transparent">
      {/* Loading overlay sits above the canvas */}
      <LoaderOverlay />

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />

          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Character />
          </Float>

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
    <div className="relative w-[140px] h-[180px] pointer-events-none flex-shrink-0">
      <LoaderOverlay compact />

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

useGLTF.preload("/models/Meet_character.glb");
