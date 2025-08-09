"use client";
import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";

function Terrain() {
  const mesh = React.useRef<THREE.Mesh>(null!);
  const geom = React.useMemo(() => {
    const w=120, h=120, seg=100;
    const g = new THREE.PlaneGeometry(w,h,seg,seg);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i=0;i<pos.count;i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const z = Math.sin(x*0.15)*1.2 + Math.cos(y*0.12)*1.1 + Math.sin((x+y)*0.08)*0.8;
      pos.setZ(i, z);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  useFrame((_s,dt)=>{ if(mesh.current) mesh.current.rotation.z += dt * 0.05; });
  return (
    <mesh ref={mesh} geometry={geom} rotation={[-Math.PI/2,0,0]}>
      <meshStandardMaterial color="#6ea8fe" flatShading />
    </mesh>
  );
}

export default function LowPolyTerrain() {
  const reduce = useReducedMotion();
  if (reduce) return <div className="h-[60vh] w-full rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />;
  return (
    <Canvas camera={{ position:[0,18,26], fov:60 }} dpr={[1,2]}>
      <color attach="background" args={["#0b0f14"]} />
      <hemisphereLight args={[0x88aaff,0x080820,0.8]} />
      <directionalLight intensity={0.9} position={[5,14,10]} />
      <Terrain />
    </Canvas>
  );
}
