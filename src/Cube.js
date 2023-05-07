import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useSelector } from "react-redux";

export default function Cube() {
  const { colorState } = useSelector((state) => {
    return state.color;
  });
  const Box = ({ time, ...props }) => {
    const [clicked, setClicked] = useState(false);
    return (
      <mesh
        {...props}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => setClicked(!clicked)}
      >
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial roughness={0.3} color={colorState} />
      </mesh>
    );
  };
  const Content = () => {
    const ref = useRef();
    useFrame(
      () =>
        (ref.current.rotation.x =
          ref.current.rotation.y =
          ref.current.rotation.z +=
            0.01)
    );
    return (
      <group ref={ref}>
        <Box position={[0, 0, 0]} />
      </group>
    );
  };
  return <Content />;
}
