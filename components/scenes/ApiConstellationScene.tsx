"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/* ====================================================================
   DATA STRUCTURE
==================================================================== */

type ClusterDef = {
  id: string;
  name: string;
  position: [number, number, number];
  skills: string[];
};

const CLUSTERS: ClusterDef[] = [
  { id: "lang", name: "Languages", position: [4.5, 1.5, 0], skills: ["Python", "JavaScript", "TypeScript", "SQL"] },
  { id: "ai", name: "AI / ML", position: [-4.5, 1.5, 1], skills: ["Claude API", "OpenAI GPT", "ElevenLabs", "Retell AI", "PyTorch", "TensorFlow", "LangChain", "RAG Pipelines", "NLP", "Computer Vision (YOLO)"] },
  { id: "be", name: "Backend", position: [0, -2.5, 2.5], skills: ["FastAPI", "Node.js", "REST APIs", "Supabase", "PostgreSQL"] },
  { id: "fe", name: "Frontend", position: [3.5, -1.5, -2.5], skills: ["Next.js 15", "React", "Tailwind CSS", "Framer Motion"] },
  { id: "infra", name: "Infrastructure", position: [-3.5, -1.5, -2.5], skills: ["Vercel", "Docker", "GitHub Actions", "Render"] },
  { id: "domain", name: "Domain", position: [0, 3.5, -1.5], skills: ["Voice AI Architecture", "Bangla-first AI", "International Client Communication"] },
];

// Cross-cluster relationships for the system-level graph
const CROSS_RELATIONSHIPS: [string, string][] = [
  ["ai", "be"], ["ai", "domain"], ["be", "fe"],
  ["be", "infra"], ["fe", "infra"], ["fe", "lang"], ["be", "lang"]
];

/* ====================================================================
   GRAPH GENERATION
==================================================================== */

type GraphNode = {
  id: string;
  name: string;
  skillName?: string;
  clusterId: string;
  isAnchor: boolean;
  basePosition: THREE.Vector3;
};

type GraphEdge = {
  a: GraphNode;
  b: GraphNode;
  type: "internal" | "cross";
};

function buildGraph() {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  let skillIdCounter = 0;

  CLUSTERS.forEach((cluster) => {
    // Anchor Node
    const anchorPos = new THREE.Vector3(...cluster.position);
    const anchorNode: GraphNode = {
      id: `anchor-${cluster.id}`,
      name: cluster.name,
      clusterId: cluster.id,
      isAnchor: true,
      basePosition: anchorPos,
    };
    nodes.push(anchorNode);

    // Skill Nodes
    cluster.skills.forEach((skill) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.8 + Math.random() * 0.6;
      const offset = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      
      const skillNode: GraphNode = {
        id: `skill-${skillIdCounter++}`,
        name: skill,
        skillName: skill,
        clusterId: cluster.id,
        isAnchor: false,
        basePosition: anchorPos.clone().add(offset),
      };
      nodes.push(skillNode);
      
      // Internal Edge
      edges.push({ a: anchorNode, b: skillNode, type: "internal" });
    });
  });

  // Cross-cluster Edges
  CROSS_RELATIONSHIPS.forEach(([id1, id2]) => {
    const a = nodes.find((n) => n.id === `anchor-${id1}`);
    const b = nodes.find((n) => n.id === `anchor-${id2}`);
    if (a && b) edges.push({ a, b, type: "cross" });
  });

  return { nodes, edges };
}

/* ====================================================================
   3D SUBCOMPONENTS
==================================================================== */

const AMBER = new THREE.Color("#E8923C");
const AMBER_BRIGHT = new THREE.Color("#F5A956");
const COOL = new THREE.Color("#B8D4E3");
const DIM_AMBER = new THREE.Color("#3a2410");
const DIM_COOL = new THREE.Color("#1a2733");

