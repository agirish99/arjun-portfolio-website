"use client";
import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function TorusCore() {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(t*0.5)*0.4;
    mesh.current.rotation.y = Math.cos(t*0.3)*0.5;
  });
  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1.2, 0.36, 180, 24]} />
      <meshStandardMaterial metalness={0.6} roughness={0.2} color="#93c5fd" />
    </mesh>
  );
}

function Starfield({ count=1200 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i=0;i<count;i++){
      const r = 80 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2*Math.random()-1);
      arr[i*3+0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i*3+2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
  const points = useRef<THREE.Points>(null!);
  useFrame(()=>{ if(points.current) points.current.rotation.y -= 0.0005; });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.4} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

function Scene() {
  const light = useRef<THREE.DirectionalLight>(null!);
  useEffect(()=>{
    const onVis = ()=>{ /* pause handled by r3f automatically on tab hidden */ };
    document.addEventListener("visibilitychange", onVis);
    return ()=> document.removeEventListener("visibilitychange", onVis);
  },[]);
  return (
    <>
      <hemisphereLight args={[0x88aaff, 0x080820, 0.9]} />
      <directionalLight ref={light} intensity={0.9} position={[5,10,7]} />
      <TorusCore />
      <Starfield />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0,1.5,9], fov: 60 }} dpr={[1, 2]}>
      <fog attach="fog" args={[0x030712, 40, 140]} />
      <Scene />
      <OrbitControls enablePan={false} minDistance={6} maxDistance={18} />
    </Canvas>
  );
}
