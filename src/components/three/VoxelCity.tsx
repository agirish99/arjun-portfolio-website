"use client";
import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";

function City({ n=22 }:{n?:number}) {
  const ref = React.useRef<THREE.InstancedMesh>(null!);
  const dummy = React.useMemo(()=>new THREE.Object3D(),[]);
  React.useEffect(()=>{
    let i=0;
    for (let x=-n; x<=n; x+=2) {
      for (let z=-n; z<=n; z+=2) {
        const h = Math.max(0.5, (Math.sin(x*0.4)+Math.cos(z*0.35)+Math.sin((x+z)*0.25))+2.5);
        dummy.position.set(x, h/2, z);
        dummy.scale.set(1, h, 1);
        dummy.updateMatrix();
        ref.current.setMatrixAt(i++, dummy.matrix);
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [n, dummy]);
  useFrame((_s,dt)=>{ if(ref.current) ref.current.rotation.y += dt * 0.08; });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, ((n/2)*2+1)**2]}>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color="#93c5fd" />
    </instancedMesh>
  );
}

export default function VoxelCity() {
  const reduce = useReducedMotion();
  if (reduce) return <div className="h-[60vh] w-full rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />;
  return (
    <Canvas camera={{ position:[0,10,26], fov:60 }} dpr={[1,2]}>
      <color attach="background" args={["#0b0f14"]} />
      <hemisphereLight args={[0x88aaff,0x080820,0.9]} />
      <directionalLight intensity={0.8} position={[8,12,10]} />
      <City />
    </Canvas>
  );
}
