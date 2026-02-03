import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Environment, useGLTF, useAnimations } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, N8AO, DepthOfField, Noise } from "@react-three/postprocessing";
import * as THREE from "three";


import CanvasLoader from "../Loader";


const Computers = ({ isMobile }) => {
  const group = useRef();
  const actionRef = useRef(null);
  const appearedRef = useRef(false);
  const hasPlayedRef = useRef(false);
  const [hovered, setHovered] = useState(false);

  const { scene, animations } = useGLTF("./spider_robot/scene.gltf"); //./spider_robot/scene.gltf
  const { actions, names } = useAnimations(animations, group);


  const targetPosition = useMemo(
  () => (isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]),
  [isMobile]
);

const startPosition = useMemo(
  () => [
    targetPosition[0] + 6,   // ← right side
    targetPosition[1] + 4,   // ↑ above
    targetPosition[2] + 8,   // → front
  ],
  [targetPosition]
);

useEffect(() => {
  if (!group.current) return;

  // English comment: start outside of view
  group.current.position.set(...startPosition);
}, [startPosition]);

const ENTRY_SPEED = 0.4;

useFrame((_, dt) => {
  if (!group.current) return;

  group.current.position.x = THREE.MathUtils.lerp(
    group.current.position.x,
    targetPosition[0],
    dt * ENTRY_SPEED
  );
  group.current.position.y = THREE.MathUtils.lerp(
    group.current.position.y,
    targetPosition[1],
    dt * ENTRY_SPEED
  );
  group.current.position.z = THREE.MathUtils.lerp(
    group.current.position.z,
    targetPosition[2],
    dt * ENTRY_SPEED
  );
});

  useEffect(() => {
    // English comment: Prepare the preferred animation (fallback to the first one)
    if (!names?.length) {
      console.warn("No animations found in this glTF.");
      return;
    }

    const preferred =
      names.find((n) => n.toLowerCase().includes("armature")) ||
      names.find((n) => n.toLowerCase().includes("idle")) ||
      names[0];

    const action = actions?.[preferred];
    if (!action) return;

    actionRef.current = action;
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;

    const mixer = action.getMixer();
    const handleFinished = (event) => {
      if (event.action === action) {
        hasPlayedRef.current = false;
      }
    };

    mixer.addEventListener("finished", handleFinished);

    return () => {
      mixer.removeEventListener("finished", handleFinished);
      action.stop();
    };
  }, [actions, names]);

  useEffect(() => {
    // English comment: Play on hover, but allow animation to finish after pointer out
    const action = actionRef.current;
    if (!action) return;

    if (hovered && !hasPlayedRef.current && !action.isRunning()) {
      hasPlayedRef.current = true;
      action.reset();
      action.fadeIn(0.15).play();
    }
  }, [hovered]);

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={isMobile ? 0.7 : 0.75}
        // position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </group>
  );
};

const ComputersCanvas = ({ enablePostprocessing = true }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [65, 4, 5], fov: 25 }}
      gl={{ antialias: true, alpha: true,powerPreference: "high-performance", }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />

        {/* <Environment preset="warehouse" /> */}

        <Environment preset="city" />

        <Computers isMobile={isMobile} />
        {enablePostprocessing && (
        <EffectComposer multisampling={0}>
          <N8AO aoRadius={0.8} intensity={0.8} />
          <Bloom intensity={0.1} luminanceThreshold={0.45} luminanceSmoothing={0.5} />
          <DepthOfField focusDistance={0.015} focalLength={0.02} bokehScale={0.4} />
          <Noise opacity={0.1} />
          <Vignette eskil={false} offset={0.25} darkness={0.6} /> 
        </EffectComposer>
        )}
      </Suspense>

      {/* If you still get issues, comment this out temporarily */}
      {/* <Preload all /> */}
    </Canvas>
  );
};

export default ComputersCanvas;
