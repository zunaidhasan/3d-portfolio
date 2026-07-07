import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ChapterProps = {
  progressRef: React.MutableRefObject<number>;
  start: number;
  end: number;
};

function chapterOpacity(progress: number, start: number, end: number): number {
  const fade = 0.1;
  if (progress < start - fade || progress > end + fade) return 0;
  if (progress < start) return THREE.MathUtils.smoothstep(progress, start - fade, start);
  if (progress > end) return 1 - THREE.MathUtils.smoothstep(progress, end, end + fade);
  return 1;
}

/* ========== Chapter 1: Code Constellation ========== */
export function CodeConstellation({ progressRef, start, end }: ChapterProps) {
  const group = useRef<THREE.Group>(null);
  const pMat = useRef<THREE.PointsMaterial>(null);
  const lMat = useRef<THREE.LineBasicMaterial>(null);

  const { positions, linePositions } = useMemo(() => {
    const positions = new Float32Array(110 * 3);
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < 110; i++) {
      const r = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const v = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.7,
        r * Math.cos(phi) * 0.5
      );
      nodes.push(v);
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
    }
    const lineArr: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.2 && Math.random() > 0.55) {
          lineArr.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }
    return { positions, linePositions: new Float32Array(lineArr) };
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.03;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    const op = chapterOpacity(progressRef.current, start, end);
    if (pMat.current) pMat.current.opacity = op;
    if (lMat.current) lMat.current.opacity = op * 0.22;
    group.current.visible = op > 0.01;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={pMat}
          size={0.07}
          color="#F5EFE8"
          sizeAttenuation
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lMat}
          color="#E8923C"
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

