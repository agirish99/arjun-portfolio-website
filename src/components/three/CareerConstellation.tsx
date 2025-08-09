"use client";
import * as React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";

function Constellation({ nodes=12 }:{nodes?:number}) {
  const { positions, edges } = React.useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i=0;i<nodes;i++) pts.push(new THREE.Vector3((Math.random()-0.5)*6,(Math.random()-0.5)*4,(Math.random()-0.5)*6));
    const lines: Array<[number,number]> = [];
    for (let a=0;a<nodes;a++) for (let b=a+1;b<nodes;b++) { if (Math.random() < 0.14) lines.push([a,b]); }
    return { positions: pts, edges: lines };
  }, [nodes]);

  return (
    <group>
      {positions.map((p,i)=>(
        <mesh key={i} position={p.toArray()}>
          <sphereGeometry args={[0.08,16,16]} /><meshStandardMaterial color="#93c5fd" />
        </mesh>
      ))}
      {edges.map(([a,b],i)=>{
        const A=positions[a], B=positions[b];
        const mid=A.clone().lerp(B,0.5), dir=B.clone().sub(A), len=dir.length();
        const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), dir.clone().normalize());
        return (
          <mesh key={i} position={mid.toArray()} quaternion={q}>
            <cylinderGeometry args={[0.01,0.01,len,8,1,true]} />
            <meshStandardMaterial color="#60a5fa" />
          </mesh>
        );
      })}
    </group>
  );
}

export default function CareerConstellation() {
  const reduce = useReducedMotion();
  if (reduce) return <div className="h-[60vh] w-full rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />;
  return (
    <Canvas camera={{ position:[0,0,10], fov:60 }} dpr={[1,2]}>
      <color attach="background" args={["#0b0f14"]} />
      <hemisphereLight args={[0x88aaff, 0x080820, 0.9]} />
      <directionalLight intensity={0.8} position={[5,10,7]} />
      <Constellation />
    </Canvas>
  );
}
