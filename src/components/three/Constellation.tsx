"use client";
import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

function Constellation({ nodes=12 }:{nodes?:number}){
  const { positions, indices } = useMemo(()=>{
    const pts: THREE.Vector3[] = [];
    for(let i=0;i<nodes;i++){
      const r = 6;
      pts.push(new THREE.Vector3(
        (Math.random()-0.5)*r,
        (Math.random()-0.5)*r,
        (Math.random()-0.5)*r
      ));
    }
    const idx: Array<[number, number]> = [];
    for(let i=0;i<nodes; i++){
      for(let j=i+1;j<nodes;j++){
        if(Math.random() < 0.15) idx.push([i,j]);
      }
    }
    return { positions: pts, indices: idx };
  }, [nodes]);
  return (
    <group>
      {positions.map((p,i)=>(
        <mesh key={i} position={p.toArray()}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#93c5fd" />
        </mesh>
      ))}
      {indices.map(([a,b],i)=>{
        const start = positions[a], end = positions[b];
        const mid = start.clone().lerp(end, 0.5);
        const dir = end.clone().sub(start);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), dir.clone().normalize());
        return (
          <mesh key={i} position={mid.toArray()} quaternion={quat}>
            <cylinderGeometry args={[0.01,0.01,len,8,1,true]} />
            <meshStandardMaterial color="#60a5fa" />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ConstellationCanvas(){
  return (
    <Canvas camera={{ position: [0,0,12], fov: 60 }} dpr={[1,2]}>
      <color attach="background" args={["#0b0f14"]} />
      <hemisphereLight args={[0x88aaff, 0x080820, 0.9]} />
      <directionalLight intensity={0.8} position={[5,10,7]} />
      <Constellation />
    </Canvas>
  );
}