/* ========== Chapter 2: Database Engine Room ========== */
export function DatabaseEngine({ progressRef, start, end }: ChapterProps) {
  const group = useRef<THREE.Group>(null);
  const queryGroup = useRef<THREE.Group>(null);
  const matsRef = useRef<THREE.MeshBasicMaterial[]>([]);

  const rings = useMemo(() => Array.from({ length: 7 }, (_, i) => i), []);
  const queries = useMemo(
    () =>
      Array.from({ length: 10 }, () => ({
        x: (Math.random() - 0.5) * 3.5,
        z: (Math.random() - 0.5) * 3.5,
        speed: 0.4 + Math.random() * 1.2,
        offset: Math.random() * 6,
        up: Math.random() > 0.5,
      })),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.1;
    const op = chapterOpacity(progressRef.current, start, end);
    group.current.visible = op > 0.01;
    matsRef.current.forEach((m) => {
      if (m) m.opacity = m.userData.base * op;
    });
    if (queryGroup.current) {
      queryGroup.current.children.forEach((line, i) => {
        const q = queries[i];
        if (!q) return;
        const t = (state.clock.elapsedTime * q.speed + q.offset) % 4;
        const y = q.up ? t - 2 : 2 - t;
        line.position.y = y;
        const m = (line as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (m) m.opacity = op * (1 - Math.abs(y) / 2.2) * 0.9;
      });
    }
  });

  const registerMat = (m: THREE.MeshBasicMaterial | null, base: number) => {
    if (m && !m.userData.base) {
      m.userData.base = base;
      matsRef.current.push(m);
    }
  };

  return (
    <group ref={group}>
      {/* Server rings */}
      {rings.map((i) => (
        <mesh key={i} position={[0, (i - 3) * 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.035, 8, 64]} />
          <meshBasicMaterial ref={(m) => registerMat(m, 0.8)} color="#E8923C" transparent />
        </mesh>
      ))}
      {/* Central core */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 7, 16]} />
        <meshBasicMaterial ref={(m) => registerMat(m, 0.08)} color="#E8923C" transparent blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial ref={(m) => registerMat(m, 0.25)} color="#F5A956" transparent blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Query lines (cool blue) */}
      <group ref={queryGroup}>
        {queries.map((q, i) => (
          <mesh key={i} position={[q.x, 0, q.z]}>
            <boxGeometry args={[0.025, 0.35, 0.025]} />
            <meshBasicMaterial color="#B8D4E3" transparent blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ========== Chapter 3: API & AI Constellation ========== */
export function APIConstellation({ progressRef, start, end }: ChapterProps) {
  const group = useRef<THREE.Group>(null);
  const matsRef = useRef<THREE.MeshBasicMaterial[]>([]);

  const clusters = useMemo(() => {
    const centers = [
      { pos: [3, 1.5, 0] as [number, number, number], color: "#E8923C" },
      { pos: [-3, 1, 1] as [number, number, number], color: "#B8D4E3" },
      { pos: [0, -2, 2] as [number, number, number], color: "#F5A956" },
      { pos: [-2.5, -1.5, -1] as [number, number, number], color: "#E8923C" },
      { pos: [2.5, -0.5, -1.5] as [number, number, number], color: "#B8D4E3" },
    ];
    return centers.map((c) => ({
      ...c,
      satellites: Array.from({ length: 6 }, () => {
        const r = 0.7 + Math.random() * 0.7;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        return [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ] as [number, number, number];
      }),
    }));
  }, []);

  const lineGeometry = useMemo(() => {
    const pts: number[] = [];
    clusters.forEach((c) => {
      c.satellites.forEach((s) => {
        pts.push(...c.pos, ...s);
      });
    });
    // Inter-cluster
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        if ((i + j) % 2 === 0) {
          pts.push(...clusters[i].pos, ...clusters[j].pos);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, [clusters]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.04;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.05;
    const op = chapterOpacity(progressRef.current, start, end);
    group.current.visible = op > 0.01;
    matsRef.current.forEach((m) => {
      if (m) m.opacity = m.userData.base * op;
    });
  });

  const registerMat = (m: THREE.MeshBasicMaterial | null, base: number) => {
    if (m && !m.userData.base) {
      m.userData.base = base;
      matsRef.current.push(m);
    }
  };

  return (
    <group ref={group}>
      {clusters.map((cluster, ci) => (
        <group key={ci} position={cluster.pos}>
          <mesh>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial ref={(m) => registerMat(m, 1)} color={cluster.color} transparent />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial
              ref={(m) => registerMat(m, 0.1)}
              color={cluster.color}
              transparent
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          {cluster.satellites.map((pos, si) => (
            <mesh key={si} position={pos}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshBasicMaterial ref={(m) => registerMat(m, 0.6)} color={cluster.color} transparent />
            </mesh>
          ))}
        </group>
      ))}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial ref={(m) => registerMat(m, 0.2)} color="#E8923C" transparent depthWrite={false} />
      </lineSegments>
    </group>
  );
}

/* ========== Chapter 4: Closing Orbit ========== */
export function ClosingOrbit({ progressRef, start, end }: ChapterProps) {
  const group = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const matsRef = useRef<THREE.MeshBasicMaterial[]>([]);

  const particles = useMemo(() => {
    const positions = new Float32Array(70 * 3);
    for (let i = 0; i < 70; i++) {
      const r = 2.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.015;
    if (orbRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
      orbRef.current.scale.setScalar(s);
    }
    const op = chapterOpacity(progressRef.current, start, end);
    group.current.visible = op > 0.01;
    matsRef.current.forEach((m) => {
      if (m) m.opacity = m.userData.base * op;
    });
  });

  const registerMat = (m: THREE.MeshBasicMaterial | null, base: number) => {
    if (m && !m.userData.base) {
      m.userData.base = base;
      matsRef.current.push(m);
    }
  };

  return (
    <group ref={group}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial ref={(m) => registerMat(m, 0.5)} color="#E8923C" transparent />
      </mesh>
      <mesh scale={1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.08)}
          color="#E8923C"
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.03)}
          color="#F5A956"
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#F5EFE8" transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}
