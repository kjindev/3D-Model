import React, { useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Model2() {
  const Model = () => {
    const gltf = useLoader(GLTFLoader, "./front_color.gltf");
    return (
      <>
        <primitive object={gltf.scene} scale={0.4} />
      </>
    );
  };

  const Content = () => {
    const ref = useRef();
    useFrame(() => (ref.current.rotation.y += 0.01));
    return (
      <group ref={ref}>
        <Model position={[0, 0, -1]} />
      </group>
    );
  };

  return (
    <Canvas camera={{ position: [2, 4, 4] }}>
      <Content />
      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
}
