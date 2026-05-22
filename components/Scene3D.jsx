"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

/* Glowing point cloud arranged on a sphere — slow auto-rotation */
function ParticleSphere() {
  const ref = useRef();
  const positions = useMemo(() => {
    const N = 2400;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 2.7 + Math.random() * 0.55;
      const theta = Math.acos(1 - 2 * (i + 0.5) / N);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;
      arr[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      arr[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      arr[i * 3 + 2] = r * Math.cos(theta);
    }
    return arr;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) { ref.current.rotation.y += dt * 0.06; ref.current.rotation.x += dt * 0.022; }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.032} color="#22D3EE" sizeAttenuation transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* Morphing, glowing AI "core" */
function Core() {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) { ref.current.rotation.y += dt * 0.18; ref.current.rotation.z += dt * 0.05; } });
  return (
    <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.7}>
      <Icosahedron ref={ref} args={[1.35, 8]}>
        <MeshDistortMaterial color="#0a2740" emissive="#1FB6E0" emissiveIntensity={0.45} distort={0.34} speed={1.7} roughness={0.18} metalness={0.65} />
      </Icosahedron>
    </Float>
  );
}

/* Faint wireframe shell for extra depth */
function Shell() {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y -= dt * 0.04; });
  return (
    <Icosahedron ref={ref} args={[2.1, 1]}>
      <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.12} />
    </Icosahedron>
  );
}

/* Mouse-reactive camera parallax */
function Rig() {
  useFrame((state) => {
    const px = state.pointer.x, py = state.pointer.y;
    state.camera.position.x += (px * 0.8 - state.camera.position.x) * 0.04;
    state.camera.position.y += (py * 0.5 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      maskImage: "radial-gradient(ellipse 90% 80% at 62% 38%, #000 30%, transparent 82%)",
      WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 62% 38%, #000 30%, transparent 82%)",
      opacity: 0.9,
    }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <fog attach="fog" args={["#05070E", 6, 15]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[6, 5, 6]} intensity={120} color="#22D3EE" decay={2} />
        <pointLight position={[-7, -4, 3]} intensity={90} color="#3B82F6" decay={2} />
        <Shell />
        <ParticleSphere />
        <Core />
        <Rig />
      </Canvas>
    </div>
  );
}