function Node({ node, activeSkill, activeCategory, reducedMotion }: { 
  node: GraphNode; 
  activeSkill: string | null; 
  activeCategory: string | null;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  
  // Per-node random phase for idle drift
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;

    // Idle drift motion
    if (!reducedMotion) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.y = node.basePosition.y + Math.sin(t * 0.5 + phase) * 0.08;
      meshRef.current.position.x = node.basePosition.x + Math.cos(t * 0.4 + phase) * 0.05;
    } else {
      meshRef.current.position.copy(node.basePosition);
    }

    // Interactive state logic
    const isCategoryActive = activeCategory === node.clusterId;
    const isSkillActive = activeSkill === node.skillName;
    const isAnyActive = activeSkill || activeCategory;
    
    let targetScale = node.isAnchor ? 1.2 : 0.6;
    let targetColor = AMBER.clone();

    if (isSkillActive) {
      targetScale = node.isAnchor ? 1.5 : 1.4;
      targetColor = AMBER_BRIGHT.clone();
    } else if (isCategoryActive) {
      targetScale = node.isAnchor ? 1.6 : 1.1;
      targetColor = AMBER_BRIGHT.clone();
    } else if (isAnyActive) {
      targetScale = node.isAnchor ? 0.8 : 0.3;
      targetColor = DIM_AMBER.clone();
    }

    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    matRef.current.color.lerp(targetColor, 0.1);
  });

  return (
    <mesh ref={meshRef} position={node.basePosition}>
      {node.isAnchor ? (
        <icosahedronGeometry args={[0.35, 0]} />
      ) : (
        <sphereGeometry args={[0.12, 16, 16]} />
      )}
      <meshBasicMaterial 
        ref={matRef} 
        color={AMBER} 
        transparent 
        opacity={node.isAnchor ? 0.9 : 0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
      
      {node.isAnchor && (
        <Html
          center
          position={[0, -0.6, 0]}
          style={{
            pointerEvents: "none",
            userSelect: "none",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#8A8278",
            whiteSpace: "nowrap",
            opacity: activeSkill && !activeCategory ? 0.3 : 1,
            transition: "opacity 0.3s ease-out"
          }}
        >
          {node.name}
        </Html>
      )}
    </mesh>
  );
}

function Edge({ edge, activeSkill, activeCategory }: {
  edge: GraphEdge;
  activeSkill: string | null;
  activeCategory: string | null;
}) {
  const matRef = useRef<THREE.LineBasicMaterial>(null);
  
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute([
      ...edge.a.basePosition.toArray(),
      ...edge.b.basePosition.toArray()
    ], 3));
    return g;
  }, [edge]);

  useFrame(() => {
    if (!matRef.current) return;
    
    const isActiveEdge = 
      (edge.type === "internal" && (activeCategory === edge.a.clusterId || activeSkill === edge.b.skillName)) ||
      (edge.type === "cross" && (activeCategory === edge.a.clusterId || activeCategory === edge.b.clusterId));
      
    const isAnyActive = activeSkill || activeCategory;

    let targetOpacity = edge.type === "cross" ? 0.15 : 0.3;
    let targetColor = edge.type === "cross" ? COOL.clone() : AMBER.clone();

    if (isActiveEdge) {
      targetOpacity = 0.9;
      targetColor = edge.type === "cross" ? COOL.clone() : AMBER_BRIGHT.clone();
    } else if (isAnyActive) {
      targetOpacity = 0.05;
    }

    matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, targetOpacity, 0.1);
    matRef.current.color.lerp(targetColor, 0.1);
  });

  return (
    <line geometry={geometry}>
      <lineBasicMaterial 
        ref={matRef} 
        transparent 
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </line>
  );
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  
  useFrame((state) => {
    if (reducedMotion) {
      camera.position.lerp(new THREE.Vector3(0, 0, 12), 0.05);
      camera.lookAt(0, 0, 0);
      return;
    }
    
    const t = state.clock.elapsedTime;
    // Barely perceptible slow orbit
    const radius = 12;
    const targetX = Math.sin(t * 0.05) * 1.5;
    const targetZ = Math.cos(t * 0.05) * 1.5 + 11;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.5, 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ====================================================================
   MAIN EXPORT
==================================================================== */

export function ApiConstellationScene({ 
  activeSkill, 
  activeCategory 
}: { 
  activeSkill: string | null; 
  activeCategory: string | null;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const { nodes, edges } = useMemo(() => buildGraph(), []);

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 8]} intensity={0.4} color="#E8923C" />
      
      <CameraRig reducedMotion={reducedMotion} />

      {edges.map((edge, i) => (
        <Edge 
          key={`edge-${i}`} 
          edge={edge} 
          activeSkill={activeSkill}
          activeCategory={activeCategory}
        />
      ))}

      {nodes.map((node) => (
        <Node 
          key={node.id} 
          node={node} 
          activeSkill={activeSkill}
          activeCategory={activeCategory}
          reducedMotion={reducedMotion}
        />
      ))}
    </Canvas>
  );
}
