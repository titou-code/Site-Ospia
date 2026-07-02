"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TOP = new THREE.Vector3(0, 1, 0);
const BOT = new THREE.Vector3(0, -1, 0);
const LEFT = new THREE.Vector3(-0.8125, 0, 0);
const RIGHT = new THREE.Vector3(0.8125, 0, 0);
const FRONT = new THREE.Vector3(0, 0, 0.8125);
const BACK = new THREE.Vector3(0, 0, -0.8125);

const FACES: [THREE.Vector3, THREE.Vector3, THREE.Vector3, string][] = [
  [TOP, LEFT, FRONT, "#3A6D8E"],
  [TOP, FRONT, RIGHT, "#6AA4D8"],
  [LEFT, BOT, FRONT, "#4B8EE7"],
  [FRONT, BOT, RIGHT, "#85C4F8"],
  [TOP, BACK, LEFT, "#3A6D8E"],
  [TOP, RIGHT, BACK, "#6AA4D8"],
  [LEFT, BACK, BOT, "#4B8EE7"],
  [BACK, RIGHT, BOT, "#85C4F8"],
];

function SpinningDiamond() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const normals: number[] = [];
    const groups: { start: number; count: number; materialIndex: number }[] = [];

    FACES.forEach(([a, b, c], i) => {
      const start = i * 3;
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
      const edge1 = new THREE.Vector3().subVectors(b, a);
      const edge2 = new THREE.Vector3().subVectors(c, a);
      const n = new THREE.Vector3().crossVectors(edge1, edge2).normalize();
      for (let j = 0; j < 3; j++) normals.push(n.x, n.y, n.z);
      groups.push({ start, count: 3, materialIndex: i });
    });

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    groups.forEach((g) => geometry.addGroup(g.start, g.count, g.materialIndex));
    return geometry;
  }, []);

  const materials = useMemo(
    () =>
      FACES.map(([, , , hex]) => {
        const base = new THREE.Color(hex);
        return new THREE.MeshPhongMaterial({
          color: base,
          shininess: 60,
          specular: new THREE.Color("#223355"),
          emissive: base.clone().multiplyScalar(0.25),
          flatShading: true,
        });
      }),
    []
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.8 * delta;
    }
  });

  return <mesh ref={meshRef} geometry={geo} material={materials} />;
}

export default function TimelineDiamond() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.75} color="#ffffff" />
      <directionalLight position={[3, 5, 6]} intensity={0.5} color="#ffffff" />
      <SpinningDiamond />
    </Canvas>
  );
}
