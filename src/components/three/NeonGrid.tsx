"use client";
import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";

function Grid() {
  const group = React.useRef<THREE.Group>(null!);
  // Build line grid once
  const lines = React.useMemo(() => {
    const objs: JSX.Element[] = [];
    const size = 120, step = 2;
    for (let i = -size; i <= size; i += step) {
      objs.push(<line key={"hz"+i}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([-size,0,i, size,0,i]), 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#60a5fa" transparent opacity={0.35} />
      </line>);
      objs.push(<line key={"vt"+i}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([i,0,-size, i,0,size]), 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#a78bfa" transparent opacity={0.35} />
      </line>);
    }
    return objs;
  }, []);
  useFrame((_s, dt) => { if (group.current) group.current.position.z += dt * 4; if (group.current.position.z > 2) group.current.position.z = 0; });
  return <group ref={group} position={[0,-2,0]}>{lines}</group>;
}

export default function NeonGrid() {
  const reduce = useReducedMotion();
  if (reduce) return <div aria-hidden className="h-[60vh] w-full rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />;
  return (
    <Canvas camera={{ position:[0,3,12], fov:60 }} dpr={[1,2]} shadows>
      <color attach="background" args={["#0b0f14"]} />
      <fog attach="fog" args={[0x030712, 30, 120]} />
      <hemisphereLight args={[0x88aaff, 0x080820, 0.7]} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <Grid />
      {/* Horizon glow */}
      <mesh position={[0,0,-40]}>
        <planeGeometry args={[120,60]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.08} />
      </mesh>
    </Canvas>
  );
}
