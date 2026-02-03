import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Environment} from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";
import CanvasLoader from "../Loader";
import { EffectComposer, Bloom, Vignette, N8AO, DepthOfField, Noise } from "@react-three/postprocessing";


const Earth = () => {
  const { scene, animations, names } = useGLTF("./crawling_robot/scene.gltf"); //./planet/scene.gltf ./crawling_robot/scene.gltf

    useEffect(() => {
      // English comment: Prepare the preferred animation (fallback to the first one)
      if (animations && animations.length) {
        const mixer = new THREE.AnimationMixer(scene);
        const action = mixer.clipAction(animations[0]);
        action.play();

        const clock = new THREE.Clock();

        const animate = () => {
          requestAnimationFrame(animate);
          const delta = clock.getDelta();
          mixer.update(delta);
        };

        animate();

        return () => {
          mixer.stopAllAction();
        };
      }
    }, [animations, names]);

  return (
    <primitive object={scene} scale={6} position-y={-2} position-x={-2} rotation-y={1} />  

  );
};

const EarthCanvas = () => {
  return (
     <div className="w-full h-full">
    <Canvas
    className="w-full h-full"
      shadows
      frameloop='always'
      dpr={[1, 2]}
      

      camera={{ fov: 45, near: 0.1, far: 1000, position: [3, 2.5, 6] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance"}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Environment preset="warehouse" />

        <EffectComposer>
                  <N8AO aoRadius={0.8} intensity={0.1} />
                  <Bloom intensity={0.06} luminanceThreshold={0.25} luminanceSmoothing={0.4} />
                  <DepthOfField focusDistance={0.015} focalLength={0.05} bokehScale={0.3} />
                  <Noise opacity={0.1} />
                  <Vignette eskil={false} offset={0.25} darkness={0.6} />
          </EffectComposer>
      
        <ambientLight  position={[0, 0, 0]}  intensity={0.5} />
        <directionalLight position={[2, 2.5, 6]} intensity={5} />
        <directionalLight position={[1, 1, 1]} intensity={5} castShadow />
        

        {/* <axesHelper args={[500]} /> */}
        

        {/* <OrbitControls
          //autoRotate
            enableZoom={false}
            // maxPolarAngle={Math.PI / 2}
            // minPolarAngle={Math.PI / 2}
            // enableDamping dampingFactor={0.08} target={[0, 0.5, 0]}
        /> */}

        {/* <Preload all/> */}
      </Suspense>
       <Earth />
    </Canvas>
    </div>
  );
};

export default EarthCanvas;
