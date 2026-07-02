"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const TOP = new THREE.Vector3(0, 1, 0);
const BOT = new THREE.Vector3(0, -1, 0);
const LEFT = new THREE.Vector3(-0.8125, 0, 0);
const RIGHT = new THREE.Vector3(0.8125, 0, 0);
const FRONT = new THREE.Vector3(0, 0, 0.8125);
const BACK = new THREE.Vector3(0, 0, -0.8125);

const FACES: [THREE.Vector3, THREE.Vector3, THREE.Vector3, string][] = [
  [TOP, LEFT, FRONT, "#1A3C5E"],
  [TOP, FRONT, RIGHT, "#3A7FC1"],
  [LEFT, BOT, FRONT, "#0B5ED7"],
  [FRONT, BOT, RIGHT, "#4FA8F5"],
  [TOP, BACK, LEFT, "#1A3C5E"],
  [TOP, RIGHT, BACK, "#3A7FC1"],
  [LEFT, BACK, BOT, "#0B5ED7"],
  [BACK, RIGHT, BOT, "#4FA8F5"],
];

interface OrbitDiamond {
  angle: number;
  radiusX: number;
  radiusY: number;
  scale: number;
  speed: number;
  selfSpeed: number;
}

const SEP = (2 * Math.PI) / 7;
const diamonds: OrbitDiamond[] = [
  { angle: SEP * 0, radiusX: 10.5, radiusY: 5.5, scale: 0.5, speed: 0.08, selfSpeed: 0.7 },
  { angle: SEP * 1, radiusX: 14.0, radiusY: 7.5, scale: 0.38, speed: 0.13, selfSpeed: -0.55 },
  { angle: SEP * 2, radiusX: 11.5, radiusY: 6.0, scale: 0.45, speed: 0.06, selfSpeed: 0.6 },
  { angle: SEP * 3, radiusX: 18.0, radiusY: 9.5, scale: 0.32, speed: 0.11, selfSpeed: -0.8 },
  { angle: SEP * 4, radiusX: 10.0, radiusY: 5.8, scale: 0.48, speed: 0.09, selfSpeed: 0.65 },
  { angle: SEP * 5, radiusX: 16.0, radiusY: 8.5, scale: 0.35, speed: 0.14, selfSpeed: -0.5 },
  { angle: SEP * 6, radiusX: 9.5, radiusY: 4.5, scale: 0.42, speed: 0.07, selfSpeed: 0.75 },
];

function OrbitingDiamond({ config }: { config: OrbitDiamond }) {
  const groupRef = useRef<THREE.Group>(null);
  const angleRef = useRef(config.angle);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos: number[] = [];
    const nrm: number[] = [];
    FACES.forEach(([a, b, c], i) => {
      pos.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
      const e1 = new THREE.Vector3().subVectors(b, a);
      const e2 = new THREE.Vector3().subVectors(c, a);
      const n = new THREE.Vector3().crossVectors(e1, e2).normalize();
      for (let j = 0; j < 3; j++) nrm.push(n.x, n.y, n.z);
      g.addGroup(i * 3, 3, i);
    });
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
    return g;
  }, []);

  const materials = useMemo(
    () =>
      FACES.map(([, , , hex]) => {
        const c = new THREE.Color(hex);
        return new THREE.MeshPhongMaterial({
          color: c,
          shininess: 60,
          specular: new THREE.Color("#223355"),
          emissive: c.clone().multiplyScalar(0.25),
          flatShading: true,
          transparent: true,
          opacity: 0.3,
          depthWrite: false,
          depthTest: true,
        });
      }),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const d = Math.min(delta, 0.1);

    angleRef.current += config.speed * d;
    const a = angleRef.current;

    const x = Math.cos(a) * config.radiusX;
    const y = Math.sin(a) * config.radiusY;

    groupRef.current.position.set(x, y, 0);
    groupRef.current.rotation.set(0, groupRef.current.rotation.y + config.selfSpeed * d, 0);
    groupRef.current.scale.setScalar(config.scale);

    const dist = groupRef.current.position.distanceTo(state.camera.position);
    groupRef.current.renderOrder = Math.round(-dist * 100);

    const t = (Math.sin(a) + 1) / 2;
    const opacity = 0.15 + t * 0.25;
    for (const mat of materials) {
      mat.opacity = opacity;
    }
  });

  return (
    <group ref={groupRef} scale={config.scale}>
      <mesh geometry={geo} material={materials} />
    </group>
  );
}

function WarmUp({ onReady }: { onReady: () => void }) {
  const { gl, scene, camera } = useThree();
  const frameCount = useRef(0);
  const compiled = useRef(false);

  useFrame(() => {
    if (!compiled.current) {
      gl.compile(scene, camera);
      compiled.current = true;
    }
    frameCount.current++;
    if (frameCount.current === 8) onReady();
  });

  return null;
}

function Scene({ onReady }: { onReady: () => void }) {
  return (
    <>
      <ambientLight intensity={0.75} color="#ffffff" />
      <directionalLight position={[3, 5, 6]} intensity={0.5} color="#ffffff" />
      {diamonds.map((d, i) => (
        <OrbitingDiamond key={i} config={d} />
      ))}
      <WarmUp onReady={onReady} />
    </>
  );
}

export default function Diamond3DOrbit() {
  const [visible, setVisible] = useState(false);
  const handleReady = useCallback(() => setVisible(true), []);

  return (
    <div
      className="absolute inset-0 pointer-events-none hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease-out" }}
    >
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene onReady={handleReady} />
      </Canvas>
    </div>
  );
}
