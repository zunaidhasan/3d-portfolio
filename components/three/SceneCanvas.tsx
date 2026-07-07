"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  CodeConstellation,
  DatabaseEngine,
  APIConstellation,
  ClosingOrbit,
} from "./Chapters";

function CameraRig({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera, pointer } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 0, -8));

  useFrame(() => {
    const p = progressRef.current;
    // Continuous camera path through 4 chapters (z: 8 → -40)
    const targetZ = 8 - p * 48;
    const targetX = pointer.x * 0.5;
    const targetY = 0.3 + pointer.y * 0.35;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.06;

    lookAt.current.set(pointer.x * 0.15, pointer.y * 0.15, targetZ - 6);
    camera.lookAt(lookAt.current);
  });

  return null;
}

export function SceneCanvas({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf: number;
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current =
        scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      raf = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.3, 8], fov: 55, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#E8923C" />
        <pointLight position={[-10, -5, -10]} intensity={0.3} color="#B8D4E3" />

        <CameraRig progressRef={progressRef} />

        {/* Chapter 1 — z=0 */}
        <group position={[0, 0, 0]}>
          <CodeConstellation progressRef={progressRef} start={0} end={0.22} />
        </group>

        {/* Chapter 2 — z=-16 */}
        <group position={[0, 0, -16]}>
          <DatabaseEngine progressRef={progressRef} start={0.2} end={0.5} />
        </group>

        {/* Chapter 3 — z=-32 */}
        <group position={[0, 0, -32]}>
          <APIConstellation progressRef={progressRef} start={0.48} end={0.78} />
        </group>

        {/* Chapter 4 — z=-44 */}
        <group position={[0, 0, -44]}>
          <ClosingOrbit progressRef={progressRef} start={0.76} end={1} />
        </group>
      </Canvas>
    </div>
  );
}
