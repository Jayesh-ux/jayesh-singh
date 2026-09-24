"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const LAYERS = ["FRONTEND", "BACKEND", "DATABASE", "AI", "INFRASTRUCTURE"];
const ACCENT = "#00a0b8";
const CORE = "#f2f2ed";

function LayerRing({
  radius,
  speed,
  tilt,
  color,
  label,
}: {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  color: string;
  label: string;
}) {
  const group = useRef<THREE.Group>(null);
  const packet = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (reduced || !group.current || !packet.current) return;
    const t = state.clock.elapsedTime * speed;
    const angle = t;
    packet.current.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
  });

  const points = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      nodes.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
    }
    return nodes;
  }, [radius]);

  return (
    <group rotation={tilt}>
      <group ref={group}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.004, radius + 0.004, 96]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        {points.map((p, i) => (
          <mesh key={i} position={p.toArray()}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color={color} />
          </mesh>
        ))}
      </group>
      <mesh ref={packet} position={[radius, 0, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={CORE} />
      </mesh>
      <Text
        position={[radius + 0.55, 0, 0]}
        fontSize={0.14}
        letterSpacing={0.08}
        color={color}
        anchorX="left"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Core() {
  const core = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state, delta) => {
    if (reduced || !core.current) return;
    core.current.rotation.x += delta * 0.08;
    core.current.rotation.y += delta * 0.12;
    if (glow.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
      glow.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={CORE}
          wireframe
          emissive={ACCENT}
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.14} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.35, 0]} />
        <meshBasicMaterial color={CORE} wireframe transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function Dust() {
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const count = isMobile ? 350 : 900;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={ACCENT}
        size={0.018}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (reduced || !group.current) return;
    const { pointer } = state;
    group.current.rotation.y += (pointer.x * 0.5 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (pointer.y * 0.3 - group.current.rotation.x) * 0.04;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Core />
      <LayerRing radius={1.9} speed={0.9} tilt={[0.15, 0, 0]} color={ACCENT} label="FRONTEND" />
      <LayerRing radius={2.4} speed={-0.7} tilt={[0, 0.2, 0.1]} color="#aeba27" label="BACKEND" />
      <LayerRing radius={3.0} speed={0.55} tilt={[-0.12, 0.1, 0]} color="#4dd9e0" label="DATABASE" />
      <LayerRing radius={3.5} speed={-0.4} tilt={[0.1, -0.18, 0.05]} color={ACCENT} label="AI" />
      <LayerRing radius={4.0} speed={0.3} tilt={[0.2, 0.12, -0.1]} color="#f5cb01" label="INFRA" />
      <Dust />
    </group>
  );
}

export default function SystemCanvas() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduced = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 45 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.85} />
      <pointLight position={[6, 4, 6]} intensity={1.4} color={ACCENT} />
      <pointLight position={[-6, -4, 4]} intensity={0.5} color="#ffffff" />
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        <Rig />
      </Float>
    </Canvas>
  );
}