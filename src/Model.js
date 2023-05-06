import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./index.css";
import { useSelector } from "react-redux";

function Model() {
  const color = useSelector((state) => {
    return state.color.colorState;
  });

  const Box = ({ time, ...props }) => {
    return (
      <mesh {...props}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial roughness={0.3} />
      </mesh>
    );
  };
  const Content = () => {
    const ref = useRef();
    useFrame(() => (ref.current.rotation.z = ref.current.rotation.x += 0.01));
    return (
      <group ref={ref}>
        <Box position={[0, 0, 0]} />
      </group>
    );
  };
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <pointLight color="black" />
      <pointLight position={[10, 10, -10]} color={color} />
      <pointLight position={[-10, -10, 10]} color="white" />
      <Content />
    </Canvas>
  );
}
export default Model;
